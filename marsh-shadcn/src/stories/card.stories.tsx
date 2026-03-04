import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import marshLogoWhite from '../../public/marsh-logo-white.png'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Property Policy</CardTitle>
        <CardDescription>Commercial property coverage for your assets</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Coverage limit: $2,500,000 · Renewal: Dec 2025</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Risk Score</CardTitle>
        <CardDescription>Current portfolio assessment</CardDescription>
        <CardAction><Badge>Low Risk</Badge></CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">82/100</div>
        <p className="text-sm text-muted-foreground mt-1">Above industry average</p>
      </CardContent>
    </Card>
  ),
}

export const Branded: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="bg-[#0C103D] px-6 py-5">
        <img src={marshLogoWhite} alt="Marsh" width={434} height={95} className="h-6 w-auto object-contain mb-4" />
        <p className="text-white/80 text-xs uppercase tracking-wider font-medium">Commercial Insurance</p>
        <p className="text-white text-xl font-semibold mt-1">Property Policy</p>
      </div>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground">Coverage limit: $2,500,000 · Renewal: Dec 2025</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      {['Property', 'Marine', 'Aviation', 'Liability'].map((type) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle className="text-base">{type}</CardTitle>
            <CardDescription>Active policy</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">Covered</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
