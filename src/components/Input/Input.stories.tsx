import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: 'Policy Number', placeholder: 'POL-2024-00000' } }
export const WithHint: Story = { args: { label: 'Email', type: 'email', placeholder: 'name@company.com', hint: 'We will never share your email.' } }
export const WithError: Story = { args: { label: 'Premium', placeholder: '0.00', error: 'Must be a valid amount' } }
export const WithPrefix: Story = { args: { label: 'Amount', placeholder: '0.00', prefix: '$' } }
export const WithSuffix: Story = { args: { label: 'Weight', placeholder: '0', suffix: 'kg' } }
export const Disabled: Story = { args: { label: 'Reference', value: 'REF-001', disabled: true } }
