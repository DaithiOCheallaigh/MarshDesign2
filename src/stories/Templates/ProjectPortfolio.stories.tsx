import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchBar, Select, Icon, Badge, Avatar, Progress, IconButton } from '../../components'
import type { Column } from '../../components'
import { Table } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Project extends Record<string, unknown> {
  id: string
  status: 'Scheduled' | 'In Progress' | 'Complete' | 'On Hold'
  name: string
  description: string
  assignee: string
  priority: 'Low' | 'Medium' | 'High'
  timeline: string
  milestones: number
  progress: number
  budget: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const allProjects: Project[] = [
  { id: '1', status: 'In Progress', name: 'Marine Liability Renewal 2025',  description: 'Annual renewal for marine coverage',  assignee: 'JD', priority: 'High',   timeline: 'Mar–Jun 2025', milestones: 6,  progress: 42, budget: '$120,000' },
  { id: '2', status: 'Scheduled',   name: 'Property Risk Assessment',        description: 'Full property portfolio review',       assignee: 'SK', priority: 'Medium', timeline: 'Apr–Aug 2025', milestones: 4,  progress: 0,  budget: '$85,000'  },
  { id: '3', status: 'In Progress', name: 'D&O Policy Restructure',          description: 'Directors and officers liability',     assignee: 'MR', priority: 'High',   timeline: 'Feb–May 2025', milestones: 5,  progress: 68, budget: '$200,000' },
  { id: '4', status: 'Complete',    name: 'Cyber Security Assessment',       description: 'Annual cyber risk evaluation',         assignee: 'JD', priority: 'Low',    timeline: 'Jan–Mar 2025', milestones: 3,  progress: 100,'budget': '$60,000'  },
  { id: '5', status: 'On Hold',     name: 'Workers Comp Audit',              description: 'State compliance audit process',       assignee: 'SK', priority: 'Medium', timeline: 'TBD',          milestones: 2,  progress: 15, budget: '$40,000'  },
]

const statusOptions = [
  { label: 'All Status',  value: '' },
  { label: 'Scheduled',   value: 'Scheduled' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Complete',    value: 'Complete' },
  { label: 'On Hold',     value: 'On Hold' },
]

const sortOptions = [
  { label: 'Last Updated', value: 'updated' },
  { label: 'Name (A–Z)',   value: 'name' },
  { label: 'Progress',     value: 'progress' },
  { label: 'Priority',     value: 'priority' },
]

const statusVariantMap: Record<Project['status'], 'info' | 'warning' | 'success' | 'default'> = {
  Scheduled:   'info',
  'In Progress':'warning',
  Complete:    'success',
  'On Hold':   'default',
}

const priorityColorMap: Record<Project['priority'], string> = {
  High:   'var(--color-status-danger)',
  Medium: 'var(--color-status-warning-text)',
  Low:    'var(--color-neutral-500)',
}

// ── Column definitions ─────────────────────────────────────────────────────────

const columns: Column<Project>[] = [
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Badge label={row.status} variant={statusVariantMap[row.status] ?? 'default'} />,
  },
  {
    key: 'name',
    header: 'Project Name',
    render: (row) => (
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-blue-750)' }}>{row.name}</span>
    ),
  },
  {
    key: 'description',
    header: 'Description',
    render: (row) => (
      <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.description}</span>
    ),
  },
  {
    key: 'assignee',
    header: 'Assignee',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Avatar size="small" initials={row.assignee} />
        <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.assignee}</span>
      </div>
    ),
  },
  {
    key: 'priority',
    header: 'Priority',
    render: (row) => (
      <span style={{ fontSize: 13, fontWeight: 600, color: priorityColorMap[row.priority] }}>
        {row.priority}
      </span>
    ),
  },
  {
    key: 'timeline',
    header: 'Timeline',
    render: (row) => (
      <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.timeline}</span>
    ),
  },
  {
    key: 'milestones',
    header: 'Milestones',
    render: (row) => (
      <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.milestones}</span>
    ),
  },
  {
    key: 'progress',
    header: 'Progress',
    render: (row) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 80 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: Number(row.progress) === 100 ? 'var(--color-status-success)' : 'var(--color-neutral-750)' }}>
          {row.progress}%
        </span>
        <Progress value={Number(row.progress)} max={100} />
      </div>
    ),
  },
  {
    key: 'budget',
    header: 'Budget',
    render: (row) => (
      <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.budget}</span>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <IconButton
        icon={<Icon name="more-horiz" size="sm" />}
        label="More actions"
        variant="ghost"
        size="small"
      />
    ),
  },
]

