import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/components/ui/spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => <Spinner />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium" disabled>
      <Spinner className="text-primary-foreground" />
      Processing claim...
    </button>
  ),
}
