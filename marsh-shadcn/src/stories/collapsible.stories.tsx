import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: function CollapsibleDemo() {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Coverage Exclusions</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon"><ChevronsUpDown className="h-4 w-4" /></Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-3 py-2 text-sm">Flood damage (standard exclusion)</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-3 py-2 text-sm">Earthquake damage</div>
          <div className="rounded-md border px-3 py-2 text-sm">War and terrorism</div>
          <div className="rounded-md border px-3 py-2 text-sm">Nuclear incidents</div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
