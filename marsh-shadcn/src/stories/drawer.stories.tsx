import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Submit a Claim</DrawerTitle>
          <DrawerDescription>Complete the form below to initiate a new insurance claim.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2 text-sm text-muted-foreground">
          Claim form fields would appear here.
        </div>
        <DrawerFooter>
          <Button>Submit Claim</Button>
          <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
