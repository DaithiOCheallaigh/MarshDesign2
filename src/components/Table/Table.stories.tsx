import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import type { Column } from './Table'
import { Badge } from '../Badge'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Table>

type Policy = { id: string; client: string; policy: string; premium: string; status: string }

const columns: Column<Policy>[] = [
  { key: 'client', header: 'Client' },
  { key: 'policy', header: 'Policy Number' },
  { key: 'premium', header: 'Premium' },
  {
    key: 'status',
    header: 'Status',
    render: (row: Policy) => (
      <Badge
        label={row.status}
        variant={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'draft'}
      />
    ),
  },
]

const rows: Policy[] = [
  { id: '1', client: 'Acme Corp', policy: 'POL-001', premium: '$12,450', status: 'Active' },
  { id: '2', client: 'Globex Inc', policy: 'POL-002', premium: '$8,200', status: 'Pending' },
  { id: '3', client: 'Initech', policy: 'POL-003', premium: '$21,000', status: 'Draft' },
  { id: '4', client: 'Umbrella Ltd', policy: 'POL-004', premium: '$5,600', status: 'Active' },
]

export const Default: Story = { args: { columns: columns as Column[], rows } }
