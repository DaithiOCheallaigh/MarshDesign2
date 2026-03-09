import { useState } from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { Icon } from '../../components/Icon'
import { type EventRow } from './EventsPage'
import styles from './MilestonesPage.module.css'

// ---- Types ----

type MilestoneStatus = 'complete' | 'in-progress' | 'not-started' | 'at-risk'

interface MilestoneItem {
  id: string
  name: string
  description: string
  status: MilestoneStatus
  assignee: string
  assigneeDept: string
  startDate: string
  endDate: string
  progress: number
  onTime: boolean
}

interface MilestoneSection {
  id: string
  name: string
  milestones: MilestoneItem[]
}

// ---- Mock data ----

const MILESTONE_SECTIONS: MilestoneSection[] = [
  {
    id: 's1',
    name: 'Compliance Foundation',
    milestones: [
      {
        id: 'm1',
        name: 'Define Regulatory Requirements',
        description: 'Identify all applicable regulations and document compliance requirements',
        status: 'complete',
        assignee: 'Sarah Chen',
        assigneeDept: 'Legal',
        startDate: '01 Jan 2026',
        endDate: '07 Jan 2026',
        progress: 100,
        onTime: true,
      },
      {
        id: 'm2',
        name: 'Set Up Audit Logging',
        description: 'Implement comprehensive audit trail for all system actions',
        status: 'complete',
        assignee: 'James Park',
        assigneeDept: 'Engineering',
        startDate: '08 Jan 2026',
        endDate: '15 Jan 2026',
        progress: 100,
        onTime: true,
      },
      {
        id: 'm3',
        name: 'Risk Assessment Framework',
        description: 'Establish risk scoring methodology and assessment criteria',
        status: 'in-progress',
        assignee: 'Maria Santos',
        assigneeDept: 'Risk',
        startDate: '16 Jan 2026',
        endDate: '30 Jan 2026',
        progress: 65,
        onTime: true,
      },
    ],
  },
  {
    id: 's2',
    name: 'Process Automation',
    milestones: [
      {
        id: 'm4',
        name: 'KYC Workflow Implementation',
        description: 'Build automated Know Your Customer verification workflow',
        status: 'in-progress',
        assignee: 'David Wilson',
        assigneeDept: 'Engineering',
        startDate: '01 Feb 2026',
        endDate: '15 Feb 2026',
        progress: 40,
        onTime: true,
      },
      {
        id: 'm5',
        name: 'AML Screening Integration',
        description: 'Integrate Anti-Money Laundering screening with third-party provider',
        status: 'not-started',
        assignee: 'Lisa Zhang',
        assigneeDept: 'Compliance',
        startDate: '16 Feb 2026',
        endDate: '28 Feb 2026',
        progress: 0,
        onTime: true,
      },
      {
        id: 'm6',
        name: 'Automated Reporting Pipeline',
        description: 'Create scheduled compliance reports for regulatory submission',
        status: 'not-started',
        assignee: 'Tom Bradley',
        assigneeDept: 'Data',
        startDate: '01 Mar 2026',
        endDate: '15 Mar 2026',
        progress: 0,
        onTime: true,
      },
    ],
  },
  {
    id: 's3',
    name: 'Testing & Validation',
    milestones: [
      {
        id: 'm7',
        name: 'UAT Planning & Execution',
        description: 'Coordinate user acceptance testing with key stakeholders',
        status: 'not-started',
        assignee: 'Anna Kelly',
        assigneeDept: 'QA',
        startDate: '16 Mar 2026',
        endDate: '31 Mar 2026',
        progress: 0,
        onTime: true,
      },
      {
        id: 'm8',
        name: 'Penetration Testing',
        description: 'External security audit and vulnerability assessment',
        status: 'at-risk',
        assignee: 'External Vendor',
        assigneeDept: 'Security',
        startDate: '01 Apr 2026',
        endDate: '14 Apr 2026',
        progress: 0,
        onTime: false,
      },
    ],
  },
]

