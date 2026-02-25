import { type ReactNode } from 'react'
import styles from './Toast.module.css'

export type ToastVariant = 'default' | 'success' | 'danger' | 'warning'

export interface ToastProps {
  message: ReactNode
  variant?: ToastVariant
  onDismiss?: () => void
  className?: string
}

export function Toast({ message, variant = 'default', onDismiss, className }: ToastProps) {
  const classes = [styles.toast, styles[variant], className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        {variant === 'success' && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {variant === 'danger' && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M5 5L9 9M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        {variant === 'warning' && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L13 12H1L7 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        {variant === 'default' && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 6v4M7 4v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      </span>
      <span className={styles.message}>{message}</span>
      {onDismiss && (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
