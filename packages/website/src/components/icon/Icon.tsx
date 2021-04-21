import Wrapped from '@ant-design/icons'
import { CSSProperties, Dispatch, FC, SyntheticEvent } from 'react'

export type IconProps = {
  svg: FC
  size: number
  wrapperSize: number
  className: string
  onClick: Dispatch<SyntheticEvent>
  style: CSSProperties
}

export const Icon: FC<Partial<IconProps>> = ({ className, wrapperSize = 24, svg, onClick, size = 24, style }) => {
  return (
    <Wrapped
      style={{ ...style, fontSize: size }}
      width={wrapperSize}
      height={wrapperSize}
      className={className}
      size={wrapperSize}
      onClick={onClick}
      component={svg}
    />
  )
}
