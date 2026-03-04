import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

const lightTheme = create({
  base: 'light',
  brandTitle: 'Marsh Design System',
  brandImage: './marsh-logo-navy.png',
  brandUrl: 'https://www.marsh.com',
  brandTarget: '_blank',
})

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Marsh Design System',
  brandImage: './marsh-logo-white.png',
  brandUrl: 'https://www.marsh.com',
  brandTarget: '_blank',
})

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
})
