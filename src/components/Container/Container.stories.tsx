import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Container>

const Inner = () => (
  <div style={{ background: 'var(--color-blue-tint)', borderRadius: 4, padding: 16, fontFamily: 'var(--font-family)', fontSize: 14 }}>
    Container content
  </div>
)

export const Large: Story = { render: () => <Container size="lg"><Inner /></Container> }
export const Medium: Story = { render: () => <Container size="md"><Inner /></Container> }
export const Small: Story = { render: () => <Container size="sm"><Inner /></Container> }
