import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileText, Search, Building2, Ship } from 'lucide-react'
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from '@/components/ui/command'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border w-80">
      <CommandInput placeholder="Search policies, claims..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Policies">
          <CommandItem><Building2 className="mr-2 h-4 w-4" />Property Policy P-001<CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem><Ship className="mr-2 h-4 w-4" />Marine Cargo M-042</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem><FileText className="mr-2 h-4 w-4" />Submit Claim<CommandShortcut>⌘C</CommandShortcut></CommandItem>
          <CommandItem><Search className="mr-2 h-4 w-4" />Advanced Search<CommandShortcut>⌘F</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
