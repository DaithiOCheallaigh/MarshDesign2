import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldSet, FieldLegend, Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Policy Information</FieldLegend>
      <Field>
        <FieldLabel htmlFor="holder">Policy Holder</FieldLabel>
        <Input id="holder" placeholder="Company name" />
        <FieldDescription>The legal entity that owns this policy.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="limit">Coverage Limit</FieldLabel>
        <Input id="limit" type="number" placeholder="2500000" />
        <FieldError>Enter amount in USD without formatting.</FieldError>
      </Field>
    </FieldSet>
  ),
}
