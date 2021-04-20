import { FC, useEffect, useRef } from 'react'
import { IDividend } from '../../interfaces'
import { Scatter } from '@antv/g2plot'
import { registerShape } from '@antv/g2'

type ChartProps = {
  data: IDividend[]
  chartTemplate: Scatter | null
}

function registerChart() {
  registerShape('point', 'custom-point', {
    draw(cfg, container) {
      const data = cfg?.data as IDividend
      const point = { x: cfg.x as number, y: cfg.y as number }
      const isActive = data.isActive
      const isGrayed = data.isGrayed
      const radius = Number(data.rp) < 1.2 ? 1.2 * 8 : Number(data?.rp) * 8
      const group = container.addGroup()

      group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: isActive ? radius * 1.2 : radius,
          fill: '#2355F4',
          fillOpacity: isActive ? 0.35 : 0.15,
          stroke: '#2355F4',
          lineWidth: isActive ? 1.75 : 0.5,
          strokeOpacity: 0.5,
        },
      })

      group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 3.5,
          fill: '#2355F4',
          opacity: isGrayed && !isActive ? 0.2 : 1,
        },
      })

      const pointerStartX1 = Number(cfg.x) + 10
      const pointerEndX2 = Number(cfg.x) + 40

      group.addShape('line', {
        attrs: {
          x1: pointerStartX1,
          y1: cfg.y,
          x2: pointerEndX2,
          y2: cfg.y,
          stroke: '#2355F4',
          lineDash: isActive ? [0, 0] : [2, 2],
          lineWidth: 1,
          transition: 0.3,
          opacity: isGrayed && !isActive ? 0.2 : 1,
        },
      })

      group.addShape('circle', {
        attrs: {
          x: pointerEndX2,
          y: point.y,
          r: 2,
          stroke: '#2355F4',
          fill: isActive ? '#2355F4' : '#fff',
          opacity: isGrayed && !isActive ? 0.2 : 1,
        },
      })

      return group
    },
  })
}

export const DemoChart: FC<Partial<ChartProps>> = ({ chartTemplate, data = [] }) => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (data?.length > 0 && chartTemplate) {
      registerChart()
      chartTemplate.changeData(data)
    }
  }, [data, chartTemplate])

  return <div id='container' ref={container} style={{ border: '1px solid #F0F1F3' }} />
}
