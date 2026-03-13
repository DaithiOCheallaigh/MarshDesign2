import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Badge,
  Button,
  ActionButton,
  IconButton,
  Progress,
  Avatar,
  Icon,
  Breadcrumbs,
  Separator,
} from '../../components'

// ── Types ────────────────────────────────────────────────────────────────────

interface Milestone {
  id: string
  name: string
  assignee: string | null
  startDate: string
  endDate: string
  progress: number
  status: 'Scheduled' | 'In Progress' | 'Complete'
}

interface MilestoneGroup {
  id: string
  name: string
  milestones: Milestone[]
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const groups: MilestoneGroup[] = [
  {
    id: 'test',
    name: 'Test',
    milestones: [
      { id: 'm1', name: 'Testing Milestone 1', assignee: null, startDate: 'Mar 17', endDate: 'Mar 23', progress: 0, status: 'Scheduled' },
      { id: 'm2', name: 'Test2',               assignee: null, startDate: 'Mar 17', endDate: 'Mar 19', progress: 0, status: 'Scheduled' },
      { id: 'm3', name: 'test3',               assignee: null, startDate: 'Mar 17', endDate: 'Mar 18', progress: 0, status: 'Scheduled' },
      { id: 'm4', name: 'Test 4',              assignee: null, startDate: 'Mar 24', endDate: 'Mar 25', progress: 0, status: 'Scheduled' },
    ],
  },
  {
    id: 'group2',
    name: 'Group2',
    milestones: [
      { id: 'm5', name: 'Group2 ms1', assignee: null, startDate: 'Mar 24', endDate: 'Mar 27', progress: 0, status: 'Scheduled' },
    ],
  },
]

// ── Column grid (shared between header and rows) ───────────────────────────────

const COLS = '100px 1fr 120px 160px 110px auto'

// ── Status badge variant map ──────────────────────────────────────────────────

const statusVariantMap: Record<Milestone['status'], 'info' | 'warning' | 'success' | 'default'> = {
  Scheduled:     'info',
  'In Progress': 'warning',
  Complete:      'success',
}

// ── MilestoneRow ──────────────────────────────────────────────────────────────

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: COLS,
      alignItems: 'center',
      padding: '10px var(--spacing-md)',
      borderBottom: '1px solid var(--color-neutral-250)',
      gap: 'var(--spacing-sm)',
    }}>
      {/* Status */}
      <div>
        <Badge label={milestone.status} variant={statusVariantMap[milestone.status] ?? 'default'} />
      </div>

      {/* Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <Icon name="radio-button-checked" size="sm" color="var(--color-neutral-500)" />
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-neutral-1000)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {milestone.name}
        </span>
      </div>

      {/* Assignee */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Avatar size="small" initials="?" />
        <span style={{ fontSize: 13, color: 'var(--color-blue-750)' }}>Unassigned</span>
      </div>

      {/* Dates */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-neutral-750)' }}>
        <Icon name="calendar-today" size="sm" color="var(--color-neutral-500)" />
        {milestone.startDate} – {milestone.endDate}
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Progress value={milestone.progress} max={100} />
        <span style={{ fontSize: 12, color: 'var(--color-neutral-500)', whiteSpace: 'nowrap' }}>
          {milestone.progress}%
        </span>
      </div>

      {/* Actions — pass <Icon> as ReactNode to IconButton.icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton icon={<Icon name="notifications"     size="sm" />} label="Subscribe" variant="ghost" size="small" />
        <IconButton icon={<Icon name="content-copy"     size="sm" />} label="Duplicate" variant="ghost" size="small" />
        <IconButton icon={<Icon name="bookmark-border" size="sm" />} label="Save"      variant="ghost" size="small" />
        <IconButton icon={<Icon name="list"     size="sm" />} label="More"      variant="ghost" size="small" />
        <Button variant="ghost" size="small">Expand</Button>
      </div>
    </div>
  )
}

// ── MilestoneGroupSection ─────────────────────────────────────────────────────

function MilestoneGroupSection({ group }: { group: MilestoneGroup }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{
      border: '1px solid var(--color-neutral-500)',
      borderRadius: 'var(--radius-medium)',
      overflow: 'hidden',
      marginBottom: 'var(--spacing-md)',
    }}>
      {/* Group header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        background: 'var(--color-neutral-250)',
        borderBottom: collapsed ? 'none' : '1px solid var(--color-neutral-500)',
      }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-neutral-1000)' }}>
          {group.name}
        </span>
        <span style={{ fontSize: 13, color: 'var(--color-neutral-500)', marginLeft: 8 }}>
          {group.milestones.length} milestone{group.milestones.length !== 1 ? 's' : ''}
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Button variant="ghost" size="small">
            <Icon name="notifications-off" size="sm" color="var(--color-neutral-500)" />
            Subscribe to Section
          </Button>
          <IconButton
            icon={<Icon name="more-horiz" size="sm" />}
            label="More options"
            variant="ghost"
            size="small"
          />
          <IconButton
            icon={<Icon name={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size="sm" />}
            label={collapsed ? 'Expand' : 'Collapse'}
            variant="ghost"
            size="small"
            onClick={() => setCollapsed(c => !c)}
          />
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: COLS,
            padding: '8px var(--spacing-md)',
            background: 'var(--color-neutral-250)',
            borderBottom: '1px solid var(--color-neutral-500)',
            gap: 'var(--spacing-sm)',
          }}>
            {['Status', 'Milestone Name', 'Assignee', 'Start / Finish', 'Progress', 'Actions'].map(col => (
              <span key={col} style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {group.milestones.map(ms => (
            <MilestoneRow key={ms.id} milestone={ms} />
          ))}
        </>
      )}
    </div>
  )
}

// ── Template ──────────────────────────────────────────────────────────────────

function MilestoneListTemplate() {
  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
        <Breadcrumbs items={[{ label: 'Test' }, { label: 'Test' }]} />

        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
          <Button variant="secondary" size="small">Show Graph</Button>
          <Button variant="secondary" size="small" iconLeading={<Icon name="share"  size="sm" />}>View All I/O</Button>
          <Button variant="ghost"     size="small" iconLeading={<Icon name="cloud-download" size="sm" />}>Export Data</Button>
          <ActionButton icon={<Icon name="add" size="sm" />}>Add</ActionButton>
        </div>
      </div>

      <Separator />

      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        {groups.map(g => (
          <MilestoneGroupSection key={g.id} group={g} />
        ))}
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Milestone List',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Milestone List** template for displaying grouped project milestones in a collapsible table layout. Each section represents a milestone group and can be independently expanded or collapsed.

**Intended usage:** Use inside a project detail view to give teams an at-a-glance status of all milestones, grouped by category or workstream. Each row links to a detailed milestone page. The header actions allow graph visualisation, I/O inspection, data export, and adding new milestones.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Breadcrumbs\` | Contextual navigation path at the top of the page |
| \`ActionButton\` | Primary "Add" action with a dropdown indicator for sub-actions |
| \`Button\` | Secondary and ghost actions (Show Graph, View All I/O, Export Data, Subscribe to Section) |
| \`Badge\` | Milestone status indicator (Scheduled, In Progress, Complete) |
| \`Avatar\` | Assignee profile picture or initials fallback |
| \`Progress\` | Inline progress bar showing milestone completion percentage |
| \`IconButton\` | Row-level actions (Subscribe, Duplicate, Save, More) and group collapse toggle |
| \`Icon\` | Decorative icons for milestone type, date fields, and header controls |
| \`Separator\` | Visual divider below the page header |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <MilestoneListTemplate />,
  name: 'Project Milestones',
}
