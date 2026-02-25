import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['small', 'medium', 'large'] } },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Initials: Story = { args: { initials: 'JD', size: 'medium' } }
export const Small: Story = { args: { initials: 'AB', size: 'small' } }
export const Large: Story = { args: { initials: 'MK', size: 'large' } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="SM" size="small" />
      <Avatar initials="MD" size="medium" />
      <Avatar initials="LG" size="large" />
    </div>
  ),
}
