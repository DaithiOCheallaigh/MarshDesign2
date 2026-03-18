import { useState } from 'react'
import styles from './ClientsPage.module.css'

// =============================================================================
// Types
// =============================================================================

export interface ClientRow {
  id: string
  name: string
  cn: string
  country: string
  industryPractice: string
  teamSize: number
  projects: number
  activeProjects: number
  progress: number
}

// =============================================================================
// Data
// =============================================================================

const CLIENTS: ClientRow[] = [
  {
    id: '1',
    name: 'Tesrol Australia Pty Ltd',
    cn: 'CN114935407',
    country: 'AU',
    industryPractice: 'Forestry & Integrated Wood Products',
    teamSize: 0,
    projects: 1,
    activeProjects: 0,
    progress: 0,
  },
]

// =============================================================================
// Icons (inline SVG)
// =============================================================================

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 3V2.5A0.5 0.5 0 0 1 6.5 2h3a0.5 0.5 0 0 1 0.5 0.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 7h4M6 10h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 13c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14.5 13c0-1.933-1.343-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 4h11M6 4V2.5h4V4M5.5 4l.5 9h4l.5-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// =============================================================================
// Component
// =============================================================================

interface ClientsPageProps {
  onViewClient?: (client: ClientRow) => void
}

export function ClientsPage({ onViewClient }: ClientsPageProps = {}) {
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(20)
  const [rows, setRows] = useState<ClientRow[]>(CLIENTS)

  const filtered = rows.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const rangeStart = filtered.length === 0 ? 0 : 1
  const rangeEnd = filtered.length

  function handleDelete(id: string) {
    setRows(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Clients</h1>
        <button className={styles.addBtn}>+ Add Client</button>
      </div>

      {/* Search bar */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}><SearchIcon /></span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Client..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table card */}
      <div className={styles.tableCard}>
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Country</th>
              <th>Industry Practice</th>
              <th>Team Size</th>
              <th>Projects</th>
              <th>Active Projects</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#9ca3af', padding: '32px 0' }}>
                  No clients found.
                </td>
              </tr>
            ) : (
              filtered.map(client => {
                const isZero = client.progress === 0
                return (
                  <tr key={client.id}>
                    {/* Client */}
                    <td>
                      <div className={styles.clientCell}>
                        <span className={styles.clientCellIcon}><ClipboardIcon /></span>
                        <div>
                          <div
                            className={styles.clientNameLink}
                            onClick={() => onViewClient?.(client)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && onViewClient?.(client)}
                          >
                            {client.name}
                          </div>
                          <div className={styles.clientCN}>{client.cn}</div>
                        </div>
                      </div>
                    </td>

                    {/* Country */}
                    <td>{client.country}</td>

                    {/* Industry Practice */}
                    <td>{client.industryPractice}</td>

                    {/* Team Size */}
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#6b7280' }}>
                        <PeopleIcon />
                        {client.teamSize}
                      </span>
                    </td>

                    {/* Projects */}
                    <td>{client.projects}</td>

                    {/* Active Projects */}
                    <td>{client.activeProjects}</td>

                    {/* Progress */}
                    <td>
                      <div className={`${styles.progressText} ${isZero ? styles.progressTextRed : styles.progressTextBlue}`}>
                        {client.progress}%
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${isZero ? styles.progressFillRed : styles.progressFillBlue}`}
                          style={{ width: `${client.progress}%` }}
                        />
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(client.id)}
                        aria-label={`Delete ${client.name}`}
                        title="Delete client"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <span>Results per page:</span>
            <select
              className={styles.perPageSelect}
              value={perPage}
              onChange={e => setPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className={styles.paginationRight}>
            <span>
              {rangeStart}–{rangeEnd} of {filtered.length}
            </span>
            <button className={styles.pageBtn} disabled aria-label="First page">«</button>
            <button className={styles.pageBtn} disabled aria-label="Previous page">‹</button>
            <span>Page 1 of {totalPages}</span>
            <button className={styles.pageBtn} disabled={totalPages <= 1} aria-label="Next page">›</button>
            <button className={styles.pageBtn} disabled={totalPages <= 1} aria-label="Last page">»</button>
          </div>
        </div>
      </div>
    </div>
  )
}
