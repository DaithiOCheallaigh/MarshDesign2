import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <Label className="mb-2 block">Coverage Amount</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <Label className="mb-2 block">Deductible Range</Label>
        <Slider defaultValue={[1000, 5000]} min={0} max={10000} step={500} />
      </div>
    </div>
  ),
}
