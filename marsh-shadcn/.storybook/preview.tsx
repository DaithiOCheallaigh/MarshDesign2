import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/app/globals.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground p-8 font-sans antialiased">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
