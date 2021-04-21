import { Space, SpaceProps } from 'antd'
import { FC } from 'react'
import './VerticalSpace.less'

const VerticalSpace: FC<SpaceProps> = ({ style, children, ...baseProps }) => (
  <Space className={'app-vertical-space'} direction={'vertical'} style={{ width: '100%', ...style }} {...baseProps}>
    {children}
  </Space>
)

export default VerticalSpace
