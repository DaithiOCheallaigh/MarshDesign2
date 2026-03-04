import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="monthly">
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      <ToggleGroupItem value="quarterly">Quarterly</ToggleGroupItem>
      <ToggleGroupItem value="annual">Annual</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['property', 'marine']}>
      <ToggleGroupItem value="property">Property</ToggleGroupItem>
      <ToggleGroupItem value="marine">Marine</ToggleGroupItem>
      <ToggleGroupItem value="aviation">Aviation</ToggleGroupItem>
      <ToggleGroupItem value="liability">Liability</ToggleGroupItem>
    </ToggleGroup>
  ),
}
