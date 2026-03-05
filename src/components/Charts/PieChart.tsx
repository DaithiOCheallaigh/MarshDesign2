import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Charts.module.css'

export interface PieChartDatum {
  label: string
  value: number
  color?: string
}

export interface PieChartProps {
  data: PieChartDatum[]
  title?: string
  height?: number
  donut?: boolean
  showLegend?: boolean
}

// Marsh brand data-viz palette — blue scale (brand.marsh.com §data-visualization)
const DEFAULT_COLORS = ['#000f47', '#0b4bff', '#82baff', '#ceecff', '#ffbf00', '#14853d', '#c53532']

export function PieChart({ data, title, height = 300, donut = true, showLegend = true }: PieChartProps) {
  const innerRadius = donut ? '52%' : 0

  return (
    <div className={styles.chartWrapper}>
      {title && <h3 className={styles.chartTitle}>{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="75%"
            paddingAngle={donut ? 3 : 0}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={entry.label} fill={entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) => [(value ?? 0).toLocaleString(), '']}
            contentStyle={{
              fontFamily: 'Noto Sans',
              fontSize: 12,
              borderRadius: 4,
              border: '1px solid #b9b6b1',
              boxShadow: '0 4px 16px rgba(0,15,71,0.10)',
            }}
          />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  )
}
