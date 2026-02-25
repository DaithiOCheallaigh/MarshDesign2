import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const longContent = Array.from({ length: 20 }, (_, i) => (
  <div key={i} style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 14 }}>
    Row item {i + 1} — Policy POL-2024-{String(i + 1).padStart(5, '0')}
  </div>
))

export const Vertical: Story = {
  render: () => <ScrollArea maxHeight={200}>{longContent}</ScrollArea>,
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea direction="horizontal" maxWidth={400}>
      <div style={{ display: 'flex', gap: 8, width: 800, padding: 8 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ minWidth: 120, padding: '8px 16px', background: '#F4F8FF', borderRadius: 4, fontSize: 14 }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
