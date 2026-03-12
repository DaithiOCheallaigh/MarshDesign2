import type { Preview } from '@storybook/react'
import '../src/tokens/tokens.css'
import '../src/tokens/reset.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'gray', value: '#F0F0F0' },
        { name: 'dark', value: '#202020' },
      ],
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Sub Atomic', 'Components', 'Prototypes', '*'],
      },
    },
  },
}

export default preview
