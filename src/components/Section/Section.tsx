import { type HTMLAttributes, type ReactNode } from 'react'
import styles from './Section.module.css'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  title?: string
  description?: string
  spacing?: 'sm' | 'md' | 'lg'
}

export function Section({ children, title, description, spacing = 'md', className, ...props }: SectionProps) {
  return (
    <section className={[styles.section, styles[spacing], className].filter(Boolean).join(' ')} {...props}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
