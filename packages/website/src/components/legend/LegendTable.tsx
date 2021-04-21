import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { IDividend } from '../../interfaces'
import { Table, Typography } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Icon } from "../icon/Icon"
import { ReactComponent as SortingArrow } from '../../components/icon/icons/arrow.svg'
import './LegendTable.less'

type LegendTableProps = {
  data: IDividend[]
  setData: Dispatch<SetStateAction<IDividend[]>>
}

type TextProps = {
  text: string
  underline: boolean
  weight: number
  color: '#24242A' | '#686A7F'
  fontSize: 11 | 12
  icon: ReactNode
}

const CellText: FC<Partial<TextProps>> = ({
  text,
  underline = false,
  weight = 600,
  color = '#24242A',
  fontSize = 12,
  icon,
}) => (
  <Typography.Text
    style={{
      textTransform: 'uppercase',
      textDecoration: underline ? 'underline' : 'unset',
      fontSize: fontSize,
      fontWeight: weight,
      color: color,
    }}
  >
    {text}
    {icon && icon}
  </Typography.Text>
)

export const LegendTable: FC<Partial<LegendTableProps>> = ({ data, setData }) => {
  const columns: ColumnProps<IDividend>[] = [
    {
      title: (
        <CellText
          text={'Security'}
          weight={800}
          fontSize={11}
          icon={<Icon svg={SortingArrow} wrapperSize={21} size={15} style={{ marginLeft: 2 }} />}
        />
      ),
      dataIndex: 'security',
      key: 'security',
      sorter: (a: { security: string }, b: { security: string }) => a.security.localeCompare(b.security),
      render: (data: number) => {
        return {
          children: <CellText text={String(data)} underline />,
          props: {},
        }
      },
    },
    {
      title: <CellText text={'rp %'} weight={700} color='#686A7F' fontSize={11} />,
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
      title: <CellText text={'Net Yield (%)'} weight={700} color='#686A7F' fontSize={11} />,
      dataIndex: 'netYield',
      key: 'netYield',
      align: 'right',
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
      title: <CellText text={'Div Grth (%)'} weight={700} color='#686A7F' fontSize={11} />,
      dataIndex: 'divGrth',
      key: 'divGrth',
      align: 'right',
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
