import { useState } from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { ActionButton } from '../../components/ActionButton'
import { Select } from '../../components/Select'
import { SearchBar } from '../../components/SearchBar'
import { Checkbox } from '../../components/Checkbox'
import { Icon } from '../../components/Icon'
import styles from './EventsPage.module.css'

type Priority = 'High' | 'Medium' | 'Low'
type EventStatus = 'Not Started' | 'In Progress' | 'Complete - On Time' | 'Complete - Ahead'

interface EventRow {
  id: string
  template: string
  name: string
  description: string
  priority: Priority
  startDate: string
  endDate: string
  status: EventStatus
}

const EVENTS: EventRow[] = [
  {
    id: '1',
    template: 'data-analysis',
    name: 'Q1 Data Analysis',
    description: 'Test',
    priority: 'High',
    startDate: '01/01/2026',
    endDate: '01/06/2026',
    status: 'Not Started',
  },
  {
    id: '2',
    template: 'Document Review',
    name: 'Q1 Document Processing',
    description: 'Initial setup and framework establishment for document processing',
    priority: 'High',
    startDate: '02/01/2025',
    endDate: '02/28/2025',
    status: 'In Progress',
  },
  {
    id: '3',
    template: 'Compliance Check',
    name: 'Annual Compliance Review',
    description: 'Yearly compliance documentation and verification',
    priority: 'Medium',
    startDate: '03/01/2025',
    endDate: '03/31/2025',
    status: 'Not Started',
  },
  {
    id: '4',
    template: 'Data Migration',
    name: 'Patient Records Migration',
    description: 'Migrate legacy patient records to new system',
    priority: 'High',
    startDate: '01/15/2025',
    endDate: '02/15/2025',
    status: 'Complete - On Time',
  },
  {
    id: '5',
    template: 'System Update',
    name: 'Platform Upgrade v2.0',
    description: 'Major platform upgrade with new features',
    priority: 'High',
    startDate: '02/10/2025',
    endDate: '03/10/2025',
    status: 'In Progress',
  },
  {
    id: '6',
    template: 'Document Review',
    name: 'Financial Audit Prep',
    description: 'Prepare documentation for annual financial audit',
    priority: 'Medium',
    startDate: '01/20/2025',
    endDate: '02/20/2025',
    status: 'Complete - Ahead',
  },
]

const PROJECT_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'document-review', label: 'Document Review' },
  { value: 'compliance-check', label: 'Compliance Check' },
  { value: 'data-migration', label: 'Data Migration' },
  { value: 'system-update', label: 'System Update' },
]

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'High') return <span className={styles.priorityHigh}>High</span>
  if (priority === 'Medium') return <span className={styles.priorityMedium}>Medium</span>
  return <span className={styles.priorityMedium}>Low</span>
}

function StatusBadge({ status }: { status: EventStatus }) {
  if (status === 'Not Started') return <span className={styles.statusNotStarted}>Not Started</span>
  if (status === 'In Progress') return <span className={styles.statusInProgress}>In Progress</span>
  return <span className={styles.statusComplete}>{status}</span>
}

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

interface FilterButtonProps {
  label: string
}

function FilterButton({ label }: FilterButtonProps) {
  return (
    <button type="button" className={styles.filterBtn}>
      {label}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={styles.filterBtnChevron}>
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export function EventsPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [projectType, setProjectType] = useState<string>('')
  const [search, setSearch] = useState('')

  const filteredEvents = EVENTS.filter((e) => {
    const matchesType = !projectType || projectType === 'all' ||
      e.template.toLowerCase().replace(/\s+/g, '-') === projectType
    const matchesSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.template.toLowerCase().includes(search.toLowerCase())
    return matchesType && matchesSearch
  })

  const allSelected = filteredEvents.length > 0 && filteredEvents.every((e) => selectedRows.has(e.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredEvents.map((e) => e.id)))
    }
  }

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbRow}>
        <Breadcrumbs
          items={[
            { label: 'Apps', href: '#' },
            { label: 'AchieveA', href: '#' },
            { label: 'Company Home — Events' },
          ]}
        />
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <button type="button" className={styles.backBtn} aria-label="Go back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.pageTitleText}>
            <h1>All Events</h1>
            <p>{filteredEvents.length} Milestones</p>
          </div>
        </div>
        <ActionButton
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
        >
          Add New Event
        </ActionButton>
      </div>

      {/* Filter row 1 */}
      <div className={styles.filterRow1}>
        <div className={styles.filterProjectType}>
          <Select
            options={PROJECT_TYPE_OPTIONS}
            value={projectType}
            onChange={setProjectType}
            placeholder="Project Type"
          />
        </div>
        <div className={styles.filterSearch}>
          <SearchBar
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter row 2 */}
      <div className={styles.filterRow2}>
        <FilterButton label="Template" />
        <FilterButton label="Priority" />
        <FilterButton label="Status" />
        <FilterButton label="Client" />
        <div className={styles.dateRange}>
          <button type="button" className={styles.dateBtn}>
            <Icon name="calendar-today" size={14} />
            From date
          </button>
          <span className={styles.dateArrow}>→</span>
          <button type="button" className={styles.dateBtn}>
            <Icon name="calendar-today" size={14} />
            To date
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.eventsTable}>
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <Checkbox
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th><SortHeader label="Event Template" /></th>
                <th><SortHeader label="Event Name" /></th>
                <th>Description</th>
                <th><SortHeader label="Priority" /></th>
                <th><SortHeader label="Start / End Date" /></th>
                <th><SortHeader label="Status" /></th>
                <th className={styles.actionsCol}></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((row) => (
                <tr key={row.id}>
                  <td className={styles.checkboxCol}>
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </td>
                  <td>{row.template}</td>
                  <td>
                    <a href="#" className={styles.eventName}>{row.name}</a>
                  </td>
                  <td>
                    <span className={styles.description}>{row.description}</span>
                  </td>
                  <td>
                    <PriorityBadge priority={row.priority} />
                  </td>
                  <td>
                    <span className={styles.dateRange}>
                      {row.startDate} – {row.endDate}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" className={styles.actionIconBtn} aria-label="Edit">
                        <Icon name="edit" size={16} />
                      </button>
                      <button type="button" className={[styles.actionIconBtn, styles.danger].join(' ')} aria-label="Delete">
                        <Icon name="delete" size={16} />
                      </button>
                      <button type="button" className={[styles.actionIconBtn, styles.expandBtn].join(' ')} aria-label="Expand">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className={styles.tableFooter}>
          <div className={styles.paginationControls}>
            <button type="button" className={styles.paginationBtn} disabled aria-label="Previous page">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className={styles.pageLabel}>Page 1 of 1</span>
            <button type="button" className={styles.paginationBtn} disabled aria-label="Next page">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={styles.perPageGroup}>
            <span>Results per page</span>
            <select className={styles.perPageSelect} defaultValue="20">
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
