import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu,
  MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from '@/components/ui/menubar'

const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Policies</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Policy<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Import<MenubarShortcut>⌘I</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Export PDF<MenubarShortcut>⌘E</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Claims</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Submit Claim</MenubarItem>
          <MenubarItem>View Open Claims</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Claims History</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Reports</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Risk Summary</MenubarItem>
          <MenubarItem>Premium Analysis</MenubarItem>
          <MenubarItem>Loss Trends</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
