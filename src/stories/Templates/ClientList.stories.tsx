import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Table, Progress, Pagination, Badge, IconButton, Avatar, Icon } from '../../components'
import type { Column } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

// Extends Record so Column<Client>[] can be cast to Column[]
interface Client extends Record<string, unknown> {
  id: string
  name: string
  clientNumber: string
  country: string
  industryPractice: string
  teamSize: number
  projects: number
  activeProjects: number
  progress: number
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const allClients: Client[] = [
  { id: '1', name: 'Aviation Enterprises, Inc',   clientNumber: 'CN101181202', country: 'US', industryPractice: 'Other Services',    teamSize: 0,  projects: 0, activeProjects: 0, progress: 0  },
  { id: '2', name: 'Brennan Construction Group',   clientNumber: 'CN201193041', country: 'US', industryPractice: 'Construction',       teamSize: 3,  projects: 2, activeProjects: 1, progress: 45 },
  { id: '3', name: 'Clearwater Health Systems',    clientNumber: 'CN301847251', country: 'CA', industryPractice: 'Healthcare',         teamSize: 5,  projects: 4, activeProjects: 2, progress: 68 },
  { id: '4', name: 'Dockside Logistics Partners',  clientNumber: 'CN401928563', country: 'UK', industryPractice: 'Transportation',     teamSize: 8,  projects: 6, activeProjects: 3, progress: 82 },
  { id: '5', name: 'Emerald Coast Renewables',     clientNumber: 'CN501037894', country: 'AU', industryPractice: 'Energy',             teamSize: 12, projects: 5, activeProjects: 4, progress: 30 },
  { id: '6', name: 'First National Bancorp',       clientNumber: 'CN601928374', country: 'US', industryPractice: 'Financial Services', teamSize: 20, projects: 8, activeProjects: 5, progress: 91 },
  { id: '7', name: 'Global Trade Associates',      clientNumber: 'CN701827465', country: 'SG', industryPractice: 'Other Services',     teamSize: 6,  projects: 3, activeProjects: 2, progress: 55 },
  { id: '8', name: 'Harbour View Properties',      clientNumber: 'CN801726354', country: 'CA', industryPractice: 'Real Estate',        teamSize: 4,  projects: 1, activeProjects: 1, progress: 20 },
]

const PAGE_SIZE = 5

// ── Column definitions ────────────────────────────────────────────────────────

const columns: Column<Client>[] = [
  {
    key: 'name',
    header: 'Client',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={row.name.charAt(0)} size="small" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-primary-600)' }}>{row.name}</div>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>{row.clientNumber}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'country',
    header: 'Country',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>{row.country}</span>
    ),
  },
  {
    key: 'industryPractice',
    header: 'Industry Practice',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-primary-600)' }}>{row.industryPractice}</span>
    ),
  },
  {
    key: 'teamSize',
    header: 'Team Size',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="users" size="sm" color="var(--color-neutral-400)" />
        <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>{row.teamSize}</span>
      </div>
    ),
  },
  {
    key: 'projects',
    header: 'Projects',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>{row.projects}</span>
    ),
  },
  {
    key: 'activeProjects',
    header: 'Active Projects',
    render: (row) => (
      <span style={{ fontSize: 14, color: Number(row.activeProjects) > 0 ? 'var(--color-success-600)' : 'var(--color-neutral-500)' }}>
        {row.activeProjects}
      </span>
    ),
  },
  {
    key: 'progress',
    header: 'Progress',
    render: (row) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 120 }}>
        <span style={{ fontSize: 12, color: Number(row.progress) > 0 ? 'var(--color-success-600)' : 'var(--color-danger-600)', fontWeight: 600 }}>
          {row.progress}%
        </span>
        <Progress value={Number(row.progress)} max={100} />
      </div>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <IconButton icon="trash-2" label="Delete client" variant="danger" size="small" />
    ),
  },
]

// ── Template component ────────────────────────────────────────────────────────

function ClientListTemplate() {
  const [page, setPage] = useState(1)

  const start = (page - 1) * PAGE_SIZE
  const pageRows = allClients.slice(start, start + PAGE_SIZE)
  const totalPages = Math.ceil(allClients.length / PAGE_SIZE)

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <Table columns={columns as Column[]} rows={pageRows as Record<string, unknown>[]} keyField="id" />

      {/* Footer with results info + pagination */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderTop: '1px solid var(--color-neutral-200)',
        marginTop: -1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: 13, color: 'var(--color-neutral-600)' }}>
          <span>Results per page:</span>
          <Badge label={String(PAGE_SIZE)} variant="default" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: 13, color: 'var(--color-neutral-600)' }}>
          <span>
            {start + 1}–{Math.min(start + PAGE_SIZE, allClients.length)} of {allClients.length}
          </span>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Client List',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Client List** template for browsing and managing a paginated directory of clients. Each row provides key client metadata along with an overall progress indicator, making it easy to identify accounts that need attention.

**Intended usage:** Use as the main landing view for a client management section. The progress column gives a quick health-check across all accounts. The delete action is scoped to individual rows with a destructive variant to prevent accidental use. Extend with sorting headers and a top search/filter bar (using \`SearchBar\` and \`Select\`) for larger datasets.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Table\` | Primary data grid; columns use \`render\` functions for rich cell content |
| \`Avatar\` | Client initial fallback in the name column |
| \`Icon\` | Team size icon in the team column |
| \`Progress\` | Inline progress bar in the progress column |
| \`Badge\` | Results-per-page indicator in the table footer |
| \`IconButton (danger)\` | Row-level delete action |
| \`Pagination\` | Page navigation in the table footer |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <ClientListTemplate />,
  name: 'Client Directory',
}
