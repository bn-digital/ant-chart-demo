import { Dispatch, FC, SetStateAction } from 'react'
import { IDividend } from '../../interfaces'
import { Table, Typography } from 'antd'
import { ColumnProps } from 'antd/lib/table'

type LegendTableProps = {
  data: IDividend[]
  setData: Dispatch<SetStateAction<IDividend[]>>
}

type TextProps = {
  text: string
  underline?: boolean
}

const HeadText: FC<TextProps> = ({ text }) => (
  <Typography.Title level={4} style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>
    {text}
  </Typography.Title>
)
const CellText: FC<TextProps> = ({ text, underline = false }) => (
  <Typography.Text
    style={{
      textTransform: 'uppercase',
      textDecoration: underline ? 'underline' : 'unset',
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    {text}
  </Typography.Text>
)

export const LegendTable: FC<Partial<LegendTableProps>> = ({ data, setData }) => {
  const columns: ColumnProps<IDividend>[] = [
    {
      title: <HeadText text={'Security'} />,
      dataIndex: 'security',
      key: 'security',
      render: (data: number) => {
        return {
          children: <CellText text={String(data)} underline />,
          props: {},
        }
      },
    },
    {
      title: <HeadText text={'rp %'} />,
      dataIndex: 'rp',
      key: 'rp',
      align: 'center',
      sorter: (a: { rp: number }, b: { rp: number }) => a.rp - b.rp,
      render: (data: number) => {
        return {
          children: <CellText text={String(data)} />,
          props: {
            align: 'right',
          },
        }
      },
    },
    {
      title: <HeadText text={'Net Yield (%)'} />,
      dataIndex: 'netYield',
      key: 'netYield',
      sorter: (a: { netYield: number }, b: { netYield: number }) => a.netYield - b.netYield,
      render: (data: number) => {
        return {
          children: <CellText text={String(data)} />,
          props: {
            align: 'right',
          },
        }
      },
    },
    {
      title: <HeadText text={'Div Grth (%)'} />,
      dataIndex: 'divGrth',
      key: 'divGrth',
      sorter: (a: { divGrth: number }, b: { divGrth: number }) => a.divGrth - b.divGrth,
      render: (data: number) => {
        return {
          children: <CellText text={String(data)} />,
          props: {
            align: 'right',
          },
        }
      },
    },
  ]

  return (
    <Table
      className={'legend-table'}
      size={'small'}
      rowKey={'security'}
      dataSource={data}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns={columns}
      pagination={false}
      onRow={record => ({
        onMouseEnter: () => {
          const currentRow = record.security
          const updatedArr = data?.map((item: IDividend) => {
            return item.security === currentRow
              ? { ...item, isActive: !item.isActive }
              : { ...item, isActive: false, isGrayed: true }
          })
          setData && updatedArr && setData(updatedArr)
        },
        onMouseLeave: () => {
          const updatedArr = data?.map((item: IDividend) => {
            return { ...item, isActive: false, isGrayed: false }
          })
          setData && updatedArr && setData(updatedArr)
        },
      })}
    />
  )
}
