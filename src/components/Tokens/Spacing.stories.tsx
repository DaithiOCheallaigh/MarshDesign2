import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

// Source: Marsh Brand Design Guide §5.1 Recommended Spacing Scale (March 2026)

const SEMANTIC_SCALE = [
  { name: 'xs', token: '--spacing-xs', px: 4, usage: 'Icon inner padding, tight label spacing' },
  { name: 'sm', token: '--spacing-sm', px: 8, usage: 'Chip/badge padding, inline spacing' },
  { name: 'md', token: '--spacing-md', px: 16, usage: 'Button padding (horizontal), card inner padding' },
  { name: 'lg', token: '--spacing-lg', px: 24, usage: 'Section spacing, card gap, form group spacing' },
  { name: 'xl', token: '--spacing-xl', px: 32, usage: 'Panel padding, header height, modal padding' },
  { name: '2xl', token: '--spacing-2xl', px: 48, usage: 'Page section margin, hero content padding' },
  { name: '3xl', token: '--spacing-3xl', px: 64, usage: 'Large section separators, hero padding' },
  { name: '4xl', token: '--spacing-4xl', px: 80, usage: 'Full-bleed section margins (1920px brand spec)' },
] as const

// Legacy numeric scale kept for backward compat
const LEGACY_SCALE = [
  { name: '--space-2xs', px: 2 },
  { name: '--space-xs', px: 4 },
  { name: '--space-s', px: 8 },
  { name: '--space-m', px: 12 },
  { name: '--space-l', px: 16 },
  { name: '--space-xl', px: 24 },
  { name: '--space-2xl', px: 32 },
  { name: '--space-3xl', px: 40 },
  { name: '--space-4xl', px: 48 },
  { name: '--space-6xl', px: 64 },
  { name: '--space-8xl', px: 80 },
] as const

const MAX_BAR = 80

function Spacing() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Spacing &amp; Sizing</h1>
      <p className={styles.subtitle}>
        Marsh's approach to spacing is generous and deliberate. Consistent spacing creates rhythm and hierarchy.
        The system is built on an 8px base scale, derived from the brand's digital margin and gutter proportions.
      </p>

      <h2 className={styles.sectionTitle}>Semantic Spacing Scale</h2>
      <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, color: '#7b7974', marginBottom: 16 }}>
        Prefer semantic tokens (<code>--spacing-xs</code>, <code>--spacing-md</code>, etc.) in new components.
      </p>

      {/* Header */}
      <div className={styles.spaceRow} style={{ borderBottom: '2px solid var(--color-neutral-500)' }}>
        <span className={styles.spaceLabel} style={{ fontWeight: 500, color: 'var(--color-neutral-750)', fontSize: 12 }}>Token</span>
        <div style={{ flex: 1, fontSize: 12, fontWeight: 500, color: 'var(--color-neutral-750)' }}>Visual</div>
        <span className={styles.spaceMeta} style={{ fontWeight: 500, color: 'var(--color-neutral-750)', width: 200 }}>Value · Usage</span>
      </div>

      {SEMANTIC_SCALE.map((s) => (
        <div key={s.name} className={styles.spaceRow}>
          <span className={styles.spaceLabel} style={{ fontFamily: 'monospace', fontSize: 11 }}>{s.token}</span>
          <div style={{ flex: 1 }}>
            <div className={styles.spaceBar} style={{ width: `${(s.px / MAX_BAR) * 100}%`, minWidth: 4, backgroundColor: '#ffbf00' }} />
          </div>
          <span className={styles.spaceMeta} style={{ width: 200, whiteSpace: 'normal', fontSize: 11, lineHeight: 1.4 }}>
            <strong>{s.px}px</strong> — {s.usage}
          </span>
        </div>
      ))}

      <h2 className={styles.sectionTitle}>Button Spacing Guidance</h2>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th>Context</th>
            <th>Vertical padding</th>
            <th>Horizontal padding</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Button inner (vertical)</td><td className={styles.typeMeta}>12px (--spacing-md adjusted)</td><td className={styles.typeMeta}>—</td></tr>
          <tr><td>Button inner (horizontal)</td><td className={styles.typeMeta}>—</td><td className={styles.typeMeta}>20–24px (--spacing-lg)</td></tr>
          <tr><td>Form input padding</td><td className={styles.typeMeta}>10–12px</td><td className={styles.typeMeta}>14–16px (--spacing-md)</td></tr>
          <tr><td>Card inner padding</td><td className={styles.typeMeta}>24–32px (--spacing-lg / --spacing-xl)</td><td className={styles.typeMeta}>24–32px</td></tr>
          <tr><td>Panel padding</td><td className={styles.typeMeta}>32px (--spacing-xl)</td><td className={styles.typeMeta}>32px</td></tr>
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>Legacy Tokens (backward compat)</h2>
      <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, color: '#7b7974', marginBottom: 16 }}>
        These tokens remain for existing components. New work should use semantic tokens above.
      </p>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {LEGACY_SCALE.map((s) => (
            <tr key={s.name}>
              <td className={styles.typeMeta}>{s.name}</td>
              <td className={styles.typeMeta}>{s.px}px</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Spacing',
  component: Spacing,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
