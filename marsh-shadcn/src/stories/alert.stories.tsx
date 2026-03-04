import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle, Info } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Info className="h-4 w-4" />
      <AlertTitle>Policy Update</AlertTitle>
      <AlertDescription>Your coverage renewal is due in 30 days. Please review your policy details.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Risk Alert</AlertTitle>
      <AlertDescription>A high-risk event has been detected in your coverage area. Contact your advisor immediately.</AlertDescription>
    </Alert>
  ),
}
