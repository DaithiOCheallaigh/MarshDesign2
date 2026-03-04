import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const policies = Array.from({ length: 20 }, (_, i) => ({
  id: `P-${String(i + 1).padStart(3, '0')}`,
  type: ['Property', 'Marine', 'Aviation', 'Liability', 'Cyber'][i % 5],
  holder: `Client ${i + 1}`,
}))

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">All Policies</h4>
        {policies.map((p, i) => (
          <div key={p.id}>
            <div className="text-sm py-1">
              <span className="font-mono text-xs text-muted-foreground">{p.id}</span>{' '}
              {p.type} · {p.holder}
            </div>
            {i < policies.length - 1 && <Separator className="my-1" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
