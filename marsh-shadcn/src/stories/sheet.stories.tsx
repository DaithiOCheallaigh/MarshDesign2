import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Panel</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Policy Details</SheetTitle>
          <SheetDescription>Review and edit policy information for P-2024-001.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <Label htmlFor="holder">Policy Holder</Label>
            <Input id="holder" defaultValue="Acme Corporation" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="limit">Coverage Limit</Label>
            <Input id="limit" defaultValue="$2,500,000" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Navigation</Button></SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Marsh Portal</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          {['Dashboard', 'Policies', 'Claims', 'Reports', 'Settings'].map((item) => (
            <a key={item} href="#" className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground">{item}</a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
}
