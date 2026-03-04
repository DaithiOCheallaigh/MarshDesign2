import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileText, ChevronRight } from 'lucide-react'
import { ItemGroup, Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemSeparator } from '@/components/ui/item'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Item>

const policies = [
  { id: 'P-001', type: 'Property', status: 'Active' },
  { id: 'P-002', type: 'Marine Cargo', status: 'Active' },
  { id: 'P-003', type: 'Aviation', status: 'Pending' },
]

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-80 rounded-lg border">
      {policies.map((p, i) => (
        <div key={p.id}>
          <Item>
            <ItemContent>
              <ItemTitle>{p.type}</ItemTitle>
              <ItemDescription>{p.id}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant={p.status === 'Active' ? 'default' : 'secondary'}>{p.status}</Badge>
            </ItemActions>
          </Item>
          {i < policies.length - 1 && <ItemSeparator />}
        </div>
      ))}
    </ItemGroup>
  ),
}
