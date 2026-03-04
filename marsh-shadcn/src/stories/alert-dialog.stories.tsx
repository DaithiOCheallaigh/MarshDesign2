import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="destructive">Cancel Policy</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this policy?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Cancelling Policy P-2024-001 will immediately terminate all coverage and you will not receive a refund for unused premiums.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Policy</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">Yes, Cancel</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button>Submit Claim</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit this claim?</AlertDialogTitle>
          <AlertDialogDescription>
            Your claim will be submitted to the Marsh claims team. An adjuster will contact you within 2 business days.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review Again</AlertDialogCancel>
          <AlertDialogAction>Confirm Submission</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
