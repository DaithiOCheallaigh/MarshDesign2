import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, DollarSign, Percent } from 'lucide-react'
import { InputGroup, InputGroupText, InputGroupButton } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InputGroup>

export const WithPrefix: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <InputGroup>
        <InputGroupText data-align="inline-start"><Search className="h-4 w-4 text-muted-foreground" /></InputGroupText>
        <Input placeholder="Search policies..." />
      </InputGroup>
      <InputGroup>
        <InputGroupText data-align="inline-start"><DollarSign className="h-4 w-4 text-muted-foreground" /></InputGroupText>
        <Input type="number" placeholder="Coverage amount" />
      </InputGroup>
      <InputGroup>
        <Input type="number" placeholder="Deductible" />
        <InputGroupText data-align="inline-end"><Percent className="h-4 w-4 text-muted-foreground" /></InputGroupText>
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <Input placeholder="Enter policy number..." />
      <InputGroupButton data-align="inline-end">
        <Button>Search</Button>
      </InputGroupButton>
    </InputGroup>
  ),
}
