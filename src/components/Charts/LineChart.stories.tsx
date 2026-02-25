import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Analytics/LineChart',
  component: LineChart,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof LineChart>

const data = [
  { month: 'Jan', premium: 420000, claims: 180000 },
  { month: 'Feb', premium: 380000, claims: 210000 },
  { month: 'Mar', premium: 510000, claims: 160000 },
  { month: 'Apr', premium: 490000, claims: 230000 },
  { month: 'May', premium: 620000, claims: 195000 },
  { month: 'Jun', premium: 580000, claims: 270000 },
]

export const Default: Story = {
  args: {
    data,
    xKey: 'month',
    title: 'Premium vs Claims (YTD)',
    series: [
      { key: 'premium', label: 'Gross Premium' },
      { key: 'claims', label: 'Claims Paid' },
    ],
  },
}

export const SingleLine: Story = {
  args: {
    data,
    xKey: 'month',
    title: 'Gross Written Premium',
    series: [{ key: 'premium', label: 'GWP', color: '#002C77' }],
    showLegend: false,
  },
}
