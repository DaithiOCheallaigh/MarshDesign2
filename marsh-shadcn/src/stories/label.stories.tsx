import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Label>

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="policy-no">Policy Number</Label>
      <Input id="policy-no" placeholder="P-2024-XXXX" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept coverage terms and conditions</Label>
    </div>
  ),
}
