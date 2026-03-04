import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup, SelectSeparator } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select coverage type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="property">Property</SelectItem>
        <SelectItem value="marine">Marine</SelectItem>
        <SelectItem value="aviation">Aviation</SelectItem>
        <SelectItem value="liability">Liability</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label>Policy Type</Label>
      <Select>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choose a policy type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Commercial</SelectLabel>
            <SelectItem value="property">Property</SelectItem>
            <SelectItem value="liability">General Liability</SelectItem>
            <SelectItem value="workers-comp">Workers Compensation</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Specialty</SelectLabel>
            <SelectItem value="marine">Marine Cargo</SelectItem>
            <SelectItem value="aviation">Aviation</SelectItem>
            <SelectItem value="cyber">Cyber Risk</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}
