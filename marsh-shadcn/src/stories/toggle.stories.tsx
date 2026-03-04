import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => <Toggle>Active Policies Only</Toggle>,
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
      <Toggle aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
      <Toggle aria-label="Underline"><Underline className="h-4 w-4" /></Toggle>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  ),
}
