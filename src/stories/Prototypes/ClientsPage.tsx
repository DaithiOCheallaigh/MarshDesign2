import { useState, useEffect } from 'react'
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
  const [clients, setClients] = useState<ClientRow[]>(CLIENTS)
  const [toast, setToast] = useState<string | null>(null)
  const [showAddClient, setShowAddClient] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', cn: '', country: '', industryPractice: '' })

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / perPage))
  const rangeStart = filteredClients.length === 0 ? 0 : 1
  const rangeEnd = filteredClients.length

  function handleDelete(id: string) {
    setClients(prev => prev.filter(c => c.id !== id))
    setToast('Client removed')
  }

  function handleAddClient() {
    if (!newClient.name.trim()) return
    const client: ClientRow = {
      id: `c-${Date.now()}`,
      name: newClient.name.trim(),
      cn: newClient.cn.trim() || `CN${Math.floor(Math.random()*1e9)}`,
      country: newClient.country.trim() || '—',
      industryPractice: newClient.industryPractice.trim() || '—',
      teamSize: 0, projects: 0, activeProjects: 0, progress: 0,
    }
    setClients(prev => [client, ...prev])
    setNewClient({ name: '', cn: '', country: '', industryPractice: '' })
    setShowAddClient(false)
    setToast(`"${client.name}" added`)
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Clients</h1>
        <button className={styles.addBtn} onClick={() => setShowAddClient(true)}>+ Add Client</button>
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
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#9ca3af', padding: '32px 0' }}>
                  No clients found.
                </td>
              </tr>
            ) : (
              filteredClients.map(client => {
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
              {rangeStart}–{rangeEnd} of {filteredClients.length}
            </span>
            <button className={styles.pageBtn} disabled aria-label="First page">«</button>
            <button className={styles.pageBtn} disabled aria-label="Previous page">‹</button>
            <span>Page 1 of {totalPages}</span>
            <button className={styles.pageBtn} disabled={totalPages <= 1} aria-label="Next page">›</button>
            <button className={styles.pageBtn} disabled={totalPages <= 1} aria-label="Last page">»</button>
          </div>
        </div>
      </div>

      {/* Add Client dialog */}
      {showAddClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 28, width: 480, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#111827' }}>Add Client</h2>
              <button onClick={() => setShowAddClient(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6b7280', lineHeight: 1 }}>×</button>
            </div>
            {[
              { label: 'Client Name *', key: 'name', placeholder: 'Full client name' },
              { label: 'CN Number *', key: 'cn', placeholder: 'CN...' },
              { label: 'Country', key: 'country', placeholder: 'e.g. AU' },
              { label: 'Industry Practice', key: 'industryPractice', placeholder: 'e.g. Forestry & Wood Products' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={newClient[f.key as keyof typeof newClient]}
                  onChange={e => setNewClient(prev => ({ ...prev, [f.key]: e.target.value }))}
                  style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', fontSize: 13, boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
              <button onClick={() => setShowAddClient(false)} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAddClient} disabled={!newClient.name.trim()} style={{ background: '#002C77', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: newClient.name.trim() ? 'pointer' : 'not-allowed', opacity: newClient.name.trim() ? 1 : 0.6 }}>Add Client</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, background: '#002C77', color: 'white',
          padding: '10px 18px', borderRadius: 8, fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          zIndex: 100, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
