import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Filter Policies</Button></PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Filters</h4>
          <div className="grid gap-2">
            <Label htmlFor="holder">Policy Holder</Label>
            <Input id="holder" placeholder="Search by name..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="from">From Date</Label>
            <Input id="from" type="date" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
