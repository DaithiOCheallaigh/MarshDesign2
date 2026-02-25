import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './Section'

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Section>

export const WithTitle: Story = {
  render: () => (
    <Section title="Policy Overview" description="Manage and review all active policies for your organisation.">
      <div style={{ padding: 24, background: 'var(--color-gray-50)', borderRadius: 8, fontFamily: 'var(--font-family)', fontSize: 14 }}>
        Section content goes here
      </div>
    </Section>
  ),
}

export const Plain: Story = {
  render: () => (
    <Section>
      <div style={{ padding: 24, background: 'var(--color-gray-50)', borderRadius: 8, fontFamily: 'var(--font-family)', fontSize: 14 }}>
        Section without a title
      </div>
    </Section>
  ),
}
