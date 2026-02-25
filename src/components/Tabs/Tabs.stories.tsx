import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tabs>

const sampleTabs = [
  { id: 'overview', label: 'Overview', content: <p>Overview content goes here.</p> },
  { id: 'details', label: 'Details', content: <p>Detailed information is shown here.</p> },
  { id: 'history', label: 'History', content: <p>Activity history is listed here.</p> },
]

export const Default: Story = {
  args: { tabs: sampleTabs, defaultTab: 'overview' },
}

export const SecondTabActive: Story = {
  args: { tabs: sampleTabs, defaultTab: 'details' },
}
