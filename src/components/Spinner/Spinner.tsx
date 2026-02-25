import styles from './Spinner.module.css'

export type SpinnerSize = 'small' | 'medium' | 'large'

export interface SpinnerProps {
  size?: SpinnerSize
  label?: string
  className?: string
}

export function Spinner({ size = 'medium', label = 'Loading…', className }: SpinnerProps) {
  const classes = [styles.spinner, styles[size], className].filter(Boolean).join(' ')
  return (
    <span className={classes} role="status" aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="47 16" />
      </svg>
    </span>
  )
}
