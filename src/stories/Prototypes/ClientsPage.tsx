import { useState, useEffect } from 'react'
import { ActionButton } from '../../components/ActionButton'
import { TabNav } from '../../components/TabNav'
import { Icon } from '../../components/Icon'
import styles from './ClientsPage.module.css'

// =============================================================================
// Types
// =============================================================================

interface ClientRow {
  id: string
  name: string
  country: string
  teamSize: number
  projects: number
  activeProjects: number
  lastUpdated: string
}

interface MilestoneItem {
  id: string
  name: string
  complexity: 'Low' | 'Medium' | 'High'
  days: number
}

interface MilestoneGroup {
  id: string
  name: string
  milestones: MilestoneItem[]
}

interface TemplateCardData {
  id: string
  name: string
  industry: string
  category: string
  description: string
  icon: string
  estimatedDuration: number
  accent: string
  milestoneGroups: MilestoneGroup[]
}

// =============================================================================
// Data
// =============================================================================

const CLIENTS: ClientRow[] = [
  { id: '1', name: 'The Palms South Properties', country: 'Miami, FL', teamSize: 25, projects: 3, activeProjects: 2, lastUpdated: '2025-01-14' },
  { id: '2', name: 'Sunrise Healthcare Group', country: 'Boston, MA', teamSize: 18, projects: 5, activeProjects: 3, lastUpdated: '2025-01-12' },
  { id: '3', name: 'TechVision Solutions', country: 'San Francisco, CA', teamSize: 42, projects: 8, activeProjects: 5, lastUpdated: '2025-01-10' },
  { id: '4', name: 'GlobalFinance Partners', country: 'New York, NY', teamSize: 35, projects: 6, activeProjects: 4, lastUpdated: '2025-01-08' },
  { id: '5', name: 'RetailMax Corporation', country: 'Chicago, IL', teamSize: 28, projects: 4, activeProjects: 2, lastUpdated: '2025-01-05' },
]

