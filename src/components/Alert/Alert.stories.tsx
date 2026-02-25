import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: { variant: 'info', title: 'Information', children: 'This is an informational message.' },
}
export const Success: Story = {
  args: { variant: 'success', title: 'Success', children: 'Your changes have been saved.' },
}
export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning', children: 'Please review before continuing.' },
}
export const Danger: Story = {
  args: { variant: 'danger', title: 'Error', children: 'Something went wrong. Please try again.' },
}
export const Dismissible: Story = {
  args: { variant: 'info', title: 'Dismissible', children: 'Click × to dismiss this alert.', onDismiss: () => {} },
}
export const NoTitle: Story = {
  args: { variant: 'success', children: 'Operation completed successfully.' },
}
