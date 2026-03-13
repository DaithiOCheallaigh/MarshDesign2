import type { Meta, StoryObj } from '@storybook/react'
import { Button, Icon, Tooltip } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface StatCard {
  icon: string
  iconColor: string
  label: string
  value: string
  tooltip?: string
}

interface ClientData {
  name: string
  clientNumber: string
  industryPractice: string
  address: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const client: ClientData = {
  name: 'Aviation Enterprises, Inc',
  clientNumber: 'CN101181202',
  industryPractice: 'Other Services',
  address: 'Springfield, Missouri, US',
}

const stats: StatCard[] = [
  { icon: 'folder-open',          iconColor: 'var(--color-blue-750)',       label: 'Total Projects',   value: '0' },
  { icon: 'show-chart',           iconColor: 'var(--color-status-success)',  label: 'Active Projects',  value: '0' },
  { icon: 'radio-button-checked', iconColor: '#9333ea',                      label: 'Total Milestones', value: '0' },
  { icon: 'trending-up',          iconColor: 'var(--color-orange)',          label: 'Completion Rate',  value: '0%',      tooltip: 'Average completion across all active projects' },
  { icon: 'person',               iconColor: 'var(--color-blue-gray)',       label: 'Team Size',        value: '0 members', tooltip: 'Total users assigned to this client' },
]

// ── StatChip ──────────────────────────────────────────────────────────────────

function StatChip({ stat }: { stat: StatCard }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      border: '1px solid var(--color-neutral-250)',
      borderRadius: 'var(--radius-medium)',
      background: 'var(--color-white)',
      minWidth: 0,
    }}>
      <Icon name={stat.icon} size="sm" color={stat.iconColor} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, color: 'var(--color-neutral-750)', whiteSpace: 'nowrap' }}>
            {stat.label}
          </span>
          {stat.tooltip && (
            <Tooltip content={stat.tooltip} placement="top">
              <Icon name="info" size={14} color="var(--color-neutral-500)" />
            </Tooltip>
          )}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-neutral-1000)' }}>
          {stat.value}
        </div>
      </div>
    </div>
  )
}

// ── Template ──────────────────────────────────────────────────────────────────

function ClientHeaderTemplate() {
  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <div style={{
        border: '1px solid var(--color-blue-250)',
        borderRadius: 'var(--radius-medium)',
        padding: 'var(--spacing-md)',
        background: 'var(--color-white)',
      }}>
        {/* Identity row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
          {/* Client icon */}
          <div style={{
            width: 48, height: 48, flexShrink: 0,
            background: 'var(--color-brand-midnight)',
            borderRadius: 'var(--radius-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="apartment" size="md" color="var(--color-white)" />
          </div>

          {/* Name + meta */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-blue-750)' }}>
              {client.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>
              {client.clientNumber}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-750)', marginTop: 2 }}>
              Industry Practice: {client.industryPractice}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>
              Address: {client.address}
            </div>
          </div>

          {/* CTA */}
          <Button variant="primary" iconLeading={<Icon name="add" size="sm" />}>
            Add New Project
          </Button>
        </div>

        {/* Stat chips row */}
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          {stats.map(stat => (
            <StatChip key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Client Header',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Client Header** template that summarises a single client's identity and high-level portfolio metrics at a glance. Used at the top of a client detail page.

**Intended usage:** Place at the top of every client detail view. The five stat chips give a quick health-check — total projects, active projects, milestone count, overall completion rate, and team size — without needing to scroll into the project list. The "Add New Project" CTA is the primary action for this page.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Button (primary)\` | "Add New Project" page-level CTA |
| \`Icon\` | Client identity square; stat chip icons (folder-open, show-chart, radio-button-checked, trending-up, person) |
| \`Tooltip\` | Contextual hint on Completion Rate and Team Size labels |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <ClientHeaderTemplate />,
  name: 'Client Overview',
}
