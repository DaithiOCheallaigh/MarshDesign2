import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'danger'
  /** Size of the button */
  size?: 'small' | 'medium' | 'large'
  /** Optional icon element rendered before the label */
  iconLeading?: ReactNode
  /** Optional icon element rendered after the label */
  iconTrailing?: ReactNode
  /** @deprecated Use iconTrailing */
  icon?: ReactNode
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'medium',
  iconLeading,
  iconTrailing,
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  // Normalize legacy variants
  const resolvedVariant = variant === 'outline' ? 'ghost' : variant === 'danger' ? 'destructive' : variant

  const trailingIcon = iconTrailing ?? icon

  const classNames = [
    styles.button,
    styles[resolvedVariant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classNames} {...props}>
      {iconLeading && <span className={styles.icon}>{iconLeading}</span>}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
    </button>
  )
}
