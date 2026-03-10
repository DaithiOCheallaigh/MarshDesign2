import { type ReactNode, useState, useRef } from 'react'
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
  const mainRef = useRef<HTMLElement>(null)

  return (
    <div className={styles.app}>
      {/* Sidebar — full height */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarAppHeader}>
          <div className={styles.sidebarAppIcon}>
            {/* LenAI sprite */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Antenna */}
              <rect x="11" y="0" width="2" height="4" rx="1" fill="white" fillOpacity="0.85"/>
              <circle cx="12" cy="0.75" r="1.5" fill="white"/>
              {/* Face */}
              <rect x="2" y="4" width="20" height="18" rx="5" fill="white" fillOpacity="0.92"/>
              {/* Left eye */}
              <circle cx="8.5" cy="12" r="2.5" fill="var(--color-brand-midnight)"/>
              <circle cx="9.4" cy="10.9" r="0.85" fill="white"/>
              {/* Right eye */}
              <circle cx="15.5" cy="12" r="2.5" fill="var(--color-brand-midnight)"/>
              <circle cx="16.4" cy="10.9" r="0.85" fill="white"/>
              {/* Smile */}
              <path d="M8 17.5 Q12 20.5 16 17.5" stroke="var(--color-brand-midnight)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span className={styles.sidebarAppTitle}>Client Profile</span>
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
                {item.id === 'admin' && <span className={styles.navBadge}>Admin</span>}
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarDivider} />
          <a
            href="#"
            className={styles.sidebarBottomLink}
            onClick={(e) => { e.preventDefault(); onNavigate?.('dashboard') }}
          >
            <Icon name="home" size={18} color="currentColor" />
            Back to Home
          </a>
          <a
            href="#"
            className={styles.sidebarBottomLink}
            onClick={(e) => { e.preventDefault(); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <Icon name="keyboard-double-arrow-up" size={18} color="currentColor" />
            Back to Top
          </a>
          <div className={styles.sidebarLogo}>
            <img src="assets/marsh-logo-new-white.png" alt="Marsh" className={styles.sidebarLogoImg} />
          </div>
        </div>
      </aside>

      {/* Right panel: header + main */}
      <div className={styles.rightPanel}>
        <header className={styles.header}>
          <div className={styles.headerStart} />
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

        <main ref={mainRef} className={styles.main}>
          <div className={styles.mainInner}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
