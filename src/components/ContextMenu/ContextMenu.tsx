import { useState, useRef, useEffect, type ReactNode } from 'react'
import styles from './ContextMenu.module.css'

export interface ContextMenuItem {
  label: string
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
  icon?: ReactNode
  divider?: boolean
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  children: ReactNode
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <>
      <div ref={wrapperRef} onContextMenu={handleContextMenu} style={{ display: 'contents' }}>
        {children}
      </div>
      {open && (
        <div
          ref={menuRef}
          className={styles.menu}
          style={{ top: pos.y, left: pos.x }}
          role="menu"
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className={styles.divider} />
            ) : (
              <button
                key={i}
                className={[styles.item, item.danger && styles.danger].filter(Boolean).join(' ')}
                onClick={() => { item.onClick?.(); setOpen(false) }}
                disabled={item.disabled}
                role="menuitem"
              >
                {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </>
  )
}
