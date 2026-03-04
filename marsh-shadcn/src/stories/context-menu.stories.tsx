import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel,
  ContextMenuSeparator, ContextMenuTrigger, ContextMenuShortcut,
} from '@/components/ui/context-menu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Policy P-2024-001</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>View Details<ContextMenuShortcut>⌘V</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Download PDF<ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Archive</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Cancel Policy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
