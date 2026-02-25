import styles from './Breadcrumbs.module.css'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const classes = [styles.nav, className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className={styles.item}>
              {!isLast ? (
                <>
                  {item.href ? (
                    <a href={item.href} className={styles.link}>{item.label}</a>
                  ) : (
                    <span className={styles.link}>{item.label}</span>
                  )}
                  <span className={styles.separator} aria-hidden="true">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </>
              ) : (
                <span className={styles.current} aria-current="page">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
