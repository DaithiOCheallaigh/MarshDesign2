import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Table, Progress, IconButton, Icon, Select } from '../../components'
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

const pageSizeOptions = [
  { label: '5',  value: '5'  },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
]

// ── Column definitions ────────────────────────────────────────────────────────

const columns: Column<Client>[] = [
  {
    key: 'name',
    header: 'Client',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Building icon in a tinted box — matches app reference */}
        <div style={{
          width: 28, height: 28,
          borderRadius: 6,
          background: 'var(--color-blue-250)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="apartment" size="sm" color="var(--color-blue-750)" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-blue-750)' }}>{row.name}</div>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>{row.clientNumber}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'country',
    header: 'Country',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-neutral-750)' }}>{row.country}</span>
    ),
  },
  {
    key: 'industryPractice',
    header: 'Industry Practice',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-blue-750)' }}>{row.industryPractice}</span>
    ),
  },
  {
    key: 'teamSize',
    header: 'Team Size',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="group" size="sm" color="var(--color-neutral-500)" />
        <span style={{ fontSize: 14, color: 'var(--color-neutral-750)' }}>{row.teamSize}</span>
      </div>
    ),
  },
  {
    key: 'projects',
    header: 'Projects',
    render: (row) => (
      <span style={{ fontSize: 14, color: 'var(--color-neutral-750)' }}>{row.projects}</span>
    ),
  },
  {
    key: 'activeProjects',
    header: 'Active Projects',
    render: (row) => (
      <span style={{ fontSize: 14, color: Number(row.activeProjects) > 0 ? 'var(--color-status-success)' : 'var(--color-neutral-500)' }}>
        {row.activeProjects}
      </span>
    ),
  },
  {
    key: 'progress',
    header: 'Progress ↑↓',
    render: (row) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 100 }}>
        <span style={{ fontSize: 12, color: Number(row.progress) > 0 ? 'var(--color-status-success)' : 'var(--color-status-danger)', fontWeight: 600 }}>
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
      /* Pass <Icon> ReactNode — IconButton.icon is ReactNode, not a string */
      <IconButton
        icon={<Icon name="delete" size="sm" />}
        label="Delete client"
        variant="danger"
        size="small"
      />
    ),
  },
]

// ── Template component ────────────────────────────────────────────────────────

function ClientListTemplate() {
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const start      = (page - 1) * pageSize
  const pageRows   = allClients.slice(start, start + pageSize)
  const totalPages = Math.ceil(allClients.length / pageSize)

  const handlePageSize = (val: string) => {
    setPageSize(Number(val))
    setPage(1)
  }

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <Table columns={columns as Column[]} rows={pageRows as Record<string, unknown>[]} keyField="id" />

      {/* Footer: results-per-page selector + page navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderTop: '1px solid var(--color-neutral-500)',
        marginTop: -1,
      }}>
        {/* Left — results per page Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: 13, color: 'var(--color-neutral-750)' }}>
          <span>Results per page:</span>
          <div style={{ width: 72 }}>
            <Select options={pageSizeOptions} value={String(pageSize)} onChange={handlePageSize} />
          </div>
        </div>

        {/* Right — record count + first/prev · Page X of Y · next/last */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: 13, color: 'var(--color-neutral-750)' }}>
          <span>
            {start + 1}–{Math.min(start + pageSize, allClients.length)} of {allClients.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              icon={<Icon name="keyboard-double-arrow-left"  size="sm" />}
              label="First page"
              variant="ghost" size="small"
              disabled={page === 1}
              onClick={() => setPage(1)}
            />
            <IconButton
              icon={<Icon name="keyboard-arrow-left"   size="sm" />}
              label="Previous page"
              variant="ghost" size="small"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            />
            <span style={{ padding: '0 8px', fontSize: 13, color: 'var(--color-neutral-750)', whiteSpace: 'nowrap' }}>
              Page {page} of {totalPages}
            </span>
            <IconButton
              icon={<Icon name="keyboard-arrow-right"  size="sm" />}
              label="Next page"
              variant="ghost" size="small"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            />
            <IconButton
              icon={<Icon name="keyboard-double-arrow-right" size="sm" />}
              label="Last page"
              variant="ghost" size="small"
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            />
          </div>
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
| \`Icon\` | Building icon for client identity; users icon for team size column |
| \`Progress\` | Inline progress bar in the progress column |
| \`Select\` | Results-per-page selector in the table footer |
| \`IconButton (danger)\` | Row-level delete action |
| \`IconButton (ghost)\` | First / Prev / Next / Last pagination controls |
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
