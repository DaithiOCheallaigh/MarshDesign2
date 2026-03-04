import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'

const premiumData = [
  { month: 'Jan', premium: 186000 },
  { month: 'Feb', premium: 205000 },
  { month: 'Mar', premium: 237000 },
  { month: 'Apr', premium: 173000 },
  { month: 'May', premium: 209000 },
  { month: 'Jun', premium: 264000 },
]

const claimsData = [
  { month: 'Jan', claims: 8 },
  { month: 'Feb', claims: 12 },
  { month: 'Mar', claims: 6 },
  { month: 'Apr', claims: 14 },
  { month: 'May', claims: 9 },
  { month: 'Jun', claims: 11 },
]

const portfolioData = [
  { name: 'Property', value: 45 },
  { name: 'Marine', value: 22 },
  { name: 'Aviation', value: 15 },
  { name: 'Liability', value: 18 },
]

const chartConfig = {
  premium: { label: 'Premium ($)', color: '#0C103D' },
  claims: { label: 'Claims', color: '#C6E8F5' },
}

const meta: Meta = {
  title: 'Components/Chart',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const BarChartStory: Story = {
  name: 'Bar Chart — Monthly Premiums',
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-full max-w-lg">
      <BarChart data={premiumData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="premium" fill="#0C103D" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
}

export const LineChartStory: Story = {
  name: 'Line Chart — Monthly Claims',
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-full max-w-lg">
      <LineChart data={claimsData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="claims" stroke="#0C103D" strokeWidth={2} dot={{ fill: '#0C103D' }} />
      </LineChart>
    </ChartContainer>
  ),
}

export const PieChartStory: Story = {
  name: 'Pie Chart — Portfolio Mix',
  render: () => {
    const colors = ['#0C103D', '#C6E8F5', '#4A6FA5', '#8BBBD9']
    return (
      <ChartContainer config={{}} className="h-64 w-full max-w-sm">
        <PieChart>
          <Pie data={portfolioData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
            {portfolioData.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ChartContainer>
    )
  },
}
