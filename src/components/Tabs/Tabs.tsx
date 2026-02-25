import { useState, type ReactNode } from 'react'
import styles from './Tabs.module.css'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)
  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ')
  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={wrapperClasses}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={[styles.tab, tab.id === active && styles.active].filter(Boolean).join(' ')}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        {activeTab?.content}
      </div>
    </div>
  )
}
