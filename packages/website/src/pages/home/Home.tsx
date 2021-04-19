import { FC, useEffect, useRef, useState } from 'react'
import { Layout, Typography } from 'antd'
import { IDividend } from '../../interfaces'
import { Scatter } from '@antv/g2plot'
import { DemoChart } from '../../components/Chart/Chart'
import { LegendTable } from '../../components/LegendTable/LegendTable'

const Home: FC = () => {
  const [data, setData] = useState<IDividend[] | []>([])
  const plotRef = useRef<null | Scatter>(null)

  useEffect(() => {
    fetch('testData.json')
      .then(data => {
        return data.json()
      })
      .then(res => {
        const newArr = res.map((item: IDividend) => ({
          ...item,
          isActive: false,
          isGrayed: false,
        }))
        setData(newArr)
      })
  }, [])

  useEffect(() => {
    plotRef.current = new Scatter('container', {
      appendPadding: 30,
      height: 500,
      data,
      xField: 'divGrth',
      yField: 'netYield',
      seriesField: 'security',
      legend: false,
      isStack: false,
      shapeField: 'custom-point',
      xAxis: {
        min: 0,
        max: 11,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        tickCount: 11,
        tickLine: null,
      },
      yAxis: {
        min: 0,
        max: 10,
        tickInterval: 2,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        tickCount: 10,
      },
      label: {
        formatter: item => item.security,
        offsetX: 65,
        offsetY: 13,
        layout: {
          type: 'fixed-overlap',
        },
      },
      annotations: [
        {
          type: 'text',
          content: 'Div Grth (%)',
          position: data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { max } = data
            return [max - 0.5, -1]
          },
        },
        {
          type: 'text',
          content: 'Net Yield, %',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          position: (data: { max: number }) => {
            const { max } = data
            return [-0.4, max - 1.5]
          },
        },
      ],
    })
    plotRef.current.render()
  }, [])

  return (
    <Layout>
      <Typography.Title level={1} style={{ marginBottom: '50px' }}>
        Demo chart
      </Typography.Title>
      <div className='analysis'>
        <div className='analysis-container'>
          <div className='analysis-chart'>
            <DemoChart data={data} chartTemplate={plotRef.current} />
          </div>
          <div className='analysis-table'>
            <LegendTable data={data} setData={setData} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Home }
