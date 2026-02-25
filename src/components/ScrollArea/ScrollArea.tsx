import { type HTMLAttributes, type ReactNode } from 'react'
import styles from './ScrollArea.module.css'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxHeight?: string | number
  maxWidth?: string | number
  direction?: 'vertical' | 'horizontal' | 'both'
}

export function ScrollArea({
  children,
  maxHeight = 320,
  maxWidth,
  direction = 'vertical',
  className,
  style,
  ...props
}: ScrollAreaProps) {
  const overflowStyle = {
    overflowY: direction === 'horizontal' ? 'hidden' : 'auto',
    overflowX: direction === 'vertical' ? 'hidden' : 'auto',
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
    ...style,
  } as React.CSSProperties

  return (
    <div
      className={[styles.scrollArea, className].filter(Boolean).join(' ')}
      style={overflowStyle}
      {...props}
    >
      {children}
    </div>
  )
}
