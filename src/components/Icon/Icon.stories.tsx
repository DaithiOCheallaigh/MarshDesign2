import { useState, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
Icons are from the **Google Material Symbols** library, using the **Outlined** style only.

**Brand guidelines (§3.1–3.3):**
- Style: **Outlined ONLY** — never use filled style
- Weight: **300 (Light)**
- Grade: **0**
- Sizes: 24px standard controls · 32px navigation · 48px prominent actions
- Colour on light bg: Midnight Blue (\`#000f47\`)
- Colour on dark bg: White (\`#ffffff\`) or Sky Blue (\`#ceecff\`)
- Do **not** use secondary colours (Gold, Green, Purple) on icons
- Icons must serve a functional purpose — never decorative

**CSS implementation:**
\`\`\`css
.icon {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  font-size: 24px;
  color: #000f47;
}
\`\`\`

**1,385 icons available** from the Marsh-approved icon pack.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name (Material Symbols slug, e.g. "search", "notifications-none")',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Predefined size: sm=20px, md=24px, lg=32px, xl=48px',
    },
    color: {
      control: 'color',
      description: 'Icon fill colour — defaults to currentColor',
    },
    label: {
      control: 'text',
      description: 'Accessible label. If omitted the icon is aria-hidden (decorative).',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'search',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <div style={{ textAlign: 'center', fontFamily: 'Noto Sans, sans-serif', fontSize: 11, color: '#7b7974' }}>
        <Icon name="search" size="sm" color="#000f47" />
        <div style={{ marginTop: 4 }}>sm · 20px</div>
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'Noto Sans, sans-serif', fontSize: 11, color: '#7b7974' }}>
        <Icon name="search" size="md" color="#000f47" />
        <div style={{ marginTop: 4 }}>md · 24px</div>
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'Noto Sans, sans-serif', fontSize: 11, color: '#7b7974' }}>
        <Icon name="search" size="lg" color="#000f47" />
        <div style={{ marginTop: 4 }}>lg · 32px</div>
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'Noto Sans, sans-serif', fontSize: 11, color: '#7b7974' }}>
        <Icon name="search" size="xl" color="#000f47" />
        <div style={{ marginTop: 4 }}>xl · 48px</div>
      </div>
    </div>
  ),
}

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#000f47', padding: 24, borderRadius: 8, display: 'flex', gap: 16 }}>
      <Icon name="notifications-none" size="md" color="#ffffff" label="Notifications" />
      <Icon name="search" size="md" color="#ffffff" label="Search" />
      <Icon name="account-circle" size="md" color="#ceecff" label="Account" />
      <Icon name="settings" size="md" color="#ceecff" label="Settings" />
      <Icon name="help-outline" size="md" color="#ffffff" label="Help" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'On dark (Midnight Blue) backgrounds use White or Sky Blue for icons.',
      },
    },
  },
}

export const CommonIcons: Story = {
  render: () => {
    const groups = [
      {
        label: 'Navigation',
        icons: ['home', 'arrow-back', 'arrow-forward', 'menu', 'close', 'expand-more', 'expand-less', 'chevron-right', 'chevron-left', 'more-vert', 'more-horiz'],
      },
      {
        label: 'Actions',
        icons: ['add', 'remove', 'edit', 'delete', 'save', 'cancel', 'check', 'search', 'filter-list', 'sort', 'refresh', 'download', 'upload', 'share'],
      },
      {
        label: 'Status',
        icons: ['check-circle-outline', 'error-outline', 'warning-amber', 'info', 'help-outline', 'visibility', 'visibility-off', 'lock', 'lock-open', 'verified'],
      },
      {
        label: 'Communication',
        icons: ['mail-lock', 'call', 'chat-bubble-outline', 'notifications-none', 'notifications-off', 'campaign', 'contact-support'],
      },
      {
        label: 'Data',
        icons: ['bar-chart', 'show-chart', 'pie-chart', 'data-exploration', 'table-chart', 'analytics', 'trending-up', 'trending-down'],
      },
      {
        label: 'Files & Media',
        icons: ['folder', 'description', 'attach-file', 'image', 'picture-in-picture', 'cloud-download', 'print'],
      },
    ]

    return (
      <div style={{ fontFamily: 'Noto Sans, sans-serif' }}>
        {groups.map(group => (
          <div key={group.label} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, color: '#7b7974', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {group.label}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.icons.map(name => (
                <div
                  key={name}
                  title={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 8px',
                    background: '#f7f3ee',
                    borderRadius: 4,
                    minWidth: 72,
                    cursor: 'default',
                  }}
                >
                  <Icon name={name} size="md" color="#000f47" />
                  <span style={{ fontSize: 10, color: '#7b7974', textAlign: 'center', wordBreak: 'break-all', maxWidth: 72 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Commonly used icons grouped by category.',
      },
    },
  },
}

// All-icons searchable gallery
const ALL_ICON_NAMES = Object.keys(
  import.meta.glob('/src/icons/*.svg', { eager: false })
).map(path => path.replace('/src/icons/', '').replace('.svg', ''))

export const Library: Story = {
  render: () => {
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return ALL_ICON_NAMES
      return ALL_ICON_NAMES.filter(n => n.includes(q))
    }, [query])

    return (
      <div style={{ fontFamily: 'Noto Sans, sans-serif' }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="search"
            placeholder="Search 1,385 icons…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #b9b6b1',
              borderRadius: 4,
              fontFamily: 'Noto Sans, sans-serif',
              fontSize: 14,
              width: 280,
              outline: 'none',
            }}
          />
          <span style={{ fontSize: 12, color: '#7b7974' }}>
            {filtered.length.toLocaleString()} icon{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
            gap: 8,
            maxHeight: 600,
            overflowY: 'auto',
            padding: 4,
          }}
        >
          {filtered.map(name => (
            <div
              key={name}
              onClick={() => { navigator.clipboard?.writeText(name) }}
              title={`${name} — click to copy`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '10px 6px',
                background: '#f7f3ee',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ceecff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f7f3ee' }}
            >
              <Icon name={name} size="md" color="#000f47" />
              <span style={{ fontSize: 9, color: '#7b7974', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.3, maxWidth: 80 }}>
                {name}
              </span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 11, color: '#7b7974' }}>Click any icon to copy its name to the clipboard.</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Full searchable library of all 1,385 icons from the Marsh-approved Material Symbols pack. Click any icon to copy its name.',
      },
    },
    layout: 'padded',
  },
}
