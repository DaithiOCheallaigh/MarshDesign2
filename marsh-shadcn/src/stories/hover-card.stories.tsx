import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Policy P-2024-001</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Commercial Property</h4>
            <Badge>Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Coverage: $2,500,000 · Renewal: Dec 2025</p>
          <p className="text-sm text-muted-foreground">Holder: Acme Corporation</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
