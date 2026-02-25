import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'draft'

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const classes = [styles.badge, styles[variant], className].filter(Boolean).join(' ')
  return <span className={classes}>{label}</span>
}
