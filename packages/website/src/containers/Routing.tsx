import { FC, lazy, ReactNode } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { DefaultLayout } from '../components/layout/DefaultLayout'
import { Menu, MenuProps } from 'antd'
import { RoutesProps } from 'react-router'
import { Icon } from '../components/icon/Icon'
import { ReactComponent as DashboardIcon } from '../components/icon/icons/dashboard-icon.svg'
import { ReactComponent as PortfoliosIcon } from '../components/icon/icons/portfolios-icon.svg'
import { ReactComponent as FundsIcon } from '../components/icon/icons/funds-icon.svg'
import { ReactComponent as ReportsIcon } from '../components/icon/icons/reports-icon.svg'

const Dashboard = lazy(() => import('../pages/dashboard'))
const Portfolios = lazy(() => import('../pages/portfolios'))
const Funds = lazy(() => import('../pages/funds'))
const Reports = lazy(() => import('../pages/reports'))

type RouteNavigationMap = {
  [key: string]: { component: FC; name: string; icon?: ReactNode }
}

const routeMap: RouteNavigationMap = {
  '/': {
    component: Dashboard,
    name: 'Dashboard',
    icon: <Icon svg={DashboardIcon} wrapperSize={40} size={32} />,
  },
  '/portfolios': {
    component: Portfolios,
    name: 'Portfolios',
    icon: <Icon svg={PortfoliosIcon} wrapperSize={40} size={32} />,
  },
  '/funds': {
    component: Funds,
    name: 'Funds',
    icon: <Icon svg={FundsIcon} wrapperSize={40} size={32} />,
  },
  '/reports': {
    component: Reports,
    name: 'Reports',
    icon: <Icon svg={ReportsIcon} wrapperSize={40} size={32} />,
  },
}

type AsideLinkProps = {
  path: string
  name: string
  icon: ReactNode
}

const AsideLink: FC<AsideLinkProps> = ({ path, name, icon }) => {
  return (
    <NavLink to={path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {icon}
      {name}
    </NavLink>
  )
}

function withNavigation(Wrapped: FC<MenuProps>): FC<MenuProps> {
  return props => {
    const { pathname } = useLocation()
    return (
      <Wrapped {...props} defaultSelectedKeys={[pathname ?? '/']}>
        {Object.entries(routeMap).map(([path, { name, icon }]) => (
          <Menu.Item key={path}>
            <AsideLink path={path} name={name} icon={icon} />
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
