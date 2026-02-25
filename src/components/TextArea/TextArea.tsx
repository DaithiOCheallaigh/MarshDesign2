import { forwardRef, type TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const classes = [styles.textarea, error && styles.hasError, className].filter(Boolean).join(' ')

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label} htmlFor={textareaId}>{label}</label>}
        <textarea ref={ref} id={textareaId} className={classes} aria-invalid={!!error} {...props} />
        {hint && !error && <span className={styles.hint}>{hint}</span>}
        {error && <span className={styles.error} role="alert">{error}</span>}
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'
