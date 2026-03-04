import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: function CalendarDemo() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}

export const RangePicker: Story = {
  render: function CalendarRangeDemo() {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({})
    return (
      <Calendar
        mode="range"
        selected={range as any}
        onSelect={setRange as any}
        className="rounded-lg border"
      />
    )
  },
}
