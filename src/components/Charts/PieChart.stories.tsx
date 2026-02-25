import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Analytics/PieChart',
  component: PieChart,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PieChart>

const data = [
  { label: 'Property',  value: 38 },
  { label: 'Casualty',  value: 24 },
  { label: 'Marine',    value: 16 },
  { label: 'Aviation',  value: 10 },
  { label: 'Cyber',     value: 8  },
  { label: 'Other',     value: 4  },
]

export const Default: Story = {
  args: { data, title: 'Premium Mix by Line of Business' },
}

export const Donut: Story = {
  args: { data, title: 'Premium Mix (Donut)', donut: true },
}
