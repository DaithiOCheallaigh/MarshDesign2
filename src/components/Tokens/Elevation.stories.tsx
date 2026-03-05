import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

// Source: Marsh Brand Design Guide §5.3 Elevation / Shadow (March 2026)

const LEVELS = [
  {
    name: 'Level 0 (flat)',
    token: '—',
    value: 'No shadow — use border 1px Neutral 500 (#b9b6b1)',
    shadow: 'none',
    border: '1px solid #b9b6b1',
    usage: 'Default cards, form inputs, flat panels',
  },
  {
    name: 'Level 1 (raised)',
    token: '--shadow-sm',
    value: '0 1px 4px rgba(0,15,71,0.08)',
    shadow: '0 1px 4px rgba(0,15,71,0.08)',
    border: 'none',
    usage: 'Raised cards, dropdowns',
  },
  {
    name: 'Level 2 (overlay)',
    token: '--shadow-md',
    value: '0 4px 16px rgba(0,15,71,0.14)',
    shadow: '0 4px 16px rgba(0,15,71,0.14)',
    border: 'none',
    usage: 'Modals, overlays, menus',
  },
  {
    name: 'Level 3 (floating)',
    token: '--shadow-lg',
    value: '0 8px 24px rgba(0,15,71,0.18)',
    shadow: '0 8px 24px rgba(0,15,71,0.18)',
    border: 'none',
    usage: 'Tooltips, popovers, floating elements',
  },
] as const

function Elevation() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Elevation &amp; Shadow</h1>
      <p className={styles.subtitle}>
        The Marsh brand explicitly prohibits shadows and effects in iconography and data visualisation.
        For UI components, <strong>prefer borders over box-shadows</strong> to maintain the clean, precise aesthetic.
        Shadows use Midnight Blue (not black) for warmth.
      </p>

      <div className={styles.ruleBox}>
        <strong>Preference:</strong> Borders over shadows · Never use coloured shadows · No gradients or transparency effects
      </div>

      <h2 className={styles.sectionTitle}>Shadow Scale</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {LEVELS.map(level => (
          <div key={level.name} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                width: 120,
                height: 80,
                background: '#fff',
                borderRadius: 8,
                boxShadow: level.shadow,
                border: level.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Noto Sans, sans-serif',
                fontSize: 12,
                color: '#7b7974',
              }}
            >
              {level.name.split(' ')[1]}
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'Noto Sans, sans-serif' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#000f47', marginBottom: 2 }}>{level.name}</div>
              <div style={{ fontSize: 11, color: '#7b7974', fontFamily: 'monospace', marginBottom: 2 }}>{level.token}</div>
              <div style={{ fontSize: 10, color: '#b9b6b1', maxWidth: 160, textAlign: 'center', lineHeight: 1.4 }}>{level.usage}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Token Reference</h2>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th>Level</th>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {LEVELS.map(l => (
            <tr key={l.name}>
              <td><strong>{l.name}</strong></td>
              <td className={styles.typeMeta}>{l.token}</td>
              <td className={styles.typeMeta}>{l.value}</td>
              <td className={styles.typeMeta}>{l.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Elevation',
  component: Elevation,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
