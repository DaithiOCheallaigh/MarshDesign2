import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the main content area of the card. It can contain any React content.',
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed? This action cannot be undone.',
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline" size="small">Cancel</Button>
        <Button variant="primary" size="small">Confirm</Button>
      </div>
    ),
  },
}

export const NoPadding: Story = {
  args: { padding: 'none', children: <div style={{ padding: 0, background: '#f4f8ff', borderRadius: 8, height: 120 }} /> },
}
