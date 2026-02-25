import { type ReactNode } from 'react'
import styles from './Callout.module.css'

export type CalloutVariant = 'info' | 'success' | 'warning' | 'danger'

export interface CalloutProps {
  variant?: CalloutVariant
  title: string
  children?: ReactNode
  className?: string
}

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const classes = [styles.callout, styles[variant], className].filter(Boolean).join(' ')

  return (
    <aside className={classes}>
      <strong className={styles.title}>{title}</strong>
      {children && <div className={styles.body}>{children}</div>}
    </aside>
  )
}
