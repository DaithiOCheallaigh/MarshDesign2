import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InputOTP>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label>Verification Code</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}
