import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Analytics/BarChart',
  component: BarChart,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof BarChart>

const data = [
  { region: 'London',    property: 320, casualty: 180, marine: 90 },
  { region: 'New York',  property: 480, casualty: 260, marine: 60 },
  { region: 'Singapore', property: 210, casualty: 140, marine: 200 },
  { region: 'Dubai',     property: 150, casualty: 95,  marine: 130 },
  { region: 'Paris',     property: 290, casualty: 175, marine: 45 },
]

export const Grouped: Story = {
  args: {
    data,
    xKey: 'region',
    title: 'Premium by Region & Line',
    series: [
      { key: 'property', label: 'Property' },
      { key: 'casualty', label: 'Casualty' },
      { key: 'marine',   label: 'Marine' },
    ],
  },
}

export const Stacked: Story = {
  args: {
    data,
    xKey: 'region',
    title: 'Stacked Premium by Region',
    stacked: true,
    series: [
      { key: 'property', label: 'Property' },
      { key: 'casualty', label: 'Casualty' },
      { key: 'marine',   label: 'Marine' },
    ],
  },
}

export const Horizontal: Story = {
  args: {
    data,
    xKey: 'region',
    title: 'Horizontal Bar Chart',
    layout: 'vertical',
    series: [{ key: 'property', label: 'Property Premium' }],
  },
}
