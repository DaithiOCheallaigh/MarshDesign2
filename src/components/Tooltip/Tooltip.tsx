import { type ReactNode, useState } from 'react'
import styles from './Tooltip.module.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: ReactNode
  placement?: TooltipPlacement
  children: ReactNode
  className?: string
}

export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ')
  const tipClasses = [styles.tip, styles[placement], visible && styles.visible].filter(Boolean).join(' ')

  return (
    <span
      className={wrapperClasses}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span className={tipClasses} role="tooltip">{content}</span>
    </span>
  )
}
