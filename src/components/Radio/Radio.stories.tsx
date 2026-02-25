import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = { args: { label: 'Option A' } }
export const Checked: Story = { args: { label: 'Selected option', defaultChecked: true } }
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } }

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Radio name="group" label="Option A" defaultChecked />
      <Radio name="group" label="Option B" />
      <Radio name="group" label="Option C" />
      <Radio name="group" label="Disabled" disabled />
    </div>
  ),
}
