import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Flex>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '12px 20px', background: 'var(--color-blue-tint)', borderRadius: 4, fontFamily: 'var(--font-family)', fontSize: 14 }}>{children}</div>
)

export const Row: Story = {
  render: () => (
    <Flex gap={12} align="center">
      <Box>Item 1</Box><Box>Item 2</Box><Box>Item 3</Box>
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={8}>
      <Box>Item 1</Box><Box>Item 2</Box><Box>Item 3</Box>
    </Flex>
  ),
}

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="space-between" align="center">
      <Box>Left</Box><Box>Right</Box>
    </Flex>
  ),
}
