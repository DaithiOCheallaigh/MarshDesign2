import styles from './Progress.module.css'

export interface ProgressProps {
  value: number
  max?: number
  label?: string
  showLabel?: boolean
  className?: string
}

export function Progress({ value, max = 100, label, showLabel = false, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const classes = [styles.wrapper, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.track} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className={styles.value}>{Math.round(pct)}%</span>}
    </div>
  )
}
