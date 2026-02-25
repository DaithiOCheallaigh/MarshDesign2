import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './Box'

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: () => (
    <Box p={24} bg="var(--color-gray-50)" radius="medium" border>
      <p style={{ margin: 0, fontFamily: 'var(--font-family)', fontSize: 14 }}>A basic Box with padding, background, radius and border.</p>
    </Box>
  ),
}

export const WithShadow: Story = {
  render: () => (
    <Box p={24} bg="var(--color-white)" radius="medium" shadow="md">
      <p style={{ margin: 0, fontFamily: 'var(--font-family)', fontSize: 14 }}>A Box with a medium shadow.</p>
    </Box>
  ),
}
