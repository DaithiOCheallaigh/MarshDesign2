import { type ReactNode, useState, useRef } from 'react'
import { SearchBar } from '../../components/SearchBar'
import { Icon } from '../../components/Icon'
import styles from './AppShell.module.css'

export type ActivePage = 'clients' | 'templates'

interface NavItem {
  id: ActivePage
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'clients', label: 'My Clients', icon: 'contacts' },
  { id: 'templates', label: 'Templates', icon: 'article' },
]

export interface AppShellProps {
  activePage: ActivePage
  onNavigate?: (page: ActivePage) => void
  children: ReactNode
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  const [searchValue, setSearchValue] = useState('')
  const mainRef = useRef<HTMLElement>(null)

  return (
    <div className={styles.app}>
      {/* Sidebar — full height */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarAppHeader}>
          <div className={styles.sidebarBrandMarsh}>MARSH</div>
          <div className={styles.sidebarBrandSub}>MILESTONE TRACKER</div>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activePage
            return (
              <button
                key={item.id}
                className={[styles.navItem, isActive ? styles.navItemActive : ''].filter(Boolean).join(' ')}
                onClick={() => onNavigate?.(item.id)}
                type="button"
              >
                <Icon name={item.icon} size={20} color="currentColor" />
                <span>{item.label}</span>
              </button>
            )
          })}

          {/* Push bottom links to bottom */}
          <div style={{ flex: 1 }} />
          <div className={styles.sidebarDivider} />
          <div className={styles.sidebarBottomLinks}>
            <button type="button" className={styles.sidebarFooterLink}>
              <Icon name="help-outline" size={18} color="currentColor" />
              <span>Help Guide</span>
            </button>
            <button type="button" className={`${styles.sidebarFooterLink} ${styles.sidebarFooterLinkSignOut}`}>
              <Icon name="power-settings-new" size={18} color="currentColor" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        <div className={styles.sidebarLogo}>
          <img src="assets/marsh-logo-new-white.png" alt="Marsh" className={styles.sidebarLogoImg} />
        </div>
      </aside>

      {/* Right panel: header + main */}
      <div className={styles.rightPanel}>
        <header className={styles.header}>
          <div className={styles.headerStart} />
          <div className={styles.headerSearch}>
            <SearchBar
              placeholder="Search milestones, projects, or team members..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerUserInfo}>
              <span className={styles.headerUserName}>Kelly, Dave</span>
              <span className={styles.headerUserEmail}>dave.kelly@mmc.com</span>
            </div>
            <div className={styles.headerAvatar}>KD</div>
          </div>
        </header>

        <main ref={mainRef} className={styles.main}>
          <div className={styles.mainInner}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
