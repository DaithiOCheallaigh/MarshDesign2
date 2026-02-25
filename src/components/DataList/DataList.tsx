import styles from './DataList.module.css'

export interface DataItem {
  label: string
  value: string | number
}

export interface DataListProps {
  items: DataItem[]
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export function DataList({ items, layout = 'vertical', className }: DataListProps) {
  const classes = [styles.list, styles[layout], className].filter(Boolean).join(' ')

  return (
    <dl className={classes}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
