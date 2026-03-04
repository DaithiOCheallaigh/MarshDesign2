import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Toaster />
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast('Policy saved successfully')}>Default</Button>
      <Button variant="secondary" onClick={() => toast.success('Claim submitted! Reference: CLM-2024-042')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Unable to process claim. Please try again.')}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning('Policy renewal due in 7 days')}>Warning</Button>
      <Button variant="outline" onClick={() => toast.info('Your advisor will contact you shortly')}>Info</Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Policy archived', {
          description: 'P-2024-001 has been moved to archive',
          action: { label: 'Undo', onClick: () => toast('Restored!') },
        })
      }
    >
      Archive Policy
    </Button>
  ),
}
