import styles from './SortToast.module.css'

export type SortDirection = 'asc' | 'desc' | 'none'

export interface SortToastProps {
  column: string
  direction: SortDirection
  onClear?: () => void
  onToggle?: () => void
}

const AscIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DescIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function SortToast({ column, direction, onClear, onToggle }: SortToastProps) {
  if (direction === 'none') return null

  return (
    <div className={styles.sortToast} role="status">
      <span className={styles.icon}>{direction === 'asc' ? <AscIcon /> : <DescIcon />}</span>
      <span className={styles.text}>
        Sorted by <strong>{column}</strong> ({direction === 'asc' ? 'A → Z' : 'Z → A'})
      </span>
      {onToggle && (
        <button className={styles.toggle} onClick={onToggle} title="Toggle sort direction">
          {direction === 'asc' ? <DescIcon /> : <AscIcon />}
        </button>
      )}
      {onClear && (
        <button className={styles.clear} onClick={onClear} aria-label="Clear sort">
          ×
        </button>
      )}
    </div>
  )
}
