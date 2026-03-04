import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Table>

const policies = [
  { id: 'P-001', type: 'Property', holder: 'Acme Corp', premium: '$12,400', status: 'Active' },
  { id: 'P-002', type: 'Marine', holder: 'Global Shipping Ltd', premium: '$8,200', status: 'Active' },
  { id: 'P-003', type: 'Aviation', holder: 'Sky Transport', premium: '$31,000', status: 'Pending' },
  { id: 'P-004', type: 'Liability', holder: 'Tech Solutions', premium: '$5,600', status: 'Expired' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  Active: 'default',
  Pending: 'secondary',
  Expired: 'destructive',
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Active policies — Q1 2025</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Policy ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Policy Holder</TableHead>
          <TableHead>Annual Premium</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-mono text-xs">{p.id}</TableCell>
            <TableCell>{p.type}</TableCell>
            <TableCell>{p.holder}</TableCell>
            <TableCell>{p.premium}</TableCell>
            <TableCell><Badge variant={statusVariant[p.status]}>{p.status}</Badge></TableCell>
            <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
