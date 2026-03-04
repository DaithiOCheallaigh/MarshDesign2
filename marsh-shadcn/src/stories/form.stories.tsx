import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'

const claimSchema = z.object({
  policyNumber: z.string().min(1, 'Policy number is required'),
  incidentType: z.string().min(1, 'Please select an incident type'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  agree: z.boolean().refine((v) => v === true, 'You must confirm the information is accurate'),
})

function ClaimForm() {
  const form = useForm<z.infer<typeof claimSchema>>({
    resolver: zodResolver(claimSchema),
    defaultValues: { policyNumber: '', incidentType: '', description: '', agree: false },
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6 max-w-md">
        <FormField
          control={form.control}
          name="policyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Number</FormLabel>
              <FormControl><Input placeholder="P-2024-001" {...field} /></FormControl>
              <FormDescription>Enter the policy number from your documents.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incidentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="damage">Property Damage</SelectItem>
                  <SelectItem value="theft">Theft / Burglary</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Description</FormLabel>
              <FormControl><Textarea placeholder="Describe what happened..." rows={4} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div>
                <FormLabel>I confirm this information is accurate</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit Claim</Button>
      </form>
    </Form>
  )
}

const meta: Meta = {
  title: 'Components/Form',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const ClaimSubmission: Story = {
  render: () => <ClaimForm />,
}
