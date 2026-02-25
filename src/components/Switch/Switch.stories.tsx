import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = { args: { label: 'Enable notifications' } }
export const Checked: Story = { args: { label: 'Feature enabled', defaultChecked: true } }
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } }

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch label="Email notifications" defaultChecked />
      <Switch label="SMS notifications" />
      <Switch label="Push notifications" defaultChecked />
      <Switch label="Marketing emails" disabled />
    </div>
  ),
}
