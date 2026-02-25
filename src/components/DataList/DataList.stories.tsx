import type { Meta, StoryObj } from '@storybook/react'
import { DataList } from './DataList'

const meta: Meta<typeof DataList> = {
  title: 'Components/DataList',
  component: DataList,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DataList>

const items = [
  { label: 'Client', value: 'Acme Corporation' },
  { label: 'Policy Number', value: 'POL-2024-00123' },
  { label: 'Effective Date', value: '01 Jan 2024' },
  { label: 'Premium', value: '$12,450.00' },
  { label: 'Status', value: 'Active' },
]

export const Vertical: Story = { args: { items, layout: 'vertical' } }
export const Horizontal: Story = { args: { items, layout: 'horizontal' } }
