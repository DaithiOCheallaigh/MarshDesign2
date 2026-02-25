import type { Meta, StoryObj } from '@storybook/react'
import { ActivityGauge } from './ActivityGauge'

const meta: Meta<typeof ActivityGauge> = {
  title: 'Analytics/ActivityGauge',
  component: ActivityGauge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ActivityGauge>

export const Default: Story = {
  args: { value: 72, label: 'Loss Ratio', sublabel: 'vs 68% target' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
      <ActivityGauge value={92} label="Retention" sublabel="↑ 4% YoY" color="#14853D" />
      <ActivityGauge value={68} label="Loss Ratio" sublabel="vs 70% target" color="#002C77" />
      <ActivityGauge value={41} label="Digital" sublabel="Adoption Rate" color="#009DE0" />
      <ActivityGauge value={87} label="Compliance" color="#00968F" />
    </div>
  ),
}
