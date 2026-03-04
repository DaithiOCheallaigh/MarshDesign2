import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Button>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button><Plus /> New Policy</Button>
      <Button variant="secondary"><Download /> Export</Button>
      <Button variant="outline">View Report <ArrowRight /></Button>
      <Button size="icon" variant="outline"><Download /></Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Active</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