// ── EmptyState ────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <Icon name="folder-open" size="lg" color="var(--color-neutral-500)" />
      <span style={{ fontSize: 14, color: 'var(--color-neutral-750)' }}>
        No projects found matching your criteria.
      </span>
    </div>
  )
}

// ── Template ──────────────────────────────────────────────────────────────────

function ProjectPortfolioTemplate() {
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('')
  const [sort, setSort]       = useState('updated')
  const [showEmpty, setShowEmpty] = useState(false)

  const filtered = showEmpty ? [] : allProjects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !status || p.status === status
    return matchSearch && matchStatus
  })

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-1000)', margin: 0 }}>
          Project Portfolio
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <SearchBar
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: 'var(--color-neutral-750)', textAlign: 'center' }}>Status</span>
            <div style={{ width: 130 }}>
              <Select options={statusOptions} value={status} onChange={setStatus} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: 'var(--color-neutral-750)', textAlign: 'center' }}>Sort By</span>
            <div style={{ width: 140 }}>
              <Select options={sortOptions} value={sort} onChange={setSort} />
            </div>
          </div>
          <button
            onClick={() => setShowEmpty(e => !e)}
            style={{ fontSize: 11, color: 'var(--color-blue-750)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', marginTop: 16 }}
          >
            {showEmpty ? 'Show data' : 'Show empty'}
          </button>
        </div>
      </div>

      {/* Table or empty state */}
      {filtered.length === 0 ? (
        <div style={{ border: '1px solid var(--color-neutral-250)', borderRadius: 'var(--radius-medium)', overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '110px 200px 1fr 80px 80px 120px 90px 100px 90px 60px',
            padding: '8px var(--spacing-md)',
            borderBottom: '1px solid var(--color-neutral-250)',
            gap: 'var(--spacing-sm)',
            background: 'var(--color-white)',
          }}>
            {['Status', 'Project Name', 'Description', 'Assignee', 'Priority', 'Timeline', 'Milestones', 'Progress', 'Budget', 'Actions'].map(col => (
              <span key={col} style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-blue-750)', letterSpacing: '0.02em' }}>
                {col}
              </span>
            ))}
          </div>
          <EmptyState />
        </div>
      ) : (
        <Table
          columns={columns as Column[]}
          rows={filtered as Record<string, unknown>[]}
          keyField="id"
        />
      )}
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Project Portfolio',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Project Portfolio** template for browsing all projects under a client. Supports live search, status filtering, and sort ordering. Displays a friendly empty state when no projects match the current criteria.

**Intended usage:** Render below the Client Header on the client detail page. Use the "Show empty / Show data" toggle in the story to preview both states. In production, wire the search and filter values to your data layer.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`SearchBar\` | Live text search filtering project name and description |
| \`Select\` | Status filter (All Status / Scheduled / In Progress / Complete / On Hold) |
| \`Select\` | Sort-by selector (Last Updated / Name / Progress / Priority) |
| \`Table\` | Primary data grid with rich cell renderers |
| \`Badge\` | Status indicator per row |
| \`Avatar\` | Assignee initials |
| \`Progress\` | Inline progress bar in progress column |
| \`IconButton\` | Row-level "more actions" trigger |
| \`Icon\` | folder-open empty-state illustration |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <ProjectPortfolioTemplate />,
  name: 'Project Portfolio',
}
