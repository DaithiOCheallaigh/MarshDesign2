import type { Meta, StoryObj } from '@storybook/react'
import { Callout } from './Callout'

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Callout>

export const Info: Story = { args: { variant: 'info', title: 'Note', children: 'This feature is currently in beta.' } }
export const Success: Story = { args: { variant: 'success', title: 'Tip', children: 'Use keyboard shortcuts to work faster.' } }
export const Warning: Story = { args: { variant: 'warning', title: 'Important', children: 'Your session will expire in 10 minutes.' } }
export const Danger: Story = { args: { variant: 'danger', title: 'Action Required', children: 'Please update your payment details.' } }
export const TitleOnly: Story = { args: { variant: 'info', title: 'Read-only mode is active.' } }
