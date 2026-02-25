import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './Slider.module.css'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, className, id, value, defaultValue, ...props }, ref) => {
    const sliderId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <label className={styles.label} htmlFor={sliderId}>{label}</label>}
            {showValue && <span className={styles.value}>{value ?? defaultValue ?? 0}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={sliderId}
          className={styles.slider}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'
