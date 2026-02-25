import { type InputHTMLAttributes, forwardRef } from 'react'
import styles from './Switch.module.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ')

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <input ref={ref} type="checkbox" role="switch" id={inputId} className={styles.nativeInput} {...props} />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  }
)

Switch.displayName = 'Switch'
