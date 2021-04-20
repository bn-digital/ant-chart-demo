import  { Suspense, FC } from 'react'
import { Row, Spin } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { UI } from './UI'
import { Routing } from './Routing'

export const Loader: FC = () => (
  <Row justify={'center'} style={{ minHeight: '100vh' }} align={'middle'}>
    <Spin />
  </Row>
)

const App: FC = ({ children }) => (
  <Router>
    <UI>
      <Suspense fallback={<Loader />}>
        <Routing>{children}</Routing>
      </Suspense>
    </UI>
  </Router>
)

export { App };
