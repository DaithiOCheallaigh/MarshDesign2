import { type ReactNode } from 'react'
import styles from './Table.module.css'

export interface Column<T = Record<string, unknown>> {
  key: string
  header: string
  render?: (row: T) => ReactNode
}

export interface TableProps<T = Record<string, unknown>> {
  columns: Column<T>[]
  rows: T[]
  keyField?: string
  className?: string
}

export function Table<T extends Record<string, unknown>>({ columns, rows, keyField = 'id', className }: TableProps<T>) {
  const classes = [styles.wrapper, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={String(row[keyField] ?? ri)} className={styles.tr}>
              {columns.map((col) => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
