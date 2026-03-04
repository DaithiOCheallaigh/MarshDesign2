import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Marsh?</AccordionTrigger>
        <AccordionContent>Marsh is the world's leading insurance broker and risk advisor.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What services do we offer?</AccordionTrigger>
        <AccordionContent>Risk management, insurance, and reinsurance services across all industries.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>Contact your local Marsh office to speak with a risk advisor.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>Coverage Options</AccordionTrigger>
        <AccordionContent>Property, casualty, marine, aviation and more.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Claims Process</AccordionTrigger>
        <AccordionContent>Our dedicated claims team is available 24/7.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
