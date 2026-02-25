import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = { args: { value: 60, label: 'Completion' } }
export const WithPercentage: Story = { args: { value: 75, label: 'Upload progress', showLabel: true } }
export const Low: Story = { args: { value: 15 } }
export const Complete: Story = { args: { value: 100, label: 'Done', showLabel: true } }
