import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Grid>

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 16, background: 'var(--color-blue-tint)', borderRadius: 4, fontFamily: 'var(--font-family)', fontSize: 14, textAlign: 'center' }}>{children}</div>
)

export const ThreeColumns: Story = {
  render: () => (
    <Grid columns={3} gap={16}>
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>Col {i + 1}</Cell>)}
    </Grid>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <Grid columns={2} gap={16}>
      {Array.from({ length: 4 }, (_, i) => <Cell key={i}>Item {i + 1}</Cell>)}
    </Grid>
  ),
}

export const AutoFill: Story = {
  render: () => (
    <Grid columns="repeat(auto-fill, minmax(140px, 1fr))" gap={16}>
      {Array.from({ length: 8 }, (_, i) => <Cell key={i}>Card {i + 1}</Cell>)}
    </Grid>
  ),
}
