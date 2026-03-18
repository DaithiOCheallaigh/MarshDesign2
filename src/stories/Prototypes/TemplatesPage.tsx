import { useState, useEffect } from 'react'
import styles from './TemplatesPage.module.css'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MilestoneItem {
  id: string
  name: string
  days: number
}

export interface MilestoneGroup {
  id: string
  name: string
  milestones: MilestoneItem[]
}

export interface TemplateCardData {
  id: string
  name: string
  business: string
  businessFunction: string
  description: string
  updatedDate: string   // YYYY-MM-DD
  milestoneGroups: MilestoneGroup[]
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const TEMPLATES: TemplateCardData[] = [
  {
    id: '1',
    name: 'Babcock International Group PLC',
    business: 'Marsh Risk',
    businessFunction: 'Risk Management',
    description: 'End-to-end risk management framework for Babcock International covering all business units.',
    updatedDate: '2025-11-01',
    milestoneGroups: [
      { id: 'g1', name: 'Service Delivery', milestones: [
        { id: 'm1', name: 'Policy Documentation Issued', days: 30 },
        { id: 'm2', name: 'Global Register of Insurance', days: 60 },
        { id: 'm3', name: 'Statutory Certificates - TWMIC Letters', days: 5 },
        { id: 'm4', name: 'Invoice Issuance', days: 30 },
        { id: 'm5', name: 'Acknowledgement of Correspondence/Phone Calls', days: 1 },
        { id: 'm6', name: 'Meeting Minutes', days: 5 },
        { id: 'm7', name: 'WIP Calls', days: 5 },
      ]},
      { id: 'g2', name: 'Renewal', milestones: [] },
      { id: 'g3', name: 'Risk Management - Tech Solutions', milestones: [] },
      { id: 'g4', name: 'Claims Management', milestones: [] },
      { id: 'g5', name: 'Governance & Control / Strategy', milestones: [] },
      { id: 'g6', name: 'Transition', milestones: [] },
    ],
  },
  {
    id: '2',
    name: 'Imperial Brands PLC',
    business: 'Marsh Risk',
    businessFunction: 'Risk Management',
    description: 'Risk management process for Imperial Brands covering key milestones.',
    updatedDate: '2025-10-15',
    milestoneGroups: [
      { id: 'g7', name: 'Risk Assessment', milestones: [
        { id: 'm8', name: 'Initial Risk Review', days: 2 },
        { id: 'm9', name: 'Final Risk Report', days: 2 },
      ]},
    ],
  },
  {
    id: '3',
    name: 'Template test new',
    business: 'Marsh',
    businessFunction: 'Risk Management',
    description: 'Test template for new workflow configuration.',
    updatedDate: '2025-09-20',
    milestoneGroups: [
      { id: 'g8', name: 'Group A', milestones: [
        { id: 'm10', name: 'Milestone One', days: 4 },
      ]},
      { id: 'g9', name: 'Group B', milestones: [
        { id: 'm11', name: 'Milestone Two', days: 3 },
      ]},
    ],
  },
  {
    id: '4',
    name: 'ABC L3',
    business: '',
    businessFunction: '',
    description: 'This project manages the end-to-end insurance brokerage process, starting with client onboarding and Broker on Record processes through to policy placement.',
    updatedDate: '2025-08-10',
    milestoneGroups: [
      { id: 'g10', name: 'Group 1', milestones: Array.from({length: 12}, (_, i) => ({ id: `m${20+i}`, name: `Milestone ${i+1}`, days: 3 })) },
      { id: 'g11', name: 'Group 2', milestones: Array.from({length: 12}, (_, i) => ({ id: `m${32+i}`, name: `Milestone ${i+13}`, days: 3 })) },
      { id: 'g12', name: 'Group 3', milestones: Array.from({length: 12}, (_, i) => ({ id: `m${44+i}`, name: `Milestone ${i+25}`, days: 3 })) },
      { id: 'g13', name: 'Group 4', milestones: Array.from({length: 10}, (_, i) => ({ id: `m${56+i}`, name: `Milestone ${i+37}`, days: 3 })) },
    ],
  },
  {
    id: '5',
    name: "Tannavi's template",
    business: '',
    businessFunction: '',
    description: 'Custom template for Tannavi workflows.',
    updatedDate: '2025-07-01',
    milestoneGroups: Array.from({length: 9}, (_, i) => ({
      id: `g${14+i}`,
      name: `Group ${i+1}`,
      milestones: Array.from({length: Math.floor(19/9)+1}, (_, j) => ({ id: `mt${i*3+j}`, name: `Milestone ${i*3+j+1}`, days: 5 })),
    })),
  },
]

// ─── Icon SVGs ────────────────────────────────────────────────────────────────

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTotalGroups(template: TemplateCardData): number {
  return template.milestoneGroups.length
}

function getTotalMilestones(template: TemplateCardData): number {
  return template.milestoneGroups.reduce((acc, g) => acc + g.milestones.length, 0)
}

function getTotalDays(template: TemplateCardData): number {
  return template.milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.reduce((a, m) => a + m.days, 0),
    0,
  )
}

