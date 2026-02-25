import { type ReactNode } from 'react'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  title?: string
  footer?: ReactNode
  padding?: 'none' | 'small' | 'medium' | 'large'
  className?: string
}

export function Card({ children, title, footer, padding = 'medium', className }: CardProps) {
  const classes = [styles.card, styles[`padding-${padding}`], className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {title && <div className={styles.header}><h3 className={styles.title}>{title}</h3></div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
