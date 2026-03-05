import type { Meta, StoryObj } from '@storybook/react'
import { DropdownInput } from './DropdownInput'

const meta: Meta<typeof DropdownInput> = {
  title: 'Components/DropdownInput',
  component: DropdownInput,
  tags: ['autodocs'],
  // Extra bottom padding so the dropdown is never clipped by the canvas
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 280, minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof DropdownInput>

const options = [
  { value: 'ldn', label: 'London' },
  { value: 'nyc', label: 'New York' },
  { value: 'sgp', label: 'Singapore' },
  { value: 'hkg', label: 'Hong Kong' },
  { value: 'dxb', label: 'Dubai' },
  { value: 'par', label: 'Paris' },
]

export const Default: Story = {
  args: { options, label: 'Office Location', placeholder: 'Search locations...' },
}
