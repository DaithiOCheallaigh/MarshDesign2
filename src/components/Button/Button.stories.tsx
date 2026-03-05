import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Buttons allow users to trigger actions. The Marsh design system defines four button variants aligned with the brand's colour and interaction principles.

**Usage guidelines:**
- Use **Primary (Gold)** for the single main call-to-action on a page or panel
- Use **Secondary (Midnight Blue)** for supporting or alternative actions
- Use **Ghost** for low-emphasis actions or in toolbars
- Use **Destructive** only for irreversible delete/remove actions
- Gold is the action colour — use it sparingly so it retains focus
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Get a Quote',
    variant: 'primary',
    size: 'medium',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
    size: 'medium',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
    size: 'medium',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Remove from Team',
    variant: 'destructive',
    size: 'medium',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All variants use the same disabled appearance: Neutral 500 background, Neutral 250 text.',
      },
    },
  },
}

export const WithLeadingIcon: Story = {
  args: {
    children: 'Download Report',
    variant: 'primary',
    size: 'medium',
    iconLeading: (
      <svg viewBox="0 -960 960 960" fill="currentColor" width="20" height="20">
        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
      </svg>
    ),
  },
}

export const WithTrailingIcon: Story = {
  args: {
    children: 'Next Step',
    variant: 'secondary',
    size: 'medium',
    iconTrailing: (
      <svg viewBox="0 -960 960 960" fill="currentColor" width="20" height="20">
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
      </svg>
    ),
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes are available. Medium is the default for most UI contexts.',
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 12, color: '#7b7974', marginBottom: 8 }}>Primary — Gold CTA</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 12, color: '#7b7974', marginBottom: 8 }}>Secondary — Midnight Blue</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="secondary" size="small">Small</Button>
          <Button variant="secondary" size="medium">Medium</Button>
          <Button variant="secondary" size="large">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 12, color: '#7b7974', marginBottom: 8 }}>Ghost / Outline</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="ghost" size="small">Small</Button>
          <Button variant="ghost" size="medium">Medium</Button>
          <Button variant="ghost" size="large">Large</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 12, color: '#7b7974', marginBottom: 8 }}>Destructive</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="destructive" size="small">Remove</Button>
          <Button variant="destructive" size="medium">Remove from Team</Button>
          <Button variant="destructive" size="large">Delete Account</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all variants across all sizes with their disabled states.',
      },
    },
  },
}

export const ColourTokens: Story = {
  render: () => (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#000f47', color: '#fff' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Variant</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Background</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Text</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Hover</th>
          </tr>
        </thead>
        <tbody>
          {[
            { variant: 'Primary (CTA)', bg: '#ffbf00 — Gold 750', text: '#000f47 — Midnight Blue', hover: '#cb7e03 — Gold 1000' },
            { variant: 'Secondary', bg: '#000f47 — Midnight Blue', text: '#ffffff — White', hover: '#0b1a60' },
            { variant: 'Ghost', bg: 'Transparent', text: '#000f47 — Midnight Blue', hover: '#ceecff — Sky Blue bg' },
            { variant: 'Destructive', bg: '#c53532 — Danger Crimson', text: '#ffffff — White', hover: '#a82b28' },
            { variant: 'Disabled (all)', bg: '#b9b6b1 — Neutral 500', text: '#f7f3ee — Neutral 250', hover: 'N/A' },
          ].map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f7f3ee' : '#fff' }}>
              <td style={{ padding: '8px 12px' }}><strong>{row.variant}</strong></td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{row.bg}</td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{row.text}</td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{row.hover}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Colour token reference for all button variants per the Marsh Brand Design Guide §7.2.',
      },
    },
  },
}
