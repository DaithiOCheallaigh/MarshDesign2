import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '@/components/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
}

export const PolicyCard: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm border rounded-xl p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  ),
}
