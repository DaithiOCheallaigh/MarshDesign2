import styles from './Segmentation.module.css'

export interface SegmentItem {
  id: string
  label: string
}

export interface SegmentationProps {
  items: SegmentItem[]
  value: string
  onChange: (id: string) => void
  className?: string
}

export function Segmentation({ items, value, onChange, className }: SegmentationProps) {
  const classes = [styles.group, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="group">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={[styles.segment, item.id === value && styles.active].filter(Boolean).join(' ')}
          aria-pressed={item.id === value}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
