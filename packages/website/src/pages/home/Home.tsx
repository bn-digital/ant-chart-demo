import { FC, useEffect, useRef, useState } from 'react'
import { Col, Layout, Row, Typography } from 'antd'
import { IDividend } from '../../interfaces'
import { Scatter, ScatterOptions } from '@antv/g2plot'
import { DemoChart } from '../../components/chart/Chart'
import { LegendTable } from '../../components/legend/LegendTable'
import { Scale } from '@antv/g2'

const Home: FC = () => {
  const [data, setData] = useState<IDividend[]>([])
  const plotRef = useRef<Scatter | null>(null)

  useEffect(() => {
    data.length === 0 &&
      fetch('testData.json')
        .then<IDividend[]>(data => data.json())
        .then(res =>
          res.map(item => ({
            ...item,
            isActive: false,
            isGrayed: false,
          })),
        )
        .then(setData)
  }, [data])

  useEffect(() => {
    if (!plotRef.current) {
      if (data) {
        const options: ScatterOptions = {
          appendPadding: [48, 24],
          height: 680,
          data,
          xField: 'divGrth',
          yField: 'netYield',
          sizeField: 'security',
          legend: false,
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
                const { max } = data as Record<string, Scale>
                return [+max - 0.5, -1]
              },
            },
            {
              type: 'text',
              content: 'Net Yield, %',
              position: data => {
                const { max } = data as Record<string, Scale>
                return [-0.4, +max - 1.5]
              },
            },
          ],
        }
        plotRef.current = new Scatter('container', options)
        plotRef.current?.render()
      }
    }
  }, [plotRef, data])

  return (
    <Layout>
      <Typography.Title level={1} style={{ marginBottom: '50px' }}>
        Demo chart
      </Typography.Title>
      <Row wrap={false} justify={'space-between'} gutter={24}>
        <Col style={{ height: 750 }} span={16}>
          <DemoChart data={data} chartTemplate={plotRef.current} />
        </Col>
        <Col style={{ height: 750 }} span={8}>
          <LegendTable data={data} setData={setData} />
        </Col>
      </Row>
    </Layout>
  )
}

export { Home }