const INITIAL_TEMPLATES: TemplateCardData[] = [
  {
    id: '1',
    name: 'Banking Compliance Framework',
    industry: 'Banking',
    category: 'Banking',
    description: 'A comprehensive framework for banking compliance covering regulatory requirements, risk assessment, and audit processes.',
    icon: 'account-balance',
    estimatedDuration: 6,
    accent: '#000f47',
    milestoneGroups: [
      {
        id: 'g1',
        name: 'Phase 1: Assessment',
        milestones: [
          { id: 'm1', name: 'Regulatory Gap Analysis', complexity: 'Medium', days: 14 },
          { id: 'm2', name: 'Risk Assessment Report', complexity: 'High', days: 21 },
        ],
      },
      {
        id: 'g2',
        name: 'Phase 2: Implementation',
        milestones: [
          { id: 'm3', name: 'Policy Documentation', complexity: 'Medium', days: 10 },
          { id: 'm4', name: 'Staff Training & Certification', complexity: 'Low', days: 7 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Business Intelligence Platform',
    industry: 'Enterprise',
    category: 'Enterprise',
    description: 'End-to-end BI platform deployment covering data architecture, reporting, and analytics infrastructure.',
    icon: 'addchart',
    estimatedDuration: 8,
    accent: '#0b4bff',
    milestoneGroups: [
      {
        id: 'g3',
        name: 'Data Foundation',
        milestones: [
          { id: 'm5', name: 'Data Warehouse Setup', complexity: 'High', days: 21 },
          { id: 'm6', name: 'ETL Pipeline Development', complexity: 'High', days: 28 },
        ],
      },
      {
        id: 'g4',
        name: 'Analytics Layer',
        milestones: [
          { id: 'm7', name: 'Dashboard Design', complexity: 'Medium', days: 14 },
          { id: 'm8', name: 'User Acceptance Testing', complexity: 'Low', days: 7 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Document Processing Pipeline',
    industry: 'Enterprise',
    category: 'Enterprise',
    description: 'Automated document processing and management pipeline for enterprise-scale operations.',
    icon: 'description',
    estimatedDuration: 4,
    accent: '#14853d',
    milestoneGroups: [
      {
        id: 'g5',
        name: 'Pipeline Setup',
        milestones: [
          { id: 'm9', name: 'Document Classification Model', complexity: 'Medium', days: 10 },
          { id: 'm10', name: 'Workflow Automation', complexity: 'High', days: 21 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Healthcare Data Analytics',
    industry: 'Healthcare',
    category: 'Healthcare',
    description: 'Patient data analytics platform ensuring HIPAA compliance and clinical decision support.',
    icon: 'hospital',
    estimatedDuration: 9,
    accent: '#14853d',
    milestoneGroups: [
      {
        id: 'g6',
        name: 'Infrastructure',
        milestones: [
          { id: 'm11', name: 'HIPAA Compliance Setup', complexity: 'High', days: 14 },
          { id: 'm12', name: 'Data Lake Architecture', complexity: 'High', days: 21 },
        ],
      },
      {
        id: 'g7',
        name: 'Analytics Development',
        milestones: [
          { id: 'm13', name: 'Clinical Reporting Suite', complexity: 'Medium', days: 14 },
          { id: 'm14', name: 'Predictive Models', complexity: 'High', days: 28 },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Retail Inventory Automation',
    industry: 'Retail',
    category: 'Retail',
    description: 'Smart inventory management with real-time tracking, demand forecasting, and auto-reorder.',
    icon: 'shopping-cart',
    estimatedDuration: 5,
    accent: '#c53532',
    milestoneGroups: [
      {
        id: 'g8',
        name: 'System Integration',
        milestones: [
          { id: 'm15', name: 'POS System Integration', complexity: 'Medium', days: 14 },
          { id: 'm16', name: 'Inventory API Setup', complexity: 'High', days: 21 },
        ],
      },
      {
        id: 'g9',
        name: 'Automation Features',
        milestones: [
          { id: 'm17', name: 'Demand Forecasting Engine', complexity: 'High', days: 28 },
          { id: 'm18', name: 'Auto-Reorder System', complexity: 'Medium', days: 14 },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Risk Management & Trading',
    industry: 'Finance',
    category: 'Finance',
    description: 'Comprehensive risk management framework for trading operations with real-time monitoring.',
    icon: 'trending-up',
    estimatedDuration: 7,
    accent: '#cb7e03',
    milestoneGroups: [
      {
        id: 'g10',
        name: 'Risk Assessment',
        milestones: [
          { id: 'm19', name: 'Portfolio Risk Analysis', complexity: 'High', days: 21 },
          { id: 'm20', name: 'Stress Testing Framework', complexity: 'High', days: 28 },
        ],
      },
      {
        id: 'g11',
        name: 'Trading Systems',
        milestones: [
          { id: 'm21', name: 'Algorithm Audit', complexity: 'High', days: 14 },
          { id: 'm22', name: 'Regulatory Reporting', complexity: 'Medium', days: 10 },
          { id: 'm23', name: 'Risk Dashboard', complexity: 'Medium', days: 14 },
        ],
      },
    ],
  },
]

// =============================================================================
// Utility sub-components
// =============================================================================

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

// ---- Toast ----

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={styles.toast}>
      <Icon name="check-circle-outline" size={16} color="currentColor" />
      {message}
    </div>
  )
}

// ---- More Menu ----

function MoreMenu({
  onPreview,
  onAuditLog,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: {
  onPreview: () => void
  onAuditLog: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onClose: () => void
}) {
  return (
    <>
      <div className={styles.moreMenuBackdrop} onClick={onClose} />
      <div className={styles.moreMenu}>
        <button type="button" className={styles.moreMenuItem} onClick={onPreview}>
          <Icon name="visibility" size={14} color="currentColor" />
          Preview
        </button>
        <button type="button" className={styles.moreMenuItem} onClick={onAuditLog}>
          <Icon name="history" size={14} color="currentColor" />
          Audit Log
        </button>
        <button type="button" className={styles.moreMenuItem} onClick={onEdit}>
          <Icon name="edit" size={14} color="currentColor" />
          Edit
        </button>
        <button type="button" className={styles.moreMenuItem} onClick={onDuplicate}>
          <Icon name="content-copy" size={14} color="currentColor" />
          Duplicate
        </button>
        <div className={styles.moreMenuDivider} />
        <button
          type="button"
          className={[styles.moreMenuItem, styles.moreMenuItemDanger].join(' ')}
          onClick={onDelete}
        >
          <Icon name="delete" size={14} color="currentColor" />
          Delete
        </button>
      </div>
    </>
  )
}

// ---- Edit Template Dialog ----

function EditTemplateDialog({
  template,
  onClose,
  onSave,
}: {
  template: TemplateCardData
  onClose: () => void
  onSave: (updated: TemplateCardData) => void
}) {
  const [form, setForm] = useState<TemplateCardData>({
    ...template,
    milestoneGroups: template.milestoneGroups.map((g) => ({
      ...g,
      milestones: g.milestones.map((m) => ({ ...m })),
    })),
  })

  function field(key: keyof TemplateCardData, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addGroup() {
    setForm((f) => ({
      ...f,
      milestoneGroups: [
        ...f.milestoneGroups,
        { id: `g-${Date.now()}`, name: 'New Group', milestones: [] },
      ],
    }))
  }

  function deleteGroup(gid: string) {
    setForm((f) => ({ ...f, milestoneGroups: f.milestoneGroups.filter((g) => g.id !== gid) }))
  }

  function groupName(gid: string, name: string) {
    setForm((f) => ({
      ...f,
      milestoneGroups: f.milestoneGroups.map((g) => (g.id === gid ? { ...g, name } : g)),
    }))
  }

  function addMilestone(gid: string) {
    setForm((f) => ({
      ...f,
      milestoneGroups: f.milestoneGroups.map((g) =>
        g.id === gid
          ? {
              ...g,
              milestones: [
                ...g.milestones,
                { id: `m-${Date.now()}`, name: 'New Milestone', complexity: 'Medium' as const, days: 7 },
              ],
            }
          : g
      ),
    }))
  }

  function deleteMilestone(gid: string, mid: string) {
    setForm((f) => ({
      ...f,
      milestoneGroups: f.milestoneGroups.map((g) =>
        g.id === gid ? { ...g, milestones: g.milestones.filter((m) => m.id !== mid) } : g
      ),
    }))
  }

  function milestoneName(gid: string, mid: string, name: string) {
    setForm((f) => ({
      ...f,
      milestoneGroups: f.milestoneGroups.map((g) =>
        g.id === gid
          ? { ...g, milestones: g.milestones.map((m) => (m.id === mid ? { ...m, name } : m)) }
          : g
      ),
    }))
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Template</h2>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            <Icon name="close" size={18} color="currentColor" />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>
              Template Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.formInput}
              value={form.name}
              onChange={(e) => field('name', e.target.value)}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={styles.formTextarea}
              value={form.description}
              onChange={(e) => field('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Industry</label>
              <select
                className={styles.formSelect}
                value={form.industry}
                onChange={(e) => field('industry', e.target.value)}
              >
                {['Banking', 'Healthcare', 'Finance', 'Retail', 'Enterprise', 'Real Estate'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={form.category}
                onChange={(e) => field('category', e.target.value)}
              >
                {['Banking', 'Healthcare', 'Finance', 'Retail', 'Enterprise', 'Real Estate'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Icon</label>
              <select
                className={styles.formSelect}
                value={form.icon}
                onChange={(e) => field('icon', e.target.value)}
              >
                <option value="account-balance">Banking</option>
                <option value="hospital">Healthcare</option>
                <option value="trending-up">Finance</option>
                <option value="shopping-cart">Retail</option>
                <option value="corporate-fare">Enterprise</option>
                <option value="home">Real Estate</option>
                <option value="description">Document</option>
                <option value="addchart">Trading</option>
                <option value="article">General</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Estimated Duration (months)</label>
              <input
                type="number"
                className={styles.formInput}
                value={form.estimatedDuration}
                min={1}
                max={36}
                onChange={(e) => field('estimatedDuration', parseInt(e.target.value, 10) || 1)}
              />
            </div>
          </div>

          {/* Milestone Groups */}
          <div className={styles.formSection}>
            <div className={styles.formSectionHeader}>
              <span className={styles.formSectionTitle}>Milestone Groups</span>
              <button type="button" className={styles.formAddBtn} onClick={addGroup}>
                + Add Group
              </button>
            </div>

            {form.milestoneGroups.map((group) => (
              <div key={group.id} className={styles.editGroup}>
                <div className={styles.editGroupHeader}>
                  <span className={styles.dragHandle}>⠿</span>
                  <input
                    type="text"
                    className={styles.editGroupName}
                    value={group.name}
                    onChange={(e) => groupName(group.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.editDeleteBtn}
                    onClick={() => deleteGroup(group.id)}
                    aria-label="Delete group"
                  >
                    <Icon name="delete" size={14} color="currentColor" />
                  </button>
                </div>

                {group.milestones.map((m) => (
                  <div key={m.id} className={styles.editMilestone}>
                    <span className={styles.dragHandle}>⠿</span>
                    <input
                      type="text"
                      className={styles.editMilestoneName}
                      value={m.name}
                      onChange={(e) => milestoneName(group.id, m.id, e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.editDeleteBtn}
                      onClick={() => deleteMilestone(group.id, m.id)}
                      aria-label="Delete milestone"
                    >
                      <Icon name="delete" size={14} color="currentColor" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className={styles.editAddMilestoneBtn}
                  onClick={() => addMilestone(group.id)}
                >
                  + Add Milestone
                </button>
              </div>
            ))}

            {form.milestoneGroups.length === 0 && (
              <div className={styles.editGroupsEmpty}>
                No groups yet. Click "+ Add Group" to create one.
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(form)}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Preview Dialog ----

function PreviewTemplateDialog({
  template,
  onClose,
  onUse,
}: {
  template: TemplateCardData
  onClose: () => void
  onUse: () => void
}) {
  const totalMilestones = template.milestoneGroups.reduce((s, g) => s + g.milestones.length, 0)

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.previewDialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.previewTop}>
          <div className={styles.previewIconEmoji}><Icon name={template.icon} size={40} color={template.accent} /></div>
          <h2 className={styles.previewName}>{template.name}</h2>
          <p className={styles.previewDesc}>{template.description}</p>
          <div className={styles.previewMeta}>
            <span className={styles.previewMetaItem}>
              <Icon name="checklist" size={14} color="currentColor" />
              {totalMilestones} milestones
            </span>
            <span className={styles.previewMetaDot}>•</span>
            <span className={styles.previewMetaItem}>
              <Icon name="access-time" size={14} color="currentColor" />
              {template.estimatedDuration} months estimated
            </span>
          </div>
          <div className={styles.previewTags}>
            <span className={styles.previewTag}>{template.industry}</span>
            <span className={styles.previewTag}>{template.category}</span>
          </div>
        </div>

        <div className={styles.previewBreakdown}>
          <div className={styles.previewBreakdownTitle}>Milestone Breakdown</div>
          {template.milestoneGroups.map((group, gi) => (
            <div key={group.id} className={styles.previewGroup}>
              <div className={styles.previewGroupName}>
                <span className={styles.previewGroupNum}>{gi + 1}</span>
                {group.name}
              </div>
              {group.milestones.map((m) => (
                <div key={m.id} className={styles.previewMilestoneRow}>
                  <span className={styles.previewMilestoneName}>{m.name}</span>
                  <div className={styles.previewBadges}>
                    <span
                      className={styles.previewBadge}
                      data-complexity={m.complexity.toLowerCase()}
                    >
                      {m.complexity}
                    </span>
                    <span className={styles.previewBadgeDays}>{m.days}d</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.previewBreakdownFooter}>
            {template.milestoneGroups.length} groups &bull; {totalMilestones} total milestones
          </div>
        </div>

        <div className={styles.previewFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Back
          </button>
          <button type="button" className={styles.btnPrimary} onClick={onUse}>
            Use This Template
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Delete Confirm Dialog ----

function DeleteConfirmDialog({
  template,
  onClose,
  onConfirm,
}: {
  template: TemplateCardData
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.confirmDialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.confirmIconWrap}>
          <Icon name="warning-amber" size={32} color="#f59e0b" />
        </div>
        <h3 className={styles.confirmTitle}>Delete Template</h3>
        <p className={styles.confirmText}>
          Are you sure you want to delete <strong>'{template.name}'</strong>?<br />
          This action cannot be undone.
        </p>
        <div className={styles.confirmFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            No
          </button>
          <button type="button" className={styles.btnDanger} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Audit Log Page ----

interface AuditEntry {
  id: string
  type: 'created' | 'updated'
  title: string
  description: string
  user: string
  time: string
}

function AuditLogPage({
  template,
  onBack,
}: {
  template: TemplateCardData
  onBack: () => void
}) {
  const entries: AuditEntry[] = [
    {
      id: '1',
      type: 'created',
      title: 'Template Created',
      description: `New template '${template.name}' created`,
      user: 'Dave Smith',
      time: '2 days ago',
    },
    {
      id: '2',
      type: 'updated',
      title: 'Template Updated',
      description: 'Template name and description were updated',
      user: 'Dave Smith',
      time: '1 day ago',
    },
    {
      id: '3',
      type: 'updated',
      title: 'Milestone Group Added',
      description: 'A new milestone group was added to the template',
      user: 'Sarah Johnson',
      time: '18 hours ago',
    },
  ]

  return (
    <div className={styles.auditPage}>
      <div className={styles.auditBreadcrumb}>
        <button type="button" className={styles.breadcrumbLink} onClick={onBack}>
          Templates
        </button>
        <Icon name="keyboard-arrow-right" size={16} color="currentColor" />
        <span className={styles.breadcrumbText}>{template.name}</span>
        <Icon name="keyboard-arrow-right" size={16} color="currentColor" />
        <span className={styles.breadcrumbText}>Audit Log</span>
      </div>

      <div className={styles.auditHeader}>
        <h1 className={styles.auditTitle}>Audit Log</h1>
        <p className={styles.auditSubtitle}>
          Change history for <strong>{template.name}</strong>
        </p>
      </div>

      <div className={styles.auditTimeline}>
        {entries.map((entry, idx) => (
          <div key={entry.id} className={styles.auditEntry}>
            <div className={styles.auditEntryLeft}>
              <div
                className={styles.auditEntryIcon}
                data-type={entry.type}
              >
                {entry.type === 'created' ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10 2l2 2-7 7H3V9l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {idx < entries.length - 1 && <div className={styles.auditEntryLine} />}
            </div>
            <div className={styles.auditEntryContent}>
              <div className={styles.auditEntryTitle}>{entry.title}</div>
              <div className={styles.auditEntryDesc}>{entry.description}</div>
              <div className={styles.auditEntryMeta}>
                {entry.time} &middot; {entry.user}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Create Template Page ----

function CreateTemplatePage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'milestones'>('overview')
  const [groups, setGroups] = useState<MilestoneGroup[]>([])
  const [form, setForm] = useState({
    name: '',
    category: '',
    businessFunction: '',
    description: '',
    version: '',
    icon: 'article',
  })

  function addGroup() {
    const g: MilestoneGroup = {
      id: `g-${Date.now()}`,
      name: 'New Group',
      milestones: [],
    }
    setGroups((gs) => [...gs, g])
  }

  const totalMilestones = groups.reduce((s, g) => s + g.milestones.length, 0)

  const TABS: Array<{ id: 'overview' | 'groups' | 'milestones'; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'groups', label: 'Milestone Groups' },
    { id: 'milestones', label: 'Milestones' },
  ]

  return (
    <div className={styles.createPage}>
      {/* Breadcrumb */}
      <div className={styles.auditBreadcrumb}>
        <button type="button" className={styles.breadcrumbLink} onClick={onBack}>
          Templates
        </button>
        <Icon name="keyboard-arrow-right" size={16} color="currentColor" />
        <span className={styles.breadcrumbText}>Create Template</span>
      </div>

      {/* Header */}
      <div className={styles.createPageHeader}>
        <div className={styles.createPageHeaderLeft}>
          <button type="button" className={styles.createBackBtn} onClick={onBack}>
            <Icon name="keyboard-arrow-left" size={20} color="currentColor" />
          </button>
          <h1 className={styles.createPageTitle}>Create Template</h1>
        </div>
        <div className={styles.createPageHeaderRight}>
          <button type="button" className={styles.btnSecondary}>
            Show Graph
          </button>
          <button type="button" className={styles.btnPrimary}>
            Save Template
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.createTabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={[styles.createTab, activeTab === tab.id ? styles.createTabActive : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className={styles.createTabContent}>
          {/* Stats row */}
          <div className={styles.createStats}>
            <div className={styles.createStatTile}>
              <div className={styles.createStatValue}>{groups.length}</div>
              <div className={styles.createStatLabel}>Groups</div>
            </div>
            <div className={styles.createStatTile}>
              <div className={styles.createStatValue}>{totalMilestones}</div>
              <div className={styles.createStatLabel}>Milestones</div>
            </div>
            <div className={styles.createStatTile}>
              <div className={styles.createStatValue}>0</div>
              <div className={styles.createStatLabel}>I/O Items</div>
            </div>
          </div>

          {/* Form card */}
          <div className={styles.createFormCard}>
            <h3 className={styles.createFormTitle}>Template Information</h3>

            <div className={styles.formField}>
              <label className={styles.formLabel}>
                Template Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={form.name}
                placeholder="Enter template name"
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Category <span className={styles.required}>*</span>
                </label>
                <select
                  className={styles.formSelect}
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  {['Banking', 'Healthcare', 'Finance', 'Retail', 'Enterprise'].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Business Function <span className={styles.required}>*</span>
                </label>
                <select
                  className={styles.formSelect}
                  value={form.businessFunction}
                  onChange={(e) => setForm((f) => ({ ...f, businessFunction: e.target.value }))}
                >
                  <option value="">Select function</option>
                  {['Real Estate', 'Risk Management', 'Compliance', 'Operations', 'Technology'].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                className={styles.formTextarea}
                value={form.description}
                rows={3}
                placeholder="Describe this template"
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Version</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={form.version}
                  placeholder="e.g. 1.0"
                  onChange={(e) => setForm((f) => ({ ...f, version: e.target.value }))}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Icon</label>
                <select
                  className={styles.formSelect}
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                >
                  <option value="article">General</option>
                  <option value="account-balance">Banking</option>
                  <option value="hospital">Healthcare</option>
                  <option value="trending-up">Finance</option>
                  <option value="shopping-cart">Retail</option>
                  <option value="corporate-fare">Enterprise</option>
                  <option value="home">Real Estate</option>
                  <option value="addchart">Trading</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className={styles.createTabContent}>
          <div className={styles.createTabToolbar}>
            <span />
            <button type="button" className={styles.btnPrimary} onClick={addGroup}>
              + Add Group
            </button>
          </div>
          {groups.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <Icon name="layers" size={36} color="var(--color-neutral-500)" />
              </div>
              <h3 className={styles.emptyStateTitle}>No Groups Yet</h3>
              <p className={styles.emptyStateDesc}>
                Milestone groups help you organize your template into logical phases or categories.
              </p>
              <button type="button" className={styles.btnPrimary} onClick={addGroup}>
                + Create Your First Group
              </button>
            </div>
          ) : (
            <div className={styles.groupList}>
              {groups.map((group) => (
                <div key={group.id} className={styles.createGroupCard}>
                  <div className={styles.createGroupCardHeader}>
                    <span className={styles.dragHandle}>⠿</span>
                    <span className={styles.createGroupCardName}>{group.name}</span>
                    <span className={styles.createGroupCardCount}>
                      {group.milestones.length} milestones
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className={styles.createTabContent}>
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <Icon name="checklist" size={36} color="var(--color-neutral-500)" />
            </div>
            <h3 className={styles.emptyStateTitle}>No Milestones Yet</h3>
            <p className={styles.emptyStateDesc}>
              Add milestone groups first, then add milestones to each group.
            </p>
            <button type="button" className={styles.btnPrimary} onClick={() => setActiveTab('groups')}>
              Go to Milestone Groups
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// Main component
// =============================================================================

export function ClientsPage({ defaultTab = 'my-clients' }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [searchValue, setSearchValue] = useState('')

  // Templates state
  const [templates, setTemplates] = useState<TemplateCardData[]>(INITIAL_TEMPLATES)
  const [editingTemplate, setEditingTemplate] = useState<TemplateCardData | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCardData | null>(null)
  const [auditLogTemplate, setAuditLogTemplate] = useState<TemplateCardData | null>(null)
  const [deleteTemplate, setDeleteTemplate] = useState<TemplateCardData | null>(null)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  function handleSaveTemplate(updated: TemplateCardData) {
    setTemplates((ts) => ts.map((t) => (t.id === updated.id ? updated : t)))
    setEditingTemplate(null)
    setToast('Template saved successfully')
  }

  function handleDuplicate(tpl: TemplateCardData) {
    const copy: TemplateCardData = {
      ...tpl,
      id: `copy-${Date.now()}`,
      name: `${tpl.name} (Copy)`,
      milestoneGroups: tpl.milestoneGroups.map((g) => ({
        ...g,
        id: `${g.id}-copy`,
        milestones: g.milestones.map((m) => ({ ...m, id: `${m.id}-copy` })),
      })),
    }
    setTemplates((ts) => [...ts, copy])
    setToast('Template duplicated successfully')
  }

  function handleDeleteConfirm() {
    if (!deleteTemplate) return
    setTemplates((ts) => ts.filter((t) => t.id !== deleteTemplate.id))
    setDeleteTemplate(null)
    setToast('Template deleted')
  }

  // Sub-page: Audit Log
  if (activeTab === 'templates' && auditLogTemplate) {
    return (
      <AuditLogPage
        template={auditLogTemplate}
        onBack={() => setAuditLogTemplate(null)}
      />
    )
  }

  // Sub-page: Create Template
  if (activeTab === 'templates' && showCreateTemplate) {
    return <CreateTemplatePage onBack={() => setShowCreateTemplate(false)} />
  }

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
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
            onClick={() => setShowCreateTemplate(true)}
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
        <div className={styles.searchWrap}>
          <Icon name="search" size={14} color="var(--color-neutral-750)" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder={activeTab === 'my-clients' ? 'Search Clients' : 'Search Templates'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 'my-clients' ? (
        <>
          <div className={styles.filterRow}>
            <FilterButton label="Industry" />
            <FilterButton label="Status" />
            <FilterButton label="Priority" />
          </div>

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
                      <td><a href="#" className={styles.clientName}>{row.name}</a></td>
                      <td className={styles.muted}>{row.country}</td>
                      <td>{row.teamSize}</td>
                      <td><a href="#" className={styles.numberLink}>{row.projects}</a></td>
                      <td><a href="#" className={styles.numberLink}>{row.activeProjects}</a></td>
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
          {filteredTemplates.map((tpl) => {
            const totalMs = tpl.milestoneGroups.reduce((s, g) => s + g.milestones.length, 0)
            return (
              <div
                key={tpl.id}
                className={styles.templateCard}
                style={{ '--accent': tpl.accent } as React.CSSProperties}
              >
                <div className={styles.templateCardHeader}>
                  <div className={styles.templateCardInfo}>
                    <span className={styles.templateCardIcon}><Icon name={tpl.icon} size={22} color={tpl.accent} /></span>
                    <div>
                      <span className={styles.templateName}>{tpl.name}</span>
                      <div className={styles.templateCategory}>{tpl.category}</div>
                    </div>
                  </div>
                  <div className={styles.templateActions}>
                    {/* Pencil / Edit */}
                    <button
                      type="button"
                      className={styles.templateIconBtn}
                      aria-label="Edit template"
                      onClick={() => setEditingTemplate(tpl)}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M10 2l2 2-7 7H3V9l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* More (···) */}
                    <div className={styles.moreMenuWrap}>
                      <button
                        type="button"
                        className={styles.templateIconBtn}
                        aria-label="More options"
                        onClick={() => setOpenMenuId(openMenuId === tpl.id ? null : tpl.id)}
                      >
                        <svg width="14" height="4" viewBox="0 0 14 4" fill="none">
                          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                          <circle cx="7" cy="2" r="1.5" fill="currentColor" />
                          <circle cx="12" cy="2" r="1.5" fill="currentColor" />
                        </svg>
                      </button>
                      {openMenuId === tpl.id && (
                        <MoreMenu
                          onPreview={() => { setPreviewTemplate(tpl); setOpenMenuId(null) }}
                          onAuditLog={() => { setAuditLogTemplate(tpl); setOpenMenuId(null) }}
                          onEdit={() => { setEditingTemplate(tpl); setOpenMenuId(null) }}
                          onDuplicate={() => { handleDuplicate(tpl); setOpenMenuId(null) }}
                          onDelete={() => { setDeleteTemplate(tpl); setOpenMenuId(null) }}
                          onClose={() => setOpenMenuId(null)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.templateStats}>
                  <span className={styles.templateStat}>
                    <Icon name="layers" size={14} color="var(--color-neutral-750)" />
                    {tpl.milestoneGroups.length} group{tpl.milestoneGroups.length !== 1 ? 's' : ''}
                  </span>
                  <span className={styles.templateStat}>
                    <Icon name="checklist" size={14} color="var(--color-neutral-750)" />
                    {totalMs} milestone{totalMs !== 1 ? 's' : ''}
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.useTemplateBtn}
                  onClick={() => setToast(`Using template: ${tpl.name}`)}
                >
                  Use Template
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Modals */}
      {editingTemplate && (
        <EditTemplateDialog
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSave={handleSaveTemplate}
        />
      )}
      {previewTemplate && (
        <PreviewTemplateDialog
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUse={() => { setToast(`Using template: ${previewTemplate.name}`); setPreviewTemplate(null) }}
        />
      )}
      {deleteTemplate && (
        <DeleteConfirmDialog
          template={deleteTemplate}
          onClose={() => setDeleteTemplate(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
