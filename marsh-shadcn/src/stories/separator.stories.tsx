import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <div>
        <h4 className="text-sm font-medium">Policy Details</h4>
        <p className="text-sm text-muted-foreground">Commercial property coverage</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Contact Information</h4>
        <p className="text-sm text-muted-foreground">your.advisor@marsh.com</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Renewal Date</h4>
        <p className="text-sm text-muted-foreground">December 31, 2025</p>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm">Property</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Marine</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Aviation</span>
    </div>
  ),
}
