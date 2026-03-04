import type { Meta, StoryObj } from '@storybook/react-vite'
import { NativeSelect } from '@/components/ui/native-select'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof NativeSelect> = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="coverage">Coverage Type</Label>
      <NativeSelect id="coverage">
        <option value="">Select a type...</option>
        <option value="property">Property</option>
        <option value="marine">Marine</option>
        <option value="aviation">Aviation</option>
        <option value="liability">Liability</option>
      </NativeSelect>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <NativeSelect size="sm">
      <option>Q1 2025</option>
      <option>Q2 2025</option>
      <option>Q3 2025</option>
    </NativeSelect>
  ),
}
