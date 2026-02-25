import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SortToast, type SortDirection } from './SortToast'

const meta: Meta<typeof SortToast> = {
  title: 'Components/SortToast',
  component: SortToast,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SortToast>

export const Ascending: Story = { args: { column: 'Premium', direction: 'asc' } }
export const Descending: Story = { args: { column: 'Effective Date', direction: 'desc' } }
export const Interactive: Story = {
  render: () => {
    const [dir, setDir] = useState<SortDirection>('asc')
    return (
      <SortToast
        column="Policy Number"
        direction={dir}
        onToggle={() => setDir(d => d === 'asc' ? 'desc' : 'asc')}
        onClear={() => setDir('none')}
      />
    )
  },
}
