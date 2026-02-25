import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from './RadarChart'

const meta: Meta<typeof RadarChart> = {
  title: 'Analytics/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RadarChart>

const data = [
  { category: 'Claims Handling',  score: 80, benchmark: 70 },
  { category: 'Pricing',          score: 65, benchmark: 72 },
  { category: 'Risk Assessment',  score: 90, benchmark: 75 },
  { category: 'Client Retention', score: 78, benchmark: 68 },
  { category: 'Digital Adoption', score: 55, benchmark: 60 },
  { category: 'Compliance',       score: 88, benchmark: 82 },
]

export const Default: Story = {
  args: {
    data,
    angleKey: 'category',
    title: 'Performance vs Benchmark',
    series: [
      { key: 'score',     label: 'Our Score' },
      { key: 'benchmark', label: 'Market Benchmark', color: '#009DE0' },
    ],
  },
}
