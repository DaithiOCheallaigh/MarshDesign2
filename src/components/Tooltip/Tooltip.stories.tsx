import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Tooltip content="This is a tooltip" placement="top">
        <Button variant="outline" size="small">Hover me (top)</Button>
      </Tooltip>
    </div>
  ),
}

export const Bottom: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline" size="small">Hover me (bottom)</Button>
      </Tooltip>
    </div>
  ),
}

export const Left: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline" size="small">Hover me (left)</Button>
      </Tooltip>
    </div>
  ),
}

export const Right: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'inline-block' }}>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline" size="small">Hover me (right)</Button>
      </Tooltip>
    </div>
  ),
}
