import { type HTMLAttributes, type ReactNode, type ElementType, type CSSProperties } from 'react'

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  direction?: CSSProperties['flexDirection']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: CSSProperties['flexWrap']
  gap?: string | number
  inline?: boolean
}

export function Flex({
  as: Tag = 'div',
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  inline,
  style,
  ...props
}: FlexProps) {
  const inlineStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined,
    ...style,
  }

  return <Tag style={inlineStyle} {...props}>{children}</Tag>
}
