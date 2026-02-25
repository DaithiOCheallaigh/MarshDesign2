import { type ReactNode } from 'react'
import styles from './Charts.module.css'

export type MetricTrend = 'up' | 'down' | 'neutral'

export interface MetricContainerProps {
  label: string
  value: string | number
  unit?: string
  trend?: MetricTrend
  trendValue?: string
  description?: string
  icon?: ReactNode
}

const TrendUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 9l3.5-3.5L7.5 7.5 11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrendDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 3l3.5 3.5L7.5 4.5 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 9h3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function MetricContainer({ label, value, unit, trend, trendValue, description, icon }: MetricContainerProps) {
  const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : styles.trendNeutral

  return (
    <div className={styles.metric}>
      <div className={styles.metricHeader}>
        <span className={styles.metricLabel}>{label}</span>
        {icon && <span className={styles.metricIcon}>{icon}</span>}
      </div>
      <div className={styles.metricBody}>
        <span className={styles.metricValue}>{value}</span>
        {unit && <span className={styles.metricUnit}>{unit}</span>}
      </div>
      {(trend || description) && (
        <div className={styles.metricFooter}>
          {trend && trendValue && (
            <span className={[styles.metricTrend, trendClass].join(' ')}>
              {trend === 'up' && <TrendUpIcon />}
              {trend === 'down' && <TrendDownIcon />}
              {trendValue}
            </span>
          )}
          {description && <span className={styles.metricDescription}>{description}</span>}
        </div>
      )}
    </div>
  )
}
