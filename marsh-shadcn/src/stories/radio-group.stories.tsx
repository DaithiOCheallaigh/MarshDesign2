import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="monthly" />
        <Label htmlFor="monthly">Monthly premium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="quarterly" id="quarterly" />
        <Label htmlFor="quarterly">Quarterly premium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="annual" id="annual" />
        <Label htmlFor="annual">Annual premium</Label>
      </div>
    </RadioGroup>
  ),
}

export const CoverageType: Story = {
  render: () => (
    <RadioGroup defaultValue="commercial">
      {['Commercial', 'Industrial', 'Residential', 'Mixed-use'].map((type) => (
        <div key={type} className="flex items-center gap-2">
          <RadioGroupItem value={type.toLowerCase()} id={type} />
          <Label htmlFor={type}>{type}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}
