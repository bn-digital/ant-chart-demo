import { FC } from 'react'
import { Layout, Typography } from 'antd'

const Dashboard: FC = () => {
  return (
    <Layout>
      <Typography.Title level={1} style={{ marginBottom: '50px' }}>
        Dashboard
      </Typography.Title>
    </Layout>
  )
}

export { Dashboard }
