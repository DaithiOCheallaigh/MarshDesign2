import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = { args: { label: 'Volume', defaultValue: 50, min: 0, max: 100 } }
export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState(30)
    return <Slider label="Coverage" value={val} min={0} max={100} onChange={e => setVal(Number(e.target.value))} />
  },
}
export const Disabled: Story = { args: { label: 'Disabled', defaultValue: 40, disabled: true } }
