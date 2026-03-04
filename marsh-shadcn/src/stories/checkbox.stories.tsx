import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="agree" />
      <Label htmlFor="agree">I agree to the terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Property damage coverage</Label>
    </div>
  ),
}

export const CoverageList: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {['Property Damage', 'Business Interruption', 'Liability', 'Marine Cargo'].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox id={item} defaultChecked={item !== 'Marine Cargo'} />
          <Label htmlFor={item}>{item}</Label>
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="opacity-50">Unavailable coverage</Label>
    </div>
  ),
}
