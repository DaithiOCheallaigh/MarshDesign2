import styles from './TabNav.module.css'

export interface TabNavItem {
  id: string
  label: string
  href?: string
  badge?: string | number
}

export interface TabNavProps {
  items: TabNavItem[]
  active: string
  onChange?: (id: string) => void
  className?: string
}

export function TabNav({ items, active, onChange, className }: TabNavProps) {
  const classes = [styles.nav, className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Tab navigation">
      {items.map((item) => {
        const isActive = item.id === active
        const Tag = item.href ? 'a' : 'button'
        const extraProps = item.href
          ? { href: item.href }
          : { type: 'button' as const, onClick: () => onChange?.(item.id) }
        const itemClasses = [styles.item, isActive && styles.active].filter(Boolean).join(' ')

        return (
          <Tag key={item.id} className={itemClasses} aria-current={isActive ? 'page' : undefined} {...(extraProps as any)}>
            {item.label}
            {item.badge !== undefined && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </Tag>
        )
      })}
    </nav>
  )
}
