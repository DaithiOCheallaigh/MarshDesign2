import { type HTMLAttributes, type ReactNode, type ElementType, type CSSProperties } from 'react'

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  columns?: number | string
  rows?: number | string
  gap?: string | number
  columnGap?: string | number
  rowGap?: string | number
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyItems']
}

export function Grid({
  as: Tag = 'div',
  children,
  columns = 12,
  rows,
  gap,
  columnGap,
  rowGap,
  align,
  justify,
  style,
  ...props
}: GridProps) {
  const inlineStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    gridTemplateRows: rows ? (typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows) : undefined,
    gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined,
    columnGap: columnGap !== undefined ? (typeof columnGap === 'number' ? `${columnGap}px` : columnGap) : undefined,
    rowGap: rowGap !== undefined ? (typeof rowGap === 'number' ? `${rowGap}px` : rowGap) : undefined,
    alignItems: align,
    justifyItems: justify,
    ...style,
  }

  return <Tag style={inlineStyle} {...props}>{children}</Tag>
}
