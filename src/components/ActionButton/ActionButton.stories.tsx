import type { Meta, StoryObj } from '@storybook/react'
import { ActionButton } from './ActionButton'

const meta: Meta<typeof ActionButton> = {
  title: 'Components/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ActionButton>

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const Primary: Story = { args: { children: 'Add Policy', variant: 'primary' } }
export const WithIcon: Story = { args: { children: 'New Claim', variant: 'primary', icon: <PlusIcon /> } }
export const Secondary: Story = { args: { children: 'Export', variant: 'secondary' } }
export const Danger: Story = { args: { children: 'Delete Record', variant: 'danger' } }
export const Loading: Story = { args: { children: 'Saving...', variant: 'primary', loading: true } }
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ActionButton size="small">Small</ActionButton>
      <ActionButton size="medium">Medium</ActionButton>
      <ActionButton size="large">Large</ActionButton>
    </div>
  ),
}
