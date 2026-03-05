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

// Marsh brand data-viz palette — blue scale + status colours (brand.marsh.com §data-visualization)
const DEFAULT_COLORS = ['#000f47', '#0b4bff', '#82baff', '#ceecff', '#ffbf00', '#14853d', '#c53532']

const TICK_STYLE = { fontFamily: 'Noto Sans', fontSize: 12, fill: '#7b7974' } // neutral-750
const TOOLTIP_STYLE = {
  fontFamily: 'Noto Sans',
  fontSize: 12,
  borderRadius: 4,
  border: '1px solid #b9b6b1',
  boxShadow: '0 4px 16px rgba(0,15,71,0.10)',
}

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
          {showGrid && <CartesianGrid strokeDasharray="2 4" stroke="#f7f3ee" />}
          <XAxis
            dataKey={layout === 'horizontal' ? xKey : undefined}
            type={layout === 'horizontal' ? 'category' : 'number'}
            tick={TICK_STYLE}
            axisLine={false} tickLine={false}
          />
          <YAxis
            dataKey={layout === 'vertical' ? xKey : undefined}
            type={layout === 'vertical' ? 'category' : 'number'}
            tick={TICK_STYLE}
            axisLine={false} tickLine={false}
            width={layout === 'vertical' ? 80 : 40}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              radius={[2, 2, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
