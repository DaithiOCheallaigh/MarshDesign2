import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, Button, Icon } from '../../components'

function StartProjectTemplate() {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ padding: 48 }}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Re-open Dialog
      </Button>
      <Dialog
        open={open}
        title="Start Project"
        onClose={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Start Project</Button>
          </div>
        }
      >
        <p style={{ margin: '0 0 var(--spacing-md)', fontSize: 14, lineHeight: 1.6, color: 'var(--color-neutral-750)' }}>
          Are you sure you want to start this project? Once a project is started, the following restrictions apply:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'No new Milestone Groups can be added',
            'No new Milestones can be added',
            'No new Inputs/Outputs can be added',
            'The start date cannot be edited',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="horizontal-rule" size="sm" color="var(--color-neutral-500)" />
              <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-neutral-750)' }}>{item}</span>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  )
}

const meta: Meta = {
  title: 'Templates/Confirmation Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Confirmation Dialog** pattern used when a destructive or irreversible action requires explicit user consent before proceeding. The dialog clearly lists all consequences so the user is fully informed before committing.

**Intended usage:** Wrap any action that permanently changes system state — starting a project, submitting for approval, archiving a record, or deleting data. Always enumerate the specific restrictions or side-effects so users can make an informed decision. Pair a neutral secondary Cancel action with a clearly labelled primary confirmation action.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Dialog\` | Modal overlay with title, scrollable body, and footer slot |
| \`Button (primary)\` | Confirms and commits the irreversible action |
| \`Button (secondary)\` | Cancels and closes the dialog without making changes |
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <StartProjectTemplate />,
  name: 'Start Project',
}
