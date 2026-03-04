import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground text-sm">16 / 9</span>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1} className="bg-primary/10 rounded-lg flex items-center justify-center">
        <span className="text-primary text-sm font-medium">1 / 1</span>
      </AspectRatio>
    </div>
  ),
}
