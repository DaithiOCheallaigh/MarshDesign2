import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import styles from './DropdownInput.module.css'

export interface DropdownInputOption {
  value: string
  label: string
}

export interface DropdownInputProps {
  options: DropdownInputOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function DropdownInput({ options, value = '', onChange, placeholder = 'Search...', label, disabled }: DropdownInputProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setOpen(true)
    onChange?.(e.target.value)
  }

  const select = (opt: DropdownInputOption) => {
    setQuery(opt.label)
    onChange?.(opt.value)
    setOpen(false)
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={handleInput}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <svg className={styles.icon} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {open && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map(opt => (
            <li key={opt.value} className={styles.option} onClick={() => select(opt)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
