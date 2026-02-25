import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'danger', 'warning', 'info', 'draft'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { label: 'Default', variant: 'default' } }
export const Success: Story = { args: { label: 'Active', variant: 'success' } }
export const Danger: Story = { args: { label: 'Error', variant: 'danger' } }
export const Warning: Story = { args: { label: 'Warning', variant: 'warning' } }
export const Info: Story = { args: { label: 'Info', variant: 'info' } }
export const Draft: Story = { args: { label: 'Draft', variant: 'draft' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge label="Default" variant="default" />
      <Badge label="Success" variant="success" />
      <Badge label="Danger" variant="danger" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Info" variant="info" />
      <Badge label="Draft" variant="draft" />
    </div>
  ),
}
