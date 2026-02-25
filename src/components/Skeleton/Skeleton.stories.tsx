import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = { args: { variant: 'text', width: 200 } }
export const Rect: Story = { args: { variant: 'rect', width: 300, height: 120 } }
export const Circle: Story = { args: { variant: 'circle' } }

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Skeleton variant="rect" height={180} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="90%" />
    </div>
  ),
}
