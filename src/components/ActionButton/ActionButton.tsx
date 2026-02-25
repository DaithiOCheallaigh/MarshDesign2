import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './ActionButton.module.css'

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, children, variant = 'primary', size = 'medium', loading, className, disabled, ...props }, ref) => {
    const classes = [styles.actionButton, styles[variant], styles[size], loading && styles.loading, className].filter(Boolean).join(' ')
    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round"/>
          </svg>
        ) : icon && (
          <span className={styles.icon}>{icon}</span>
        )}
        <span>{children}</span>
      </button>
    )
  }
)
ActionButton.displayName = 'ActionButton'
