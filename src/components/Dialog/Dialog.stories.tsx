import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'
import { Button } from '../Button'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          title="Confirm Action"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="small" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" size="small" onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Are you sure you want to proceed? This action cannot be undone.</p>
        </Dialog>
      </>
    )
  },
}

export const DangerDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete Item</Button>
        <Dialog
          open={open}
          title="Delete Item"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="small" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" size="small" onClick={() => setOpen(false)}>Delete</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>This item will be permanently deleted. This action cannot be undone.</p>
        </Dialog>
      </>
    )
  },
}