// ─── Template Card ────────────────────────────────────────────────────────────

interface TemplateCardProps {
  template: TemplateCardData
  onView?: (template: TemplateCardData) => void
  onCopy?: (template: TemplateCardData) => void
  onDelete?: (id: string) => void
}

function TemplateCard({ template, onView, onCopy, onDelete }: TemplateCardProps) {
  const totalGroups = getTotalGroups(template)
  const totalMilestones = getTotalMilestones(template)
  const totalDays = getTotalDays(template)
  const hasMeta = template.business || template.businessFunction

  return (
    <div className={styles.card}>
      <div className={styles.cardName}>{template.name}</div>

      {hasMeta && (
        <div className={styles.cardMeta}>
          Business: {template.business || '—'} | Function: {template.businessFunction || '—'}
        </div>
      )}

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalGroups}</span>
          <span className={styles.statLabel}>Groups</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalMilestones}</span>
          <span className={styles.statLabel}>Milestones</span>
        </div>
        {totalDays > 0 && (
          <>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>~{totalDays}d</span>
              <span className={styles.statLabel}>Est. Duration</span>
            </div>
          </>
        )}
      </div>

      <p className={styles.cardDesc}>{template.description}</p>

      <div className={styles.cardFooter}>
        <span className={styles.cardUpdated}>Updated: {template.updatedDate}</span>
        <div className={styles.cardActions}>
          <button className={styles.cardIconBtn} title="Copy template" aria-label="Copy template" onClick={() => onCopy?.(template)}>
            <CopyIcon />
          </button>
          <button className={styles.cardIconBtn} title="Delete template" aria-label="Delete template" style={{ color: '#9ca3af' }} onClick={() => onDelete?.(template.id)}>
            <DeleteIcon />
          </button>
          <button
            className={styles.openBtn}
            onClick={() => onView?.(template)}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface TemplatesPageProps {
  onViewTemplate?: (template: TemplateCardData) => void
  onCreateTemplate?: () => void
}

export function TemplatesPage({ onViewTemplate, onCreateTemplate }: TemplatesPageProps = {}) {
  const [templates, setTemplates] = useState<TemplateCardData[]>(TEMPLATES)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  function handleCopy(t: TemplateCardData) {
    const copy: TemplateCardData = {
      ...t,
      id: `copy-${Date.now()}`,
      name: `${t.name} (Copy)`,
      updatedDate: new Date().toISOString().slice(0, 10),
      milestoneGroups: t.milestoneGroups.map(g => ({
        ...g,
        id: `${g.id}-c`,
        milestones: g.milestones.map(m => ({ ...m, id: `${m.id}-c` })),
      })),
    }
    setTemplates(prev => {
      const idx = prev.findIndex(x => x.id === t.id)
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
    setToast(`"${t.name}" duplicated`)
  }

  function handleDelete(id: string) {
    const t = templates.find(x => x.id === id)
    setTemplates(prev => prev.filter(x => x.id !== id))
    setToast(t ? `"${t.name}" deleted` : 'Template deleted')
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <h1 className={styles.pageTitle}>Business Process Templates</h1>
          <p className={styles.pageSubtitle}>
            Define reusable milestone-driven workflows. Closed templates can be instantiated as lived projects.
          </p>
        </div>
        <button className={styles.newTemplateBtn} onClick={onCreateTemplate}>
          + New Template
        </button>
      </div>

      <div className={styles.grid}>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onView={onViewTemplate}
            onCopy={handleCopy}
            onDelete={handleDelete}
          />
        ))}
      </div>

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

export default TemplatesPage
