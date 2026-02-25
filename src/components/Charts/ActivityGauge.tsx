import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import styles from './Charts.module.css'

export interface ActivityGaugeProps {
  value: number
  max?: number
  label?: string
  sublabel?: string
  color?: string
  size?: number
}

export function ActivityGauge({
  value,
  max = 100,
  label,
  sublabel,
  color = '#002C77',
  size = 160,
}: ActivityGaugeProps) {
  const pct = Math.min(Math.max(value / max, 0), 1)
  const filled = pct * 100
  const data = [{ value: filled, fill: color }, { value: 100 - filled, fill: '#F0F0F0' }]
  const displayValue = Number.isInteger(value) ? value : value.toFixed(1)

  return (
    <div className={styles.gaugeWrapper} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          barSize={12}
        >
          <RadialBar dataKey="value" cornerRadius={6} background={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className={styles.gaugeCenter}>
        <span className={styles.gaugeValue}>{displayValue}</span>
        {label && <span className={styles.gaugeLabel}>{label}</span>}
        {sublabel && <span className={styles.gaugeSublabel}>{sublabel}</span>}
      </div>
    </div>
  )
}
