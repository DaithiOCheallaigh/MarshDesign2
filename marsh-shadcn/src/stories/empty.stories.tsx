import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileSearch, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyHeader } from '@/components/ui/empty'

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty className="max-w-sm">
      <EmptyHeader>
        <FileSearch className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No policies found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search filters or create a new policy.</p>
      </EmptyHeader>
      <Button><Plus className="mr-2 h-4 w-4" />New Policy</Button>
    </Empty>
  ),
}
