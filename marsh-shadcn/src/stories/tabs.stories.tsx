import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="claims">Claims</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader><CardTitle>Policy Overview</CardTitle><CardDescription>Your active coverage summary</CardDescription></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Property coverage active. Next renewal: December 2025.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="claims">
        <Card>
          <CardHeader><CardTitle>Claims</CardTitle><CardDescription>View and submit claims</CardDescription></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">No open claims. Submit a new claim to get started.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="documents">
        <Card>
          <CardHeader><CardTitle>Documents</CardTitle><CardDescription>Policy documents and certificates</CardDescription></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">3 documents available for download.</p></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="expired">Expired</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>
      <TabsContent value="active"><p className="text-sm text-muted-foreground pt-4">4 active policies</p></TabsContent>
      <TabsContent value="expired"><p className="text-sm text-muted-foreground pt-4">2 expired policies</p></TabsContent>
      <TabsContent value="pending"><p className="text-sm text-muted-foreground pt-4">1 pending renewal</p></TabsContent>
    </Tabs>
  ),
}
