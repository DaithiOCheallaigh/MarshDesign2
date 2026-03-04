import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  ),
}

export const Settings: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      {[
        { id: 'renewal', label: 'Renewal reminders', checked: true },
        { id: 'claims', label: 'Claims updates', checked: true },
        { id: 'marketing', label: 'Marketing emails', checked: false },
        { id: 'reports', label: 'Monthly reports', checked: false },
      ].map(({ id, label, checked }) => (
        <div key={id} className="flex items-center justify-between">
          <Label htmlFor={id}>{label}</Label>
          <Switch id={id} defaultChecked={checked} />
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" />
      <Switch />
    </div>
  ),
}
