import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, Button, Input, Select, TextArea } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectForm {
  template: string
  name: string
  assignee: string
  description: string
  startDate: string
  endDate: string
  budget: string
  priority: string
}

const EMPTY_FORM: ProjectForm = {
  template: '',
  name: '',
  assignee: '',
  description: 'New mandatory fields description text templates text description',
  startDate: '',
  endDate: '',
  budget: '',
  priority: 'medium',
}

const templateOptions = [
  { label: 'New Template (Copy) | Marsh | Renewals', value: 'new-template-copy' },
  { label: 'Standard Project Template', value: 'standard' },
  { label: 'Renewal Project Template', value: 'renewal' },
]

const priorityOptions = [
  { label: 'Low',    value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High',   value: 'high' },
]

// ── Template component ────────────────────────────────────────────────────────

function CreateProjectDialogTemplate() {
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState<ProjectForm>({ ...EMPTY_FORM })

  const set = (field: keyof ProjectForm) => (value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  const handleClose = () => {
    setOpen(false)
    setForm({ ...EMPTY_FORM })
  }

  const isValid = form.name.trim() !== '' && form.startDate !== ''

  return (
    <div style={{ padding: 48 }}>
      <Button variant="primary" onClick={() => setOpen(true)}>Create New Project</Button>

      <Dialog
        open={open}
        title="Create New Project"
        onClose={handleClose}
        footer={
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" disabled={!isValid}>Create Project</Button>
          </div>
        }
      >
        <p style={{ margin: '0 0 var(--spacing-md)', fontSize: 13, color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>
          Choose a template to get started with pre-configured milestones and best practices
        </p>

        {/* Template selector */}
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--spacing-xs)', color: 'var(--color-neutral-700)' }}>
            Select Project Template
          </p>
          <Select
            options={templateOptions}
            value={form.template}
            onChange={set('template')}
            placeholder="New Template (Copy) | Marsh | Renewals"
          />
        </div>


        {/* Project details */}
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--color-neutral-700)' }}>
          Project Details
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <Input
            label="Project Name *"
            placeholder="Enter project name…"
            value={form.name}
            onChange={e => set('name')(e.target.value)}
          />

          <Input
            label="Project Assignee (Optional)"
            placeholder="Use Search or Self to assign"
            value={form.assignee}
            onChange={e => set('assignee')(e.target.value)}
          />

          <TextArea
            label="Description"
            value={form.description}
            onChange={e => set('description')(e.target.value)}
            hint={`${form.description.length}/250`}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <Input
              label="Start Date *"
              type="date"
              value={form.startDate}
              onChange={e => set('startDate')(e.target.value)}
            />
            <div>
              <Input
                label="End Date"
                type="date"
                value={form.endDate}
                onChange={e => set('endDate')(e.target.value)}
                disabled={!form.startDate}
              />
              {!form.startDate && (
                <p style={{ fontSize: 12, color: 'var(--color-neutral-500)', marginTop: 4 }}>
                  Set a start date to calculate
                </p>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <Input
              label="Budget"
              placeholder="e.g., 100,000"
              prefix="$"
              value={form.budget}
              onChange={e => set('budget')(e.target.value)}
            />
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-700)', marginBottom: 'var(--spacing-xs)' }}>
                Priority
              </label>
              <Select
                options={priorityOptions}
                value={form.priority}
                onChange={set('priority')}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Create Project Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Create Project Dialog** pattern for collecting all the metadata needed to create a new project from a template. The dialog is split into a template selection step followed by project details fields.

**Intended usage:** Trigger this dialog from any "Create Project" or "New Project" call-to-action. The template dropdown lets users start from a pre-configured set of milestones and best practices rather than a blank slate. The form validates required fields (Project Name, Start Date) before enabling the submit action. End Date auto-calculates from the template's duration once a start date is provided.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Dialog\` | Full-height modal with scrollable form body and sticky footer |
| \`Select\` | Template picker; also used for Priority dropdown |
| \`Input\` | Text fields — Project Name, Assignee, Start/End dates, and Budget (with \`$\` prefix) |
| \`TextArea\` | Multi-line Description with character count hint |
| \`Button (primary)\` | Submits the form; disabled until required fields are valid |
| \`Button (secondary)\` | Cancels and resets the form |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <CreateProjectDialogTemplate />,
  name: 'Create New Project',
}
