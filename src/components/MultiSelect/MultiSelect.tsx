import { useState, useRef, useEffect } from 'react'
import styles from './MultiSelect.module.css'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function MultiSelect({ options, value = [], onChange, placeholder = 'Select options...', label, disabled }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const toggle = (val: string) => {
    const next = value.includes(val) ? value.filter(v => v !== val) : [...value, val]
    onChange?.(next)
  }

  const selectedLabels = options.filter(o => value.includes(o.value)).map(o => o.label)

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        type="button"
        className={[styles.trigger, open && styles.open, disabled && styles.disabled].filter(Boolean).join(' ')}
        onClick={() => !disabled && setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={styles.triggerText}>
          {selectedLabels.length > 0 ? (
            <span className={styles.chips}>
              {selectedLabels.map(l => (
                <span key={l} className={styles.chip}>{l}</span>
              ))}
            </span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>
        <svg className={[styles.chevron, open && styles.chevronUp].filter(Boolean).join(' ')} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <ul className={styles.dropdown} role="listbox" aria-multiselectable="true">
          {options.map(opt => {
            const selected = value.includes(opt.value)
            return (
              <li
                key={opt.value}
                className={[styles.option, selected && styles.selected].filter(Boolean).join(' ')}
                role="option"
                aria-selected={selected}
                onClick={() => toggle(opt.value)}
              >
                <span className={styles.checkbox}>{selected && '✓'}</span>
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
