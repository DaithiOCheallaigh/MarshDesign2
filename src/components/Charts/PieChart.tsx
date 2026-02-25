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

const DEFAULT_COLORS = ['#002C77', '#0077A0', '#009DE0', '#00968F', '#76D3FF', '#8096B2', '#FF7A00']

export function PieChart({ data, title, height = 300, donut = false, showLegend = true }: PieChartProps) {
  const innerRadius = donut ? '55%' : 0

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
            outerRadius="70%"
            paddingAngle={donut ? 3 : 0}
          >
            {data.map((entry, i) => (
              <Cell key={entry.label} fill={entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) => [(value ?? 0).toLocaleString(), '']}
            contentStyle={{ fontFamily: 'Noto Sans', fontSize: 12, borderRadius: 8, border: '1px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
          />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  )
}
