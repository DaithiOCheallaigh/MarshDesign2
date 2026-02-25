import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MultiSelect>

const options = [
  { value: 'property', label: 'Property' },
  { value: 'casualty', label: 'Casualty' },
  { value: 'marine', label: 'Marine' },
  { value: 'aviation', label: 'Aviation' },
  { value: 'cyber', label: 'Cyber' },
  { value: 'life', label: 'Life' },
]

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([])
    return <MultiSelect options={options} value={val} onChange={setVal} label="Lines of Business" placeholder="Select lines..." />
  },
}

export const WithSelection: Story = {
  render: () => {
    const [val, setVal] = useState(['property', 'marine'])
    return <MultiSelect options={options} value={val} onChange={setVal} label="Lines of Business" />
  },
}
