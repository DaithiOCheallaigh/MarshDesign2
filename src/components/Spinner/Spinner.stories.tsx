import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['small', 'medium', 'large'] } },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = { args: { size: 'medium' } }
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  ),
}
