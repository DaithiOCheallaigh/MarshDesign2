import { useState } from 'react'
import { ActionButton } from '../../components/ActionButton'
import { TabNav } from '../../components/TabNav'
import { Icon } from '../../components/Icon'
import styles from './ClientsPage.module.css'

interface ClientRow {
  id: string
  name: string
  country: string
  teamSize: number
  projects: number
  activeProjects: number
  lastUpdated: string
}

const CLIENTS: ClientRow[] = [
  {
    id: '1',
    name: 'The Palms South Properties',
    country: 'Miami, FL',
    teamSize: 25,
    projects: 3,
    activeProjects: 2,
    lastUpdated: '2025-01-14',
  },
  {
    id: '2',
    name: 'Sunrise Healthcare Group',
    country: 'Boston, MA',
    teamSize: 18,
    projects: 5,
    activeProjects: 3,
    lastUpdated: '2025-01-12',
  },
  {
    id: '3',
    name: 'TechVision Solutions',
    country: 'San Francisco, CA',
    teamSize: 42,
    projects: 8,
    activeProjects: 5,
    lastUpdated: '2025-01-10',
  },
  {
    id: '4',
    name: 'GlobalFinance Partners',
    country: 'New York, NY',
    teamSize: 35,
    projects: 6,
    activeProjects: 4,
    lastUpdated: '2025-01-08',
  },
  {
    id: '5',
    name: 'RetailMax Corporation',
    country: 'Chicago, IL',
    teamSize: 28,
    projects: 4,
    activeProjects: 2,
    lastUpdated: '2025-01-05',
  },
]

interface TemplateCard {
  id: string
  name: string
  category: string
  groups: number
  milestones: number
  accent: string
}

const TEMPLATES: TemplateCard[] = [
  { id: '1', name: 'Banking Compliance Framework', category: 'Banking', groups: 2, milestones: 4, accent: '#7c3aed' },
  { id: '2', name: 'Business Intelligence Platform', category: 'Enterprise', groups: 2, milestones: 4, accent: '#dc2626' },
  { id: '3', name: 'Document Processing Pipeline', category: 'Enterprise', groups: 1, milestones: 2, accent: '#16a34a' },
  { id: '4', name: 'Healthcare Data Analytics', category: 'Healthcare', groups: 2, milestones: 4, accent: '#16a34a' },
  { id: '5', name: 'Retail Inventory Automation', category: 'Retail', groups: 2, milestones: 4, accent: '#db2777' },
  { id: '6', name: 'Risk Management & Trading', category: 'Finance', groups: 2, milestones: 5, accent: '#0891b2' },
]

function SortHeader({ label }: { label: string }) {
  return (
    <span className={styles.sortIcon}>
      {label}
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className={styles.sortIconArrows}>
        <path d="M4 1L1 4h6L4 1zM4 11L1 8h6L4 11z" fill="currentColor" />
      </svg>
    </span>
  )
}

function FilterButton({ label }: { label: string }) {
  return (
    <button type="button" className={styles.filterBtn}>
      {label}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export function ClientsPage({ defaultTab = 'my-clients' }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [searchValue, setSearchValue] = useState('')

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <Icon name="contacts" size={24} className={styles.pageIcon} />
          <h1>Clients</h1>
        </div>
        {activeTab === 'my-clients' ? (
          <ActionButton
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          >
            Add Client
          </ActionButton>
        ) : (
          <ActionButton
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          >
            Create Template
          </ActionButton>
        )}
      </div>

      {/* Tab row + search */}
      <div className={styles.tabRow}>
        <TabNav
          items={[
            { id: 'my-clients', label: 'My Clients' },
            { id: 'templates', label: 'Templates' },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
        {activeTab === 'my-clients' ? (
          <div className={styles.searchWrap}>
            <Icon name="search" size={14} color="var(--color-neutral-750)" />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search Clients"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        ) : (
          <div className={styles.searchWrap}>
            <Icon name="search" size={14} color="var(--color-neutral-750)" />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search Templates"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}
      </div>

      {activeTab === 'my-clients' ? (
        <>
          {/* Filter row */}
          <div className={styles.filterRow}>
            <FilterButton label="Industry" />
            <FilterButton label="Status" />
            <FilterButton label="Priority" />
          </div>

          {/* Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.clientsTable}>
                <thead>
                  <tr>
                    <th><SortHeader label="Client" /></th>
                    <th><SortHeader label="Country" /></th>
                    <th><SortHeader label="Teamsize" /></th>
                    <th><SortHeader label="Projects" /></th>
                    <th><SortHeader label="Active Projects" /></th>
                    <th><SortHeader label="Last Updated" /></th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CLIENTS.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <a href="#" className={styles.clientName}>{row.name}</a>
                      </td>
                      <td className={styles.muted}>{row.country}</td>
                      <td>{row.teamSize}</td>
                      <td>
                        <a href="#" className={styles.numberLink}>{row.projects}</a>
                      </td>
                      <td>
                        <a href="#" className={styles.numberLink}>{row.activeProjects}</a>
                      </td>
                      <td className={styles.muted}>{row.lastUpdated}</td>
                      <td>
                        <button type="button" className={styles.actionDots} aria-label="More actions">
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer / pagination */}
            <div className={styles.tableFooter}>
              <div className={styles.paginationControls}>
                <button type="button" className={styles.paginationBtn} disabled aria-label="First page">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M7 2L3 5L7 8M4 2L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className={styles.paginationBtn} disabled aria-label="Previous page">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={styles.pageSelect}>
                  <span>Page</span>
                  <input type="number" className={styles.pageSelectInput} defaultValue={1} min={1} />
                  <span>of 1</span>
                </div>
                <button type="button" className={styles.paginationBtn} disabled aria-label="Next page">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className={styles.paginationBtn} disabled aria-label="Last page">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3 2L7 5L3 8M6 2L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className={styles.perPageGroup}>
                <span>Results per page</span>
                <select className={styles.perPageSelect} defaultValue="15">
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Templates tab */
        <div className={styles.templateGrid}>
          {TEMPLATES.filter((t) =>
            t.name.toLowerCase().includes(searchValue.toLowerCase())
          ).map((tpl) => (
            <div key={tpl.id} className={styles.templateCard} style={{ '--accent': tpl.accent } as React.CSSProperties}>
              <div className={styles.templateCardHeader}>
                <div>
                  <a href="#" className={styles.templateName}>{tpl.name}</a>
                  <div className={styles.templateCategory}>{tpl.category}</div>
                </div>
                <div className={styles.templateActions}>
                  <button type="button" className={styles.templateIconBtn} aria-label="Edit">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10 2l2 2-7 7H3V9l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className={styles.templateIconBtn} aria-label="More">
                    <svg width="14" height="4" viewBox="0 0 14 4" fill="none">
                      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                      <circle cx="7" cy="2" r="1.5" fill="currentColor" />
                      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.templateStats}>
                <span className={styles.templateStat}>
                  <Icon name="layers" size={14} color="var(--color-neutral-750)" />
                  {tpl.groups} group{tpl.groups !== 1 ? 's' : ''}
                </span>
                <span className={styles.templateStat}>
                  <Icon name="checklist" size={14} color="var(--color-neutral-750)" />
                  {tpl.milestones} milestone{tpl.milestones !== 1 ? 's' : ''}
                </span>
              </div>
              <button type="button" className={styles.useTemplateBtn}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
