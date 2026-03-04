import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Open Policy Details</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Property Policy #P-2024-001</DialogTitle>
          <DialogDescription>Review and update your commercial property coverage details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="holder">Policy Holder</Label>
            <Input id="holder" defaultValue="Acme Corporation" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="limit">Coverage Limit</Label>
            <Input id="limit" defaultValue="$2,500,000" />
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="destructive">Cancel Policy</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Policy?</DialogTitle>
          <DialogDescription>This action cannot be undone. Your coverage will end immediately upon cancellation.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Yes, Cancel Policy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
