import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/ui/progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Risk Assessment</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Claims Processed</span>
          <span>40%</span>
        </div>
        <Progress value={40} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Document Upload</span>
          <span>90%</span>
        </div>
        <Progress value={90} />
      </div>
    </div>
  ),
}
