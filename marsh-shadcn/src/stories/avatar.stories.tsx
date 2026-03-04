import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { CircleIcon } from 'lucide-react'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge><CircleIcon className="size-2 fill-green-500 text-green-500" /></AvatarBadge>
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>SM</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
