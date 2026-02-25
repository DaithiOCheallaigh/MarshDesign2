import { type HTMLAttributes, type ReactNode, type ElementType } from 'react'
import styles from './Box.module.css'

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  p?: string | number
  px?: string | number
  py?: string | number
  m?: string | number
  mx?: string | number
  my?: string | number
  bg?: string
  radius?: 'small' | 'medium' | 'large' | 'full'
  shadow?: 'sm' | 'md' | 'lg'
  border?: boolean
}

export function Box({
  as: Tag = 'div',
  children,
  p, px, py, m, mx, my,
  bg, radius, shadow, border,
  className,
  style,
  ...props
}: BoxProps) {
  const inlineStyle: React.CSSProperties = {
    padding: p !== undefined ? (typeof p === 'number' ? `${p}px` : p) : undefined,
    paddingLeft: px !== undefined ? (typeof px === 'number' ? `${px}px` : px) : undefined,
    paddingRight: px !== undefined ? (typeof px === 'number' ? `${px}px` : px) : undefined,
    paddingTop: py !== undefined ? (typeof py === 'number' ? `${py}px` : py) : undefined,
    paddingBottom: py !== undefined ? (typeof py === 'number' ? `${py}px` : py) : undefined,
    margin: m !== undefined ? (typeof m === 'number' ? `${m}px` : m) : undefined,
    marginLeft: mx !== undefined ? (typeof mx === 'number' ? `${mx}px` : mx) : undefined,
    marginRight: mx !== undefined ? (typeof mx === 'number' ? `${mx}px` : mx) : undefined,
    marginTop: my !== undefined ? (typeof my === 'number' ? `${my}px` : my) : undefined,
    marginBottom: my !== undefined ? (typeof my === 'number' ? `${my}px` : my) : undefined,
    background: bg,
    borderRadius: radius ? `var(--radius-${radius})` : undefined,
    boxShadow: shadow ? `var(--shadow-${shadow})` : undefined,
    border: border ? '1px solid var(--color-gray-100)' : undefined,
    ...style,
  }

  return (
    <Tag className={[styles.box, className].filter(Boolean).join(' ')} style={inlineStyle} {...props}>
      {children}
    </Tag>
  )
}
