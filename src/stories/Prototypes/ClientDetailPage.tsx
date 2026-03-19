import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { type ClientRow } from './ClientsPage'
import styles from './ClientDetailPage.module.css'

interface ClientDetailPageProps {
  client: ClientRow
  onBack: () => void
  onViewProject?: (project: ProjectRow) => void
}

export interface ProjectRow {
  id: string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Blocked'
  name: string
  description: string
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  startDate: string
  endDate: string
  milestonesComplete: number
  milestonesTotal: number
  progress: number
  budget: string | null
}

const PROJECTS: ProjectRow[] = [
  {
    id: '1',
    status: 'In Progress',
    name: 'FY2026 Risk Programme — Babcock International',
    description: '4 groups · 18 milestones · Updated 15/01/2026',
    assignee: 'KD',
    priority: 'High',
    startDate: '01/01/2026',
    endDate: '30/06/2026',
    milestonesComplete: 4,
    milestonesTotal: 18,
    progress: 22,
    budget: null,
  },
  {
    id: '2',
    status: 'Scheduled',
    name: 'FY2026 Renewal — Aviation & Marine',
    description: '2 groups · 8 milestones · Starts 01/03/2026',
    assignee: 'AT',
    priority: 'Medium',
    startDate: '01/03/2026',
    endDate: '31/05/2026',
    milestonesComplete: 0,
    milestonesTotal: 8,
    progress: 0,
    budget: null,
  },
  {
    id: '3',
    status: 'Completed',
    name: 'FY2025 Annual Review & Close',
    description: '3 groups · 12 milestones · Closed 31/12/2025',
    assignee: 'SM',
    priority: 'Low',
    startDate: '01/10/2025',
    endDate: '31/12/2025',
    milestonesComplete: 12,
    milestonesTotal: 12,
    progress: 100,
    budget: null,
  },
]

const STATUS_CLASS: Record<ProjectRow['status'], string> = {
  Scheduled: styles.statusScheduled,
  'In Progress': styles.statusInProgress,
  Completed: styles.statusCompleted,
  Blocked: styles.statusBlocked,
}

const PRIORITY_CLASS: Record<ProjectRow['priority'], string> = {
  High: styles.priorityHigh,
  Medium: styles.priorityMedium,
  Low: styles.priorityLow,
}

function InfoIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: '#9ca3af', flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.25" y="7" width="1.5" height="5" rx="0.75" fill="currentColor" />
      <circle cx="8" cy="5" r="0.85" fill="currentColor" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClientIconBox() {
  return (
    <div className={styles.clientIconBox}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="1.75" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function ClientDetailPage({ client, onBack, onViewProject }: ClientDetailPageProps) {
  const [search, setSearch] = useState('')
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({ name: '', description: '', priority: 'High' as 'High' | 'Medium' | 'Low' })

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      {showAddProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 28, width: 480, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#111827' }}>Add New Project</h2>
              <button onClick={() => setShowAddProject(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6b7280', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>Project Name *</label>
              <input type="text" placeholder="Project name" value={newProject.name} onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', fontSize: 13, boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>Description</label>
              <textarea placeholder="Brief description" value={newProject.description} onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))} rows={3} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', fontSize: 13, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>Priority</label>
              <select value={newProject.priority} onChange={e => setNewProject(p => ({ ...p, priority: e.target.value as 'High' | 'Medium' | 'Low' }))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', fontSize: 13, background: 'white', fontFamily: 'inherit' }}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
              <button onClick={() => setShowAddProject(false)} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={() => {
                  if (!newProject.name.trim()) return
                  setShowAddProject(false)
                  setNewProject({ name: '', description: '', priority: 'High' })
                }}
                disabled={!newProject.name.trim()}
                style={{ background: '#000f47', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: newProject.name.trim() ? 'pointer' : 'not-allowed', opacity: newProject.name.trim() ? 1 : 0.6 }}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back link */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: '#0b4bff',
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 16,
          padding: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3.5L5.5 8L10 12.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Clients
      </button>

      {/* 1. Client Header Card */}
      <div className={styles.clientHeader}>
        <div className={styles.clientHeaderLeft}>
          <ClientIconBox />
          <div className={styles.clientInfo}>
            <span className={styles.clientName}>{client.name}</span>
            <span className={styles.clientMeta}>{client.cn}</span>
            <span className={styles.clientMeta}>Industry Practice: {client.industryPractice}</span>
            <span className={styles.clientMeta}>Address: Wetherill Park, New South Wales, AU</span>
          </div>
        </div>
        <button className={styles.addProjectBtn} onClick={() => setShowAddProject(true)}>+ Add New Project</button>
      </div>

      {/* 2. KPI Stats Row */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="folder" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>{PROJECTS.length}</span>
          </div>
          <span className={styles.kpiLabel}>Total Projects</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="bolt" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>{PROJECTS.filter(p => p.status === 'In Progress').length}</span>
          </div>
          <span className={styles.kpiLabel}>Active Projects</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="flag" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>38</span>
          </div>
          <span className={styles.kpiLabel}>Total Milestones</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="check-circle-outline" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>42%</span>
            <InfoIcon />
          </div>
          <span className={styles.kpiLabel}>Completion Rate</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="group" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>4 members</span>
            <InfoIcon />
          </div>
          <span className={styles.kpiLabel}>Team Size</span>
        </div>
      </div>

      {/* 3. Project Portfolio Section */}
      <div className={styles.portfolioHeader}>
        <h2 className={styles.portfolioTitle}>Project Portfolio</h2>
        <div className={styles.portfolioControls}>
          <input
            className={styles.portfolioSearch}
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className={styles.portfolioSelect}>
            <option>All Status</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Blocked</option>
          </select>
          <select className={styles.portfolioSelect}>
            <option>Last Updated</option>
            <option>Name A–Z</option>
            <option>Priority</option>
          </select>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Timeline</th>
              <th>Milestones</th>
              <th>Progress</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                {/* Status */}
                <td>
                  <span
                    className={`${styles.statusBadge} ${STATUS_CLASS[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>

                {/* Project Name */}
                <td>
                  <div className={styles.projectName}>{project.name}</div>
                </td>

                {/* Description */}
                <td>
                  <div className={styles.projectDesc}>{project.description}</div>
                </td>

                {/* Assignee */}
                <td>
                  <div className={styles.assigneeAvatar}>{project.assignee}</div>
                </td>

                {/* Priority */}
                <td>
                  <span
                    className={`${styles.priorityBadge} ${PRIORITY_CLASS[project.priority]}`}
                  >
                    {project.priority}
                  </span>
                </td>

                {/* Timeline */}
                <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                  {project.startDate} – {project.endDate}
                </td>

                {/* Milestones */}
                <td style={{ fontSize: 13 }}>
                  {project.milestonesComplete} / {project.milestonesTotal}
                </td>

                {/* Progress */}
                <td>
                  <div
                    className={styles.progressText}
                    style={{ color: project.progress === 0 ? '#c53532' : '#14853d' }}
                  >
                    {project.progress}%
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${project.progress}%`,
                        background: project.progress === 0 ? '#c53532' : '#14853d',
                      }}
                    />
                  </div>
                </td>

                {/* Budget */}
                <td>
                  {project.budget === null ? (
                    <span className={styles.naText}>N/A</span>
                  ) : (
                    project.budget
                  )}
                </td>

                {/* Actions */}
                <td>
                  <button
                    className={styles.arrowBtn}
                    title="View project"
                    onClick={() => onViewProject?.(project)}
                  >
                    <ChevronRightIcon />
                  </button>
                </td>
              </tr>
            ))}

            {filteredProjects.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: 'center', color: '#9ca3af', padding: '24px 12px' }}
                >
                  No projects match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
