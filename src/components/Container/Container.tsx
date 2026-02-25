import { type HTMLAttributes, type ReactNode } from 'react'
import styles from './Container.module.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
}

export function Container({ children, size = 'lg', centered = true, className, ...props }: ContainerProps) {
  return (
    <div
      className={[styles.container, styles[size], centered && styles.centered, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
