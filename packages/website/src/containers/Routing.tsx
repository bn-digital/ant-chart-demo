import { FC, lazy, ReactNode } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { DefaultLayout } from '../components/layout/DefaultLayout'
import { Avatar, Col, Menu, MenuProps, Row, Typography } from 'antd'
import { RoutesProps } from 'react-router'
import { Icon } from '../components/icon/Icon'
import { ReactComponent as DashboardIcon } from '../components/icon/icons/dashboard-icon.svg'
import { ReactComponent as PortfoliosIcon } from '../components/icon/icons/portfolios-icon.svg'
import { ReactComponent as FundsIcon } from '../components/icon/icons/funds-icon.svg'
import { ReactComponent as ReportsIcon } from '../components/icon/icons/reports-icon.svg'

const Portfolios = lazy(() => import('../pages/portfolios'))
const Funds = lazy(() => import('../pages/funds'))
const Reports = lazy(() => import('../pages/reports'))

type RouteNavigationMap = {
  [key: string]: { component: FC; name: string; icon?: ReactNode }
}

const routeMap: RouteNavigationMap = {
  '/': {
    component: Portfolios,
    name: 'Dashboard',
    icon: <Icon svg={DashboardIcon} wrapperSize={32} size={32} />,
  },
  '/portfolios': {
    component: Portfolios,
    name: 'Portfolios',
    icon: <Icon svg={PortfoliosIcon} wrapperSize={32} size={32} />,
  },
  '/funds': {
    component: Funds,
    name: 'Funds',
    icon: <Icon svg={FundsIcon} wrapperSize={32} size={32} />,
  },
  '/reports': {
    component: Reports,
    name: 'Reports',
    icon: <Icon svg={ReportsIcon} wrapperSize={32} size={32} />,
  },
}

type AsideLinkProps = {
  path: string
  name: string
  icon: ReactNode
}

const AsideLink: FC<Partial<AsideLinkProps>> = ({ name, icon }) => {
  return (
    <NavLink to={'/'}>
      <Row justify={'center'}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar size={32} icon={icon} shape={'square'} />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Text type={'secondary'}>{name}</Typography.Text>
        </Col>
      </Row>
    </NavLink>
  )
}

function withNavigation(Wrapped: FC<MenuProps>): FC<MenuProps> {
  return props => {
    const { pathname } = useLocation()
    return (
      <Wrapped {...props} defaultSelectedKeys={[pathname ?? '/']}>
        {Object.entries(routeMap).map(([path, { name, icon }]) => (
          <Menu.Item key={path} style={{ marginBottom: 22 }}>
            <AsideLink name={name} icon={icon} />
          </Menu.Item>
        ))}
      </Wrapped>
    )
  }
}

function withRoutes(Wrapped: FC): FC<RoutesProps> {
  return props => (
    <Wrapped {...props}>
      {Object.entries(routeMap).map(([path, { component }]) => {
        const Page = component
        return <Route key={path} path={path} element={<Page />} />
      })}
    </Wrapped>
  )
}

const InnerRouter: FC = ({ children }) => (
  <Routes>
    <Route path={''} element={<DefaultLayout />}>
      {children}
    </Route>
  </Routes>
)
const Routing = withRoutes(InnerRouter)
export { Routing, withNavigation }
