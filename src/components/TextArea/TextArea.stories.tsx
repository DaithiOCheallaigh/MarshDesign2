import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = { args: { label: 'Description', placeholder: 'Enter description...' } }
export const WithHint: Story = { args: { label: 'Notes', placeholder: 'Add notes...', hint: 'Max 500 characters' } }
export const WithError: Story = { args: { label: 'Comments', placeholder: 'Add comments...', error: 'This field is required' } }
export const Disabled: Story = { args: { label: 'Reason', placeholder: 'Disabled textarea', disabled: true } }
