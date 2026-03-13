import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, Button, Select } from '../../components'

// ── Mock data ─────────────────────────────────────────────────────────────────

const templateOptions = [
  { label: 'New Template (Copy) | Marsh | Renewals', value: 'new-template-copy' },
  { label: 'Standard Project Template',              value: 'standard' },
  { label: 'Renewal Project Template',               value: 'renewal' },
  { label: 'Marine Liability Template',              value: 'marine' },
  { label: 'Property Risk Template',                 value: 'property' },
]

// ── Template ──────────────────────────────────────────────────────────────────

function SelectTemplateDialogTemplate() {
  const [open, setOpen]         = useState(true)
  const [template, setTemplate] = useState('')

  const handleClose = () => {
    setOpen(false)
    setTemplate('')
  }

  return (
    <div style={{ padding: 48 }}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Add New Project
      </Button>

      <Dialog
        open={open}
        title="Create New Project"
        onClose={handleClose}
        footer={
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" disabled={!template}>Create Project</Button>
          </div>
        }
      >
        <p style={{ margin: '0 0 var(--spacing-md)', fontSize: 13, color: 'var(--color-neutral-750)', lineHeight: 1.5 }}>
          Choose a template to get started with pre-configured milestones and best practices
        </p>

        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--color-neutral-750)' }}>
          Select Project Template
        </p>
        <Select
          options={templateOptions}
          value={template}
          onChange={setTemplate}
          placeholder="Select a template..."
        />
      </Dialog>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Select Template Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Select Template Dialog** — the first step in the "Create New Project" wizard. The user picks a pre-configured template before being presented with the full project details form.

**Intended usage:** Show this dialog when the user clicks "Add New Project" from the Client Header. Once a template is selected, dismiss this dialog and open the full **Create Project Dialog** pre-populated with the chosen template. The "Create Project" button remains disabled until a template is selected.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Dialog\` | Modal overlay with title, body, and footer |
| \`Select\` | Template picker — disabled submit until a value is chosen |
| \`Button (primary)\` | Submits and advances to project details; disabled until template selected |
| \`Button (secondary)\` | Cancels and resets the selection |
      `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <SelectTemplateDialogTemplate />,
  name: 'Select Project Template',
}
