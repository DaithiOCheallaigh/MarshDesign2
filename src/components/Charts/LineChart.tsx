import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Charts.module.css'

export interface LineChartSeries {
  key: string
  label: string
  color?: string
}

export interface LineChartProps {
  data: Record<string, unknown>[]
  series: LineChartSeries[]
  xKey: string
  title?: string
  height?: number
  showGrid?: boolean
  showLegend?: boolean
}

const DEFAULT_COLORS = ['#002C77', '#0077A0', '#009DE0', '#00968F', '#76D3FF']

export function LineChart({
  data,
  series,
  xKey,
  title,
  height = 300,
  showGrid = true,
  showLegend = true,
}: LineChartProps) {
  return (
    <div className={styles.chartWrapper}>
      {title && <h3 className={styles.chartTitle}>{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />}
          <XAxis dataKey={xKey} tick={{ fontFamily: 'Noto Sans', fontSize: 12, fill: '#949494' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontFamily: 'Noto Sans', fontSize: 12, fill: '#949494' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontFamily: 'Noto Sans', fontSize: 12, borderRadius: 8, border: '1px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}
