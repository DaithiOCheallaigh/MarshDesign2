import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Segmentation } from './Segmentation'

const meta: Meta<typeof Segmentation> = {
  title: 'Components/Segmentation',
  component: Segmentation,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Segmentation>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('month')
    return (
      <Segmentation
        items={[
          { id: 'week', label: 'Week' },
          { id: 'month', label: 'Month' },
          { id: 'year', label: 'Year' },
        ]}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const FourOptions: Story = {
  render: () => {
    const [value, setValue] = useState('all')
    return (
      <Segmentation
        items={[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'pending', label: 'Pending' },
          { id: 'closed', label: 'Closed' },
        ]}
        value={value}
        onChange={setValue}
      />
    )
  },
}
