import { FC } from 'react'
import { Layout, Space } from 'antd'
import { Logo } from '../logo/Logo'
import { SideNavigation } from '../menu/SideNavigation'
import { Outlet } from 'react-router-dom'

const DefaultLayout: FC = () => {
  const isFooterVisible = false
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Layout.Sider width={104} style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
        <Space align={'center'} size={50} direction={'vertical'}>
          <Logo />
          <SideNavigation />
        </Space>
      </Layout.Sider>
      <Layout.Content style={{ padding: 50 }}>
        <Outlet />
      </Layout.Content>
      {isFooterVisible && (
        <Layout.Footer style={{ textAlign: 'center' }}>App ©{new Date().getFullYear()}</Layout.Footer>
      )}
    </Layout>
  )
}

export { DefaultLayout }
