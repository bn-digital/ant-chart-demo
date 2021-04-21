import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoIcon } from './logo.svg'

const Logo: FC = () => (
  <div>
    <Link to={'/'}>
      <LogoIcon />
    </Link>
  </div>
)

export { Logo }
