import type { Meta, StoryObj } from '@storybook/react-vite'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Carousel>

const coverageTypes = ['Property', 'Marine', 'Aviation', 'Liability', 'Cyber', 'D&O']

export const Default: Story = {
  render: () => (
    <div className="px-12 max-w-sm">
      <Carousel>
        <CarouselContent>
          {coverageTypes.map((type) => (
            <CarouselItem key={type}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{type}</div>
                    <div className="text-sm text-muted-foreground mt-1">Coverage available</div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}
