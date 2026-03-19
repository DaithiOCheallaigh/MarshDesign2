import { useState, useEffect } from 'react'
import { Icon } from '../../components/Icon'
import { type ClientRow } from './ClientsPage'
import { type ProjectRow } from './ClientDetailPage'
import styles from './ProjectDetailPage.module.css'

// =============================================================================
// Types
// =============================================================================

type MilestoneStatus = 'Not Started' | 'In Progress' | 'Completed' | 'At Risk' | 'Overdue'

interface Milestone {
  id: string
  name: string
  assignee: string
  dueDate: string
  status: MilestoneStatus
  progress: number
  notes: string
}

interface MilestoneGroup {
  id: string
  name: string
  milestones: Milestone[]
}

// =============================================================================
// Data
// =============================================================================

const MILESTONE_GROUPS: MilestoneGroup[] = [
  {
    id: 'g1',
    name: 'Service Delivery',
    milestones: [
      { id: 'm1', name: 'Policy Documentation Issued', assignee: 'KD', dueDate: '31/01/2026', status: 'In Progress', progress: 60, notes: 'Marine and aviation sections pending review.' },
      { id: 'm2', name: 'Global Register of Insurance', assignee: 'AT', dueDate: '28/02/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm3', name: 'Statutory Certificates - TWMIC Letters', assignee: 'SM', dueDate: '15/01/2026', status: 'Completed', progress: 100, notes: 'All certificates issued and filed.' },
      { id: 'm4', name: 'Invoice Issuance', assignee: 'KD', dueDate: '31/01/2026', status: 'In Progress', progress: 40, notes: 'Awaiting sign-off from finance.' },
      { id: 'm5', name: 'Acknowledgement of Correspondence / Phone Calls', assignee: 'AT', dueDate: '07/01/2026', status: 'Completed', progress: 100, notes: '' },
      { id: 'm6', name: 'Meeting Minutes', assignee: 'SM', dueDate: '14/01/2026', status: 'At Risk', progress: 20, notes: 'Notes from Dec board meeting not yet circulated.' },
      { id: 'm7', name: 'WIP Calls', assignee: 'KD', dueDate: '21/01/2026', status: 'Not Started', progress: 0, notes: '' },
    ],
  },
  {
    id: 'g2',
    name: 'Renewal',
    milestones: [
      { id: 'm8', name: 'Renewal Strategy Presentation', assignee: 'KD', dueDate: '15/03/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm9', name: 'Expiry Schedule Distributed', assignee: 'AT', dueDate: '01/03/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm10', name: 'Market Submissions Sent', assignee: 'SM', dueDate: '01/04/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm11', name: 'Insurer Terms Received', assignee: 'KD', dueDate: '15/04/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm12', name: 'Binding of Cover Confirmed', assignee: 'AT', dueDate: '30/04/2026', status: 'Not Started', progress: 0, notes: '' },
    ],
  },
  {
    id: 'g3',
    name: 'Risk Management — Tech Solutions',
    milestones: [
      { id: 'm13', name: 'Risk Data Ingestion Setup', assignee: 'SM', dueDate: '28/02/2026', status: 'In Progress', progress: 50, notes: 'API integration with client ERP underway.' },
      { id: 'm14', name: 'Dashboard Configuration', assignee: 'KD', dueDate: '15/03/2026', status: 'Not Started', progress: 0, notes: '' },
      { id: 'm15', name: 'User Access & Permissions', assignee: 'AT', dueDate: '31/03/2026', status: 'Not Started', progress: 0, notes: '' },
    ],
  },
  {
    id: 'g4',
    name: 'Claims Management',
    milestones: [
      { id: 'm16', name: 'Claims Register Established', assignee: 'SM', dueDate: '31/01/2026', status: 'Completed', progress: 100, notes: 'Register live in client portal.' },
      { id: 'm17', name: 'Open Claims Review', assignee: 'KD', dueDate: '28/02/2026', status: 'At Risk', progress: 30, notes: '3 claims outstanding beyond SLA.' },
      { id: 'm18', name: 'Quarterly Claims Report', assignee: 'AT', dueDate: '15/04/2026', status: 'Not Started', progress: 0, notes: '' },
    ],
  },
]

