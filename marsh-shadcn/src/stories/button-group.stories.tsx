import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
}

export const IconGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon"><AlignLeft /></Button>
      <Button variant="outline" size="icon"><AlignCenter /></Button>
      <Button variant="outline" size="icon"><AlignRight /></Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Property</Button>
      <Button variant="outline">Marine</Button>
      <Button variant="outline">Aviation</Button>
    </ButtonGroup>
  ),
}