function statusLabel(status: MilestoneStatus) {
  if (status === 'complete') return 'Complete'
  if (status === 'in-progress') return 'In Progress'
  if (status === 'at-risk') return 'At Risk'
  return 'Not Started'
}

function MilestoneStatusDot({ status }: { status: MilestoneStatus }) {
  return (
    <span
      className={[styles.statusDot, styles[`statusDot_${status.replace(/-/g, '_')}`]].join(' ')}
      title={statusLabel(status)}
    />
  )
}

function AssigneeAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return <span className={styles.assigneeAvatar}>{initials}</span>
}

// ---- Milestone Row ----

function MilestoneRow({ milestone }: { milestone: MilestoneItem }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={styles.milestoneRowWrap}>
      <div className={styles.milestoneRow}>
        {/* Status */}
        <div className={styles.colStatus}>
          <MilestoneStatusDot status={milestone.status} />
          <span className={styles.milestoneStatusLabel}>{statusLabel(milestone.status)}</span>
        </div>

        {/* Name + details toggle */}
        <div className={styles.colName}>
          <div className={styles.milestoneNameRow}>
            <span className={styles.milestoneName}>{milestone.name}</span>
            <button
              type="button"
              className={styles.showDetailsBtn}
              onClick={() => setShowDetails((v) => !v)}
            >
              Show Details
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none"
                className={showDetails ? styles.chevronUp : ''}
                style={{ transition: 'transform 0.2s' }}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {showDetails && (
            <p className={styles.milestoneDesc}>{milestone.description}</p>
          )}
        </div>

        {/* Assignee */}
        <div className={styles.colAssignee}>
          <div className={styles.assignee}>
            <AssigneeAvatar name={milestone.assignee} />
            <div className={styles.assigneeInfo}>
              <span className={styles.assigneeName}>{milestone.assignee}</span>
              <span className={styles.assigneeDept}>{milestone.assigneeDept}</span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className={styles.colDates}>
          <span className={styles.dateText}>{milestone.startDate}</span>
          <span className={styles.dateSep}>–</span>
          <span className={styles.dateText}>{milestone.endDate}</span>
        </div>

        {/* Progress */}
        <div className={styles.colProgress}>
          <div className={styles.progressBarWrap}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${milestone.progress}%` }}
              data-status={milestone.status}
            />
          </div>
          <span className={styles.progressPct}>{milestone.progress}%</span>
          {milestone.onTime
            ? <span className={styles.onTimeBadge}>On Time</span>
            : <span className={styles.atRiskBadge}>At Risk</span>
          }
        </div>

        {/* Actions */}
        <div className={styles.colActions}>
          <button type="button" className={styles.milestoneActionBtn} aria-label="Add task">
            <Icon name="checklist" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneActionBtn} aria-label="Comment">
            <Icon name="chat-bubble-outline" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneActionBtn} aria-label="Link">
            <Icon name="link" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneActionBtn} aria-label="Notifications off">
            <Icon name="notifications-off" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneActionBtn} aria-label="Mark complete">
            <Icon name="check-circle-outline" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneActionBtn} aria-label="More options">
            <Icon name="more-horiz" size={14} color="currentColor" />
          </button>
          <button type="button" className={styles.milestoneExpandBtn} aria-label="Expand">
            Expand
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Main component ----

interface MilestonesPageProps {
  event: EventRow
  onBack: () => void
}

export function MilestonesPage({ event, onBack }: MilestonesPageProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(MILESTONE_SECTIONS.map((s) => s.id))
  )
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allMilestones = MILESTONE_SECTIONS.flatMap((s) => s.milestones)
  const completedCount = allMilestones.filter((m) => m.status === 'complete').length
  const overallProgress = Math.round((completedCount / allMilestones.length) * 100)

  return (
    <div>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbRow}>
        <Breadcrumbs
          items={[
            { label: 'Apps', href: '#' },
            { label: 'AchieveA', href: '#' },
            { label: 'Company Home — Events', href: '#', onClick: onBack },
            { label: event.name },
          ]}
        />
      </div>

      {/* Compact project toolbar */}
      <div className={styles.projectToolbar}>
        <div className={styles.projectToolbarLeft}>
          <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Back to events">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.projectSelector}
            onClick={() => setShowProjectDropdown((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.projectSelectorIcon}>
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className={styles.projectSelectorLabel}>Project:</span>
            <span className={styles.projectSelectorName}>{event.name}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={styles.toolbarStatusPill} data-status={event.status.toLowerCase().replace(/\s+/g, '-').replace('---', '-')}>
            {event.status}
          </span>
          <span className={styles.toolbarProgress}>{overallProgress}% Complete</span>
        </div>
        <div className={styles.projectToolbarRight}>
          <button type="button" className={styles.toolbarBtn}>
            <Icon name="smart-toy" size={16} color="currentColor" />
          </button>
          <button type="button" className={styles.toolbarBtn}>
            <Icon name="help-outline" size={16} color="currentColor" />
            Help
          </button>
          <button type="button" className={styles.toolbarBtnPrimary}>
            <Icon name="notifications" size={16} color="currentColor" />
            Subscribe to this Project
          </button>
          <button type="button" className={styles.toolbarBtn} aria-label="More options">
            <Icon name="more-horiz" size={16} color="currentColor" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Team Size</span>
          <div className={styles.statValueRow}>
            <Icon name="group" size={14} color="var(--color-neutral-500)" />
            <span className={styles.statValue}>4 Members</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Milestones</span>
          <span className={styles.statValue}>{allMilestones.length} Total</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Timeline</span>
          <span className={styles.statValue}>{event.startDate} – {event.endDate}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Business Function</span>
          <span className={styles.statValue}>Real Estate</span>
        </div>
      </div>

      {/* Action bar */}
      <div className={styles.actionBar}>
        <div className={styles.actionBarLeft}>
          <button type="button" className={styles.actionBarBtn}>
            <Icon name="bar-chart" size={16} color="currentColor" />
            Show Graph
          </button>
          <button type="button" className={styles.actionBarBtn}>
            <Icon name="compare-arrows" size={16} color="currentColor" />
            View All I/O
          </button>
          <button type="button" className={styles.actionBarBtn}>
            <Icon name="download" size={16} color="currentColor" />
            Export Data
          </button>
        </div>
        <button type="button" className={styles.addMilestoneBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Milestone
        </button>
      </div>

      {/* Milestone sections */}
      <div className={styles.sections}>
        {MILESTONE_SECTIONS.map((section) => {
          const isExpanded = expandedSections.has(section.id)
          const sectionComplete = section.milestones.filter((m) => m.status === 'complete').length
          return (
            <div key={section.id} className={styles.section}>
              {/* Section header */}
              <div className={styles.sectionHeader}>
                <button
                  type="button"
                  className={styles.sectionToggle}
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isExpanded}
                >
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={isExpanded ? styles.chevronDown : styles.chevronRight}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className={styles.sectionName}>{section.name}</span>
                <span className={styles.sectionCount}>{sectionComplete}/{section.milestones.length} milestones</span>
                <div className={styles.sectionActions}>
                  <button type="button" className={styles.sectionActionBtn}>
                    <Icon name="notifications-none" size={14} color="currentColor" />
                    Subscribe to Section
                  </button>
                  <button type="button" className={styles.sectionIconBtn} aria-label="Edit section">
                    <Icon name="edit" size={14} color="currentColor" />
                  </button>
                  <button type="button" className={styles.sectionIconBtn} aria-label="More options">
                    <Icon name="more-horiz" size={14} color="currentColor" />
                  </button>
                </div>
                <button type="button" className={styles.sectionNavBtn} aria-label="Navigate to section">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Column headers + rows */}
              {isExpanded && (
                <>
                  <div className={styles.milestoneColumnHeaders}>
                    <span>Status</span>
                    <span>Milestone</span>
                    <span>Assignee</span>
                    <span>Start / End</span>
                    <span>Progress</span>
                    <span></span>
                  </div>

                  {section.milestones.map((milestone) => (
                    <MilestoneRow key={milestone.id} milestone={milestone} />
                  ))}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
