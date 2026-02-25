import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Popover
        trigger={<Button variant="outline" size="small">Open Popover</Button>}
        placement="bottom"
      >
        <p style={{ margin: 0, fontSize: 14 }}>This is popover content. It can contain any React content.</p>
      </Popover>
    </div>
  ),
}

export const WithActions: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Popover
        trigger={<Button variant="outline" size="small">Options</Button>}
        placement="bottom"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button style={{ background: 'none', border: 'none', padding: '6px 8px', textAlign: 'left', cursor: 'pointer', borderRadius: 4, fontSize: 14 }}>Edit</button>
          <button style={{ background: 'none', border: 'none', padding: '6px 8px', textAlign: 'left', cursor: 'pointer', borderRadius: 4, fontSize: 14, color: '#B30000' }}>Delete</button>
        </div>
      </Popover>
    </div>
  ),
}
