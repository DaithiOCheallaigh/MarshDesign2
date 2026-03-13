import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input, Select, TextArea, Icon, Separator } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface TemplateForm {
  templateName: string
  business: string
  businessFunction: string
  specifyBusinessFunction: string
  description: string
  version: string
}

// ── Options ───────────────────────────────────────────────────────────────────

const businessFunctionOptions = [
  { label: 'Other',       value: 'other' },
  { label: 'Renewals',    value: 'renewals' },
  { label: 'New Business',value: 'new_business' },
  { label: 'Claims',      value: 'claims' },
  { label: 'Compliance',  value: 'compliance' },
]

// ── Template component ────────────────────────────────────────────────────────

function TemplateInformationTemplate() {
  const [collapsed, setCollapsed] = useState(false)
  const [form, setForm] = useState<TemplateForm>({
    templateName: 'New Template',
    business: 'Marsh',
    businessFunction: 'other',
    specifyBusinessFunction: 'Renewals',
    description: 'New mandatory fields',
    version: '1.0',
  })

  const set = (field: keyof TemplateForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div style={{ padding: 'var(--spacing-lg)', maxWidth: 960 }}>
      {/* Section header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        background: 'var(--color-neutral-250)',
        border: '1px solid var(--color-neutral-500)',
        borderRadius: collapsed ? 'var(--radius-medium)' : 'var(--radius-medium) var(--radius-medium) 0 0',
        cursor: 'pointer',
        userSelect: 'none',
      }}
        onClick={() => setCollapsed(c => !c)}
        role="button"
        aria-expanded={!collapsed}
      >
        <Icon
          name={collapsed ? 'chevron-right' : 'chevron-down'}
          size="sm"
          color="var(--color-neutral-500)"
        />
        <Icon name="folder" size="sm" color="var(--color-neutral-500)" />
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-neutral-1000)' }}>
          Template Information
        </span>
      </div>

      {/* Form body */}
      {!collapsed && (
        <div style={{
          border: '1px solid var(--color-neutral-500)',
          borderTop: 'none',
          borderRadius: '0 0 var(--radius-medium) var(--radius-medium)',
          padding: 'var(--spacing-lg)',
          background: 'var(--color-white)',
        }}>
          {/* Row 1: Template Name + Business */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <Input
                label="Template Name *"
                value={form.templateName}
                onChange={set('templateName')}
                maxLength={100}
                hint={`${form.templateName.length}/100 characters`}
              />
            </div>
            <div>
              <Input
                label="Business"
                value={form.business}
                onChange={set('business')}
                maxLength={100}
                hint={`${form.business.length}/100 characters`}
              />
            </div>
          </div>

          {/* Row 2: Business Function + Specify Business Function */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-750)', marginBottom: 'var(--spacing-xs)' }}>
                Business Function *
              </label>
              <Select
                options={businessFunctionOptions}
                value={form.businessFunction}
                onChange={(val) => setForm(f => ({ ...f, businessFunction: val }))}
              />
            </div>
            <Input
              label="Specify Business Function *"
              value={form.specifyBusinessFunction}
              onChange={set('specifyBusinessFunction')}
            />
          </div>

          <Separator />

          {/* Description */}
          <div style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
            <TextArea
              label="Description"
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              maxLength={500}
              hint={`${form.description.length}/500 characters`}
            />
          </div>

          {/* Version */}
          <div style={{ maxWidth: 200 }}>
            <Input
              label="Version"
              value={form.version}
              onChange={set('version')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Template Information',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Template Information** form section for capturing the metadata of a project template. The section is collapsible, allowing users to hide the form when focusing on other parts of a longer configuration page.

**Intended usage:** Use as one panel within a multi-section template builder or settings page. The two-column grid layout pairs related fields side by side to reduce vertical scrolling. Required fields are marked with an asterisk. Character count hints below each field prevent the user from exceeding backend limits. The Version field is intentionally narrow to signal it accepts short semantic version strings (e.g. \`1.0\`, \`2.1.3\`).

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Icon\` | Chevron (collapse toggle) and Folder (section identity) in the header |
| \`Input\` | Template Name, Business, Specify Business Function, and Version fields |
| \`Select\` | Business Function dropdown |
| \`TextArea\` | Multi-line Description with 500-character limit |
| \`Separator\` | Visual divider between the grid fields and the description |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <TemplateInformationTemplate />,
  name: 'Template Information',
}
