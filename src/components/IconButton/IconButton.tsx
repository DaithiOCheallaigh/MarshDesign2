import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './IconButton.module.css'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'outline', size = 'medium', className, ...props }, ref) => {
    const classes = [styles.iconButton, styles[variant], styles[size], className].filter(Boolean).join(' ')
    return (
      <button ref={ref} className={classes} aria-label={label} title={label} {...props}>
        {icon}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'
