import {
  RadarChart as ReRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Charts.module.css'

export interface RadarChartSeries {
  key: string
  label: string
  color?: string
}

export interface RadarChartProps {
  data: Record<string, unknown>[]
  series: RadarChartSeries[]
  angleKey: string
  title?: string
  height?: number
  showLegend?: boolean
}

const DEFAULT_COLORS = ['#002C77', '#009DE0', '#00968F']

export function RadarChart({ data, series, angleKey, title, height = 320, showLegend = true }: RadarChartProps) {
  return (
    <div className={styles.chartWrapper}>
      {title && <h3 className={styles.chartTitle}>{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ReRadarChart data={data}>
          <PolarGrid stroke="#F0F0F0" />
          <PolarAngleAxis dataKey={angleKey} tick={{ fontFamily: 'Noto Sans', fontSize: 12, fill: '#949494' }} />
          <PolarRadiusAxis tick={{ fontFamily: 'Noto Sans', fontSize: 10, fill: '#949494' }} />
          <Tooltip contentStyle={{ fontFamily: 'Noto Sans', fontSize: 12, borderRadius: 8, border: '1px solid #F0F0F0', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
          {showLegend && <Legend wrapperStyle={{ fontFamily: 'Noto Sans', fontSize: 12 }} />}
          {series.map((s, i) => (
            <Radar
              key={s.key}
              name={s.label}
              dataKey={s.key}
              stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
