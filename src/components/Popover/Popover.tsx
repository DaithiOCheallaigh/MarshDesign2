import { type ReactNode, useState, useRef, useEffect } from 'react'
import styles from './Popover.module.css'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  placement?: PopoverPlacement
  className?: string
}

export function Popover({ trigger, children, placement = 'bottom', className }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ')
  const panelClasses = [styles.panel, styles[placement], open && styles.open].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      <span className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        {trigger}
      </span>
      <div className={panelClasses} role="dialog" aria-modal="false">
        {children}
      </div>
    </div>
  )
}
