import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = { args: { message: 'Action completed successfully.', variant: 'default' } }
export const Success: Story = { args: { message: 'Your changes have been saved.', variant: 'success' } }
export const Danger: Story = { args: { message: 'Something went wrong. Please try again.', variant: 'danger' } }
export const Warning: Story = { args: { message: 'Session expiring soon.', variant: 'warning' } }
export const Dismissible: Story = { args: { message: 'Click × to dismiss.', variant: 'default', onDismiss: () => {} } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Toast message="Default notification" variant="default" />
      <Toast message="Successfully saved." variant="success" />
      <Toast message="An error occurred." variant="danger" />
      <Toast message="Please review your input." variant="warning" />
    </div>
  ),
}
