import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm">
        <span>Search policies</span>
        <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>New policy</span>
        <KbdGroup><Kbd>Ctrl</Kbd><Kbd>N</Kbd></KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>Export report</span>
        <KbdGroup><Kbd>Ctrl</Kbd><Kbd>E</Kbd></KbdGroup>
      </div>
    </div>
  ),
}
