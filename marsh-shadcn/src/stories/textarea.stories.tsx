import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="notes">Claim Description</Label>
      <Textarea id="notes" placeholder="Describe the incident in detail..." rows={4} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="notes-disabled">Policy Notes</Label>
      <Textarea id="notes-disabled" disabled defaultValue="This policy was reviewed on January 2025." />
    </div>
  ),
}
