import type { Meta, StoryObj } from '@storybook/react'
import { Icon, IconButton, Separator } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface TemplateCardData {
  id: string
  name: string
  business: string
  businessFunction: string
  groups: number
  milestones: number
  description: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const templates: TemplateCardData[] = [
  {
    id: '1',
    name: 'New Template',
    business: 'Marsh',
    businessFunction: 'Renewals',
    groups: 1,
    milestones: 1,
    description: 'New mandatory fields',
  },
  {
    id: '2',
    name: 'Marine Liability',
    business: 'Marsh',
    businessFunction: 'Marine',
    groups: 3,
    milestones: 12,
    description: 'Standard marine liability renewal workflow with compliance checkpoints.',
  },
  {
    id: '3',
    name: 'Property Risk Assessment',
    business: 'Marsh',
    businessFunction: 'Property',
    groups: 2,
    milestones: 8,
    description: 'Full property portfolio review template for annual assessments.',
  },
]

// ── TemplateCard component ────────────────────────────────────────────────────

function TemplateCard({ template }: { template: TemplateCardData }) {
  return (
    <div style={{
      width: 260,
      border: '1px solid var(--color-neutral-250)',
      borderRadius: 'var(--radius-medium)',
      background: 'var(--color-white)',
      padding: 'var(--spacing-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      {/* Icon + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 36, height: 36, flexShrink: 0,
          background: 'var(--color-blue-250)',
          borderRadius: 'var(--radius-small)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="folder-open" size="sm" color="var(--color-blue-750)" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-1000)' }}>
            {template.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-750)', marginTop: 2 }}>
            Business: <strong>{template.business}</strong>
            {' | '}
            Function: <strong>{template.businessFunction}</strong>
          </div>
        </div>
      </div>

      {/* Counts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="format-list-bulleted" size={16} color="var(--color-neutral-500)" />
          <span style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>
            {template.groups} Group{template.groups !== 1 ? 's' : ''}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="task" size={16} color="var(--color-neutral-500)" />
          <span style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>
            {template.milestones} Milestone{template.milestones !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 12,
        color: 'var(--color-neutral-750)',
        margin: 0,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      }}>
        {template.description}
      </p>

      <Separator />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton icon={<Icon name="edit"      size="sm" />} label="Edit template"      variant="ghost" size="small" />
        <IconButton icon={<Icon name="file-copy" size="sm" />} label="Duplicate template" variant="ghost" size="small" />
        <IconButton icon={<Icon name="delete"    size="sm" />} label="Delete template"    variant="danger" size="small" />
      </div>
    </div>
  )
}

// ── Template ──────────────────────────────────────────────────────────────────

function TemplateCardTemplate() {
  return (
    <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
      {templates.map(t => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Template Card',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Template Card** pattern for displaying project templates in a browseable card grid. Each card shows the template's key metadata and provides quick edit, duplicate, and delete actions.

**Intended usage:** Render cards in a responsive grid on the Templates management page. Cards are scannable at a glance — template name, owning business/function, group/milestone counts, and a description snippet. Pair with a search/filter bar for larger template libraries.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Icon\` | folder-open template identity icon; format-list-bulleted for groups; task for milestones |
| \`IconButton (ghost)\` | Edit and Duplicate actions |
| \`IconButton (danger)\` | Delete action |
| \`Separator\` | Visual divider between metadata and actions |
      `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <TemplateCardTemplate />,
  name: 'Template Cards',
}
