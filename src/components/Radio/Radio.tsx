import { type InputHTMLAttributes, forwardRef } from 'react'
import styles from './Radio.module.css'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ')

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <input ref={ref} type="radio" id={inputId} className={styles.nativeInput} {...props} />
        <span className={styles.radio} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  }
)

Radio.displayName = 'Radio'
