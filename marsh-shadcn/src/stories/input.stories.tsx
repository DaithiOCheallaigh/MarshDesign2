import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <Input placeholder="Enter policy number" className="max-w-sm" />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@marsh.com" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="grid gap-3 max-w-sm">
      <Input type="text" placeholder="Policy holder name" />
      <Input type="email" placeholder="Email address" />
      <Input type="number" placeholder="Coverage amount" />
      <Input type="date" />
      <Input type="password" placeholder="Password" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <Input disabled placeholder="Read only field" className="max-w-sm" />,
}
