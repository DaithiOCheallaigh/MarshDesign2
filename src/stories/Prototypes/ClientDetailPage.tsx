import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { type ClientRow } from './ClientsPage'
import styles from './ClientDetailPage.module.css'

interface ClientDetailPageProps {
  client: ClientRow
  onBack: () => void
}

interface ProjectRow {
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
    status: 'Scheduled',
    name: 'Babcock International Group PLC',
    description: '7 groups · Updated 01/11/2025',
    assignee: 'KD',
    priority: 'High',
    startDate: '01/01/2026',
    endDate: '01/06/2026',
    milestonesComplete: 0,
    milestonesTotal: 2,
    progress: 0,
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

export function ClientDetailPage({ client, onBack }: ClientDetailPageProps) {
  const [search, setSearch] = useState('')

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
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
          color: '#2563eb',
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
        <button className={styles.addProjectBtn}>+ Add New Project</button>
      </div>

      {/* 2. KPI Stats Row */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="folder" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>{client.projects}</span>
          </div>
          <span className={styles.kpiLabel}>Total Projects</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="bolt" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>{client.activeProjects}</span>
          </div>
          <span className={styles.kpiLabel}>Active Projects</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="flag" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>2</span>
          </div>
          <span className={styles.kpiLabel}>Total Milestones</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="check-circle" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>0%</span>
            <InfoIcon />
          </div>
          <span className={styles.kpiLabel}>Completion Rate</span>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiTile}>
          <div className={styles.kpiValueRow}>
            <Icon name="group" size={18} className={styles.kpiIcon} />
            <span className={styles.kpiValue}>0 members</span>
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
                    style={{ color: project.progress === 0 ? '#dc2626' : '#059669' }}
                  >
                    {project.progress}%
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${project.progress}%`,
                        background: project.progress === 0 ? '#dc2626' : '#059669',
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
                  <button className={styles.arrowBtn} title="View project">
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
