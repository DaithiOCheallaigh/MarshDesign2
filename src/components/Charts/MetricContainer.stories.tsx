import type { Meta, StoryObj } from '@storybook/react'
import { MetricContainer } from './MetricContainer'

const meta: Meta<typeof MetricContainer> = {
  title: 'Analytics/MetricContainer',
  component: MetricContainer,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MetricContainer>

export const Default: Story = {
  args: {
    label: 'Gross Written Premium',
    value: '$4.2M',
    trend: 'up',
    trendValue: '+12.4%',
    description: 'vs last quarter',
  },
}

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <MetricContainer label="GWP" value="$4.2M" unit="" trend="up" trendValue="+12.4%" description="vs Q3 2024" />
      <MetricContainer label="Loss Ratio" value="68" unit="%" trend="down" trendValue="-2.1pp" description="vs Q3 2024" />
      <MetricContainer label="Policies" value="1,847" trend="up" trendValue="+89" description="new this quarter" />
      <MetricContainer label="Retention" value="91" unit="%" trend="neutral" trendValue="→ flat" description="vs Q3 2024" />
    </div>
  ),
}
