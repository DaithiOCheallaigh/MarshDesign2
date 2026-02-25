import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TabNav } from './TabNav'

const meta: Meta<typeof TabNav> = {
  title: 'Components/TabNav',
  component: TabNav,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof TabNav>

const items = [
  { id: 'all', label: 'All', badge: 24 },
  { id: 'active', label: 'Active', badge: 8 },
  { id: 'pending', label: 'Pending', badge: 3 },
  { id: 'closed', label: 'Closed' },
]

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('all')
    return <TabNav items={items} active={active} onChange={setActive} />
  },
}

export const NoBadges: Story = {
  args: {
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'documents', label: 'Documents' },
      { id: 'notes', label: 'Notes' },
    ],
    active: 'overview',
  },
}
