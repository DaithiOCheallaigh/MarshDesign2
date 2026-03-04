import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>View policy documentation</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const OnIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Deductible</span>
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Amount you pay before insurance covers the rest</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
