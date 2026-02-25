import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  error?: string
  hint?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const inputClass = [styles.input, error && styles.hasError, prefix && styles.hasPrefix, suffix && styles.hasSuffix].filter(Boolean).join(' ')

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
        <div className={styles.inputWrapper}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input ref={ref} id={inputId} className={inputClass} aria-invalid={!!error} {...props} />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {hint && !error && <span className={styles.hint}>{hint}</span>}
        {error && <span className={styles.error} role="alert">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