// =============================================================================
// Status helpers
// =============================================================================

const STATUS_COLOR: Record<MilestoneStatus, string> = {
  Completed: '#14853d',
  'In Progress': '#0b4bff',
  'At Risk': '#d97706',
  Overdue: '#c53532',
  'Not Started': '#9ca3af',
}

// =============================================================================
// Inline SVG helpers
// =============================================================================

function ChevronDownIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.chevron}${collapsed ? ` ${styles.chevronCollapsed}` : ''}`}
    >
      <path
        d="M3.5 6L8 10.5L12.5 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12" cy="8" r="1.25" fill="currentColor" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#14853d' }}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#0b4bff' }}>
      <path d="M9.5 2L4 9h5l-2.5 5L14 7H9L11.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#d97706' }}>
      <path d="M8 2L14.5 13.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#9ca3af' }}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// =============================================================================
// Component props
// =============================================================================

interface ProjectDetailPageProps {
  client: ClientRow
  project: ProjectRow
  onBack: () => void
}

// =============================================================================
// Component
// =============================================================================

export function ProjectDetailPage({ client, project, onBack }: ProjectDetailPageProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(MILESTONE_GROUPS.map((g) => g.id)),
  )
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  function toggleGroup(id: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Aggregate stats
  const allMilestones = MILESTONE_GROUPS.flatMap((g) => g.milestones)
  const totalCount = allMilestones.length
  const completedCount = allMilestones.filter((m) => m.status === 'Completed').length
  const inProgressCount = allMilestones.filter((m) => m.status === 'In Progress').length
  const atRiskCount = allMilestones.filter((m) => m.status === 'At Risk').length
  const notStartedCount = allMilestones.filter((m) => m.status === 'Not Started').length

  // Project status badge class
  const projectStatusClass =
    project.status === 'Scheduled'
      ? styles.statusScheduled
      : project.status === 'In Progress'
        ? styles.statusInProgress
        : project.status === 'Completed'
          ? styles.statusCompleted
          : styles.statusBlocked

  const priorityClass =
    project.priority === 'High'
      ? styles.priorityHigh
      : project.priority === 'Medium'
        ? styles.priorityMedium
        : styles.priorityLow

  return (
    <div className={styles.page}>
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className={styles.breadcrumb}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: '#6b7280', flexShrink: 0 }}>
          <path d="M10 3.5L5.5 8L10 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <button className={styles.breadcrumbLink} onClick={onBack}>
          {client.name}
        </button>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{project.name}</span>
      </div>

      {/* ── Project Header ─────────────────────────────────────────────── */}
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderLeft}>
          <span className={`${styles.statusBadge} ${projectStatusClass}`}>{project.status}</span>
          <h1 className={styles.projectName}>{project.name}</h1>
          <div className={styles.projectMeta}>
            <Icon name="calendar-today" size={13} style={{ color: '#9ca3af' }} />
            <span>{project.startDate} – {project.endDate}</span>
            <span style={{ color: '#e5e7eb' }}>|</span>
            <Icon name="folder" size={13} style={{ color: '#9ca3af' }} />
            <span>{totalCount} milestones</span>
          </div>
        </div>
        <div className={styles.projectHeaderRight}>
          <div className={styles.assigneeAvatar}>{project.assignee}</div>
          <span className={`${styles.priorityBadge} ${priorityClass}`}>{project.priority} Priority</span>
          <button className={styles.exportBtn}>
            <Icon name="cloud-download" size={13} />
            Export
          </button>
          <button className={styles.addMilestoneBtn} onClick={() => setToast('Add Milestone coming soon')}>
            + Add Milestone
          </button>
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <div className={styles.statsBar}>
        <div className={styles.statTile}>
          <span className={styles.statValue}>{totalCount}</span>
          <span className={styles.statLabel}>Total Milestones</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statTile}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircleIcon />
            <span className={styles.statValue} style={{ color: '#14853d' }}>{completedCount}</span>
          </div>
          <span className={styles.statLabel}>Completed</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statTile}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BoltIcon />
            <span className={styles.statValue} style={{ color: '#0b4bff' }}>{inProgressCount}</span>
          </div>
          <span className={styles.statLabel}>In Progress</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statTile}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <WarningIcon />
            <span className={styles.statValue} style={{ color: '#d97706' }}>{atRiskCount}</span>
          </div>
          <span className={styles.statLabel}>At Risk</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statTile}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CircleIcon />
            <span className={styles.statValue} style={{ color: '#9ca3af' }}>{notStartedCount}</span>
          </div>
          <span className={styles.statLabel}>Not Started</span>
        </div>
      </div>

      {/* ── Milestone Groups ───────────────────────────────────────────── */}
      {MILESTONE_GROUPS.map((group) => {
        const isExpanded = expandedGroups.has(group.id)
        const groupCompleted = group.milestones.filter((m) => m.status === 'Completed').length
        const groupPercent = group.milestones.length > 0
          ? Math.round((groupCompleted / group.milestones.length) * 100)
          : 0

        return (
          <div key={group.id} className={styles.groupCard}>
            {/* Group header */}
            <div
              className={styles.groupHeader}
              onClick={() => toggleGroup(group.id)}
              role="button"
              aria-expanded={isExpanded}
            >
              <ChevronDownIcon collapsed={!isExpanded} />
              <span className={styles.groupName}>{group.name}</span>
              <span className={styles.groupBadge}>{group.milestones.length}</span>
              <div className={styles.groupProgress}>
                <div
                  className={styles.groupProgressFill}
                  style={{ width: `${groupPercent}%` }}
                />
              </div>
              <span className={styles.groupProgressText}>{groupPercent}%</span>
            </div>

            {/* Milestone table */}
            {isExpanded && (
              <table className={styles.milestoneTable}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Milestone Name</th>
                    <th>Assignee</th>
                    <th>Due Date</th>
                    <th>Progress</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.milestones.map((milestone) => (
                    <tr key={milestone.id}>
                      {/* Status */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            className={styles.statusDot}
                            style={{ background: STATUS_COLOR[milestone.status] }}
                          />
                          <span style={{ fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>
                            {milestone.status}
                          </span>
                        </div>
                      </td>

                      {/* Name */}
                      <td>
                        <span className={styles.milestoneName}>{milestone.name}</span>
                      </td>

                      {/* Assignee */}
                      <td>
                        <div className={styles.assigneeAvatar}>{milestone.assignee}</div>
                      </td>

                      {/* Due Date */}
                      <td style={{ fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>
                        {milestone.dueDate}
                      </td>

                      {/* Progress */}
                      <td>
                        <div className={styles.miniProgress}>
                          <div className={styles.miniProgressBar}>
                            <div
                              className={styles.miniProgressFill}
                              style={{
                                width: `${milestone.progress}%`,
                                background: STATUS_COLOR[milestone.status],
                              }}
                            />
                          </div>
                          <span className={styles.miniProgressText}>{milestone.progress}%</span>
                        </div>
                      </td>

                      {/* Notes */}
                      <td>
                        {milestone.notes ? (
                          <span className={styles.notesText} title={milestone.notes}>
                            {milestone.notes}
                          </span>
                        ) : (
                          <span style={{ color: '#d1d5db', fontSize: 12 }}>—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td>
                        <button
                          className={styles.actionBtn}
                          title="More actions"
                          onClick={() => setToast('Actions coming soon')}
                        >
                          <DotsIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )
      })}

      {/* ── Toast ─────────────────────────────────────────────────────── */}
      {toast && (
        <div className={styles.toast}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.2" />
            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  )
}
