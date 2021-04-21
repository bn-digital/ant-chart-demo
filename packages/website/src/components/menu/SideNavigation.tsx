import { FC } from 'react'
import { Menu } from 'antd'
import { withNavigation } from '../../containers/Routing'

const SideMenu: FC = ({ children }) => (
  <Menu theme={'light'} mode='vertical' style={{ border: 0 }}>
    {children}
  </Menu>
)

const SideNavigation = withNavigation(SideMenu)
export { SideNavigation }
