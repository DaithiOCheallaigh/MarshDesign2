import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Charts.module.css'

export interface BarChartSeries {
  key: string
  label: string
  color?: string
}

export interface BarChartProps {
  data: Record<string, unknown>[]
  series: BarChartSeries[]
  xKey: string
  title?: string
  height?: number
  layout?: 'vertical' | 'horizontal'
  showGrid?: boolean
  showLegend?: boolean
  stacked?: boolean
}

const DEFAULT_COLORS = ['#002C77', '#0077A0', '#009DE0', '#00968F', '#76D3FF']

export function BarChart({
  data,
  series,
  xKey,
  title,
  height = 300,
  layout = 'horizontal',
  showGrid = true,
  showLegend = true,
  stacked = false,
}: BarChartProps) {
  return (
    <div className={styles.chartWrapper}>
      {title && <h3 className={styles.chartTitle}>{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart data={data} layout={layout} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />}
          <XAxis
            dataKey={layout === 'horizontal' ? xKey : undefined}
            type={layout === 'horizontal' ? 'category' : 'number'}
            tick={{ fontFamily: 'Noto Sans', fontSize: 12, fill: '#949494' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            dataKey={layout === 'vertical' ? xKey : undefined}
            type={layout === 'vertical' ? 'category' : 'number'}
            tick={{ fontFamily: 'Noto Sans', fontSize: 12, fill: '#949494' }}
            axisLine={false} tickLine={false}
            width={layout === 'vertical' ? 80 : 40}
          />
          <Tooltip contentStyle={{ fontFamily: 'Noto Sans', fontSize: 12, borderRadius: 8, border: '1px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              radius={[3, 3, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
