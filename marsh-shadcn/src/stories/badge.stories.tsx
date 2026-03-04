import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Critical</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Active Policy</Badge>
      <Badge variant="secondary">Under Review</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="destructive">High Risk</Badge>
    </div>
  ),
}
