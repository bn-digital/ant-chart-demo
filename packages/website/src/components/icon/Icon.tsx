import Wrapped from '@ant-design/icons'
import { Dispatch, FC, SyntheticEvent } from 'react'

export type IconProps = {
  svg: FC
  size: number
  wrapperSize: number
  className: string
  onClick: Dispatch<SyntheticEvent>
}

export const Icon: FC<Partial<IconProps>> = ({ className, wrapperSize = 24, svg, onClick, size = 24 }) => {
  return (
    <Wrapped
      style={{ fontSize: size }}
      width={wrapperSize}
      height={wrapperSize}
      className={className}
      size={wrapperSize}
      onClick={onClick}
      component={svg}
    />
  )
}
