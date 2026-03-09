import { type ReactNode, useState } from 'react'
import { SearchBar } from '../../components/SearchBar'
import { Icon } from '../../components/Icon'
import styles from './AppShell.module.css'

export type ActivePage = 'dashboard' | 'events' | 'clients' | 'team' | 'templates' | 'admin'

interface NavItem {
  id: ActivePage
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'events', label: 'Events', icon: 'event' },
  { id: 'clients', label: 'Clients', icon: 'contacts' },
  { id: 'team', label: 'Team', icon: 'group' },
  { id: 'templates', label: 'Templates', icon: 'article' },
  { id: 'admin', label: 'Admin', icon: 'admin-panel-settings' },
]

export interface AppShellProps {
  activePage: ActivePage
  onNavigate?: (page: ActivePage) => void
  children: ReactNode
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.app}>
      {/* Top Header */}
      <header className={styles.header}>
        <a href="#" className={styles.headerLogo}>
          {/* Inline Client Profile logo — matching the prototype's circular-arrow icon + wordmark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="14" cy="14" r="13" stroke="#000f47" strokeWidth="2" fill="none"/>
            <path d="M9 14a5 5 0 0 1 9.33-2.5" stroke="#000f47" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 14a5 5 0 0 1-9.33 2.5" stroke="#000f47" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 10.5l1.5 1-1.5 1" stroke="#000f47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 17.5l-1.5-1 1.5-1" stroke="#000f47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.headerLogoText}>Client Profile</span>
        </a>
        <div className={styles.headerSearch}>
          <SearchBar
            placeholder="Search by Client or CN Number..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className={styles.headerRight}>
          <span className={styles.headerGreeting}>Good Morning, example</span>
          <span className={styles.headerAvatar}>
            <Icon name="account-circle" size={28} />
          </span>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
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
                  {item.id === 'admin' && <span className={styles.navBadge}>Admin</span>}
                </button>
              )
            })}
          </nav>

          <div className={styles.sidebarBottom}>
            <div className={styles.sidebarDivider} />
            <a href="#" className={styles.sidebarBottomLink}>
              <Icon name="home" size={18} color="currentColor" />
              Back to Home
            </a>
            <a href="#" className={styles.sidebarBottomLink}>
              <Icon name="keyboard-double-arrow-up" size={18} color="currentColor" />
              Back to Top
            </a>
            <div className={styles.sidebarLogo}>
              <img src="assets/marsh-logo-rgb-white.svg" alt="Marsh" className={styles.sidebarLogoImg} />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.mainInner}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
