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

// Marsh brand data-viz palette — blue scale + status colours (brand.marsh.com §data-visualization)
const DEFAULT_COLORS = ['#000f47', '#0b4bff', '#82baff', '#ceecff', '#ffbf00', '#14853d', '#c53532']

const TICK_STYLE = { fontFamily: 'Noto Sans', fontSize: 12, fill: '#7b7974' } // neutral-750
const TOOLTIP_STYLE = {
  fontFamily: 'Noto Sans',
  fontSize: 12,
  borderRadius: 4,
  border: '1px solid #b9b6b1',          // neutral-500
  boxShadow: '0 4px 16px rgba(0,15,71,0.10)', // midnight-tinted shadow
}

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
          {showGrid && <CartesianGrid strokeDasharray="2 4" stroke="#f7f3ee" />}
          <XAxis dataKey={xKey} tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}
