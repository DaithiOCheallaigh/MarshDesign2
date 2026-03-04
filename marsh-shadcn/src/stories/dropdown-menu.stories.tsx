import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDown, FileText, Download, Archive, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Policy Actions <ChevronDown className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Policy P-2024-001</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
        <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download PDF<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem><Archive className="mr-2 h-4 w-4" />Archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Cancel Policy</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
