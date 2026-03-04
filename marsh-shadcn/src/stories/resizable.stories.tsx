import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 max-w-lg rounded-lg border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Policy List</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Policy Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="h-64 max-w-sm rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Summary</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
