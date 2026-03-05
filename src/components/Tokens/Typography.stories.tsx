import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

// Source: Marsh Brand Design Guide §2 Typography (March 2026)

const HIERARCHY = [
  {
    name: 'H1 / Page title',
    size: '32–40px',
    weight: 'Marsh Serif Regular (400)',
    token: '--font-display',
    usage: 'Headlines, section titles, large quotes, key statistics',
    style: { fontSize: 36, fontWeight: 400, fontFamily: 'Georgia, serif' },
  },
  {
    name: 'H2 / Section header',
    size: '24–28px',
    weight: 'Marsh Serif / Noto Sans Bold (700)',
    token: '--font-display / --font-family',
    usage: 'Section headers',
    style: { fontSize: 26, fontWeight: 700 },
  },
  {
    name: 'H3 / Sub-section',
    size: '18–22px',
    weight: 'Noto Sans Bold / Medium',
    token: '--font-family',
    usage: 'Sub-sections, card titles',
    style: { fontSize: 20, fontWeight: 700 },
  },
  {
    name: 'H4 / Component title',
    size: '16–18px',
    weight: 'Noto Sans Medium (500)',
    token: '--font-size-header-lg',
    usage: 'Component titles, widget headings',
    style: { fontSize: 17, fontWeight: 500 },
  },
  {
    name: 'Body / Paragraph',
    size: '14–16px',
    weight: 'Noto Sans Regular (400)',
    token: '--font-size-base',
    usage: 'Body text. Line-height 1.5–1.6',
    style: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
  },
  {
    name: 'Button text',
    size: '14px',
    weight: 'Noto Sans Medium (500) or Bold (700)',
    token: '--font-size-base',
    usage: 'Button labels — sentence case only',
    style: { fontSize: 14, fontWeight: 500 },
  },
  {
    name: 'Caption / Label',
    size: '12–13px',
    weight: 'Noto Sans Regular (400) / Light (300)',
    token: '--font-size-sm',
    usage: 'Helper text, form labels, legends',
    style: { fontSize: 12, fontWeight: 400 },
  },
  {
    name: 'Navigation',
    size: '14px',
    weight: 'Noto Sans Regular (400)',
    token: '--font-size-base',
    usage: 'Navigation items',
    style: { fontSize: 14, fontWeight: 400 },
  },
] as const

function Typography() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Typography</h1>
      <p className={styles.subtitle}>
        Marsh's type system pairs <strong>Marsh Serif</strong> (custom brand typeface) for headlines
        with <strong>Noto Sans</strong> for all body and supporting text.
        Always use <em>sentence case</em> — never all-caps (except the Marsh logomark).
      </p>

      <h2 className={styles.sectionTitle}>Font Families</h2>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Family</th>
            <th>Token</th>
            <th>Use cases</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Display / Headline</strong></td>
            <td style={{ fontFamily: 'Georgia, serif', fontSize: 18 }}>Marsh Serif (Georgia fallback)</td>
            <td className={styles.typeMeta}>--font-display</td>
            <td className={styles.typeMeta}>Headlines, section titles, large quotes, key statistics, intro statements</td>
          </tr>
          <tr>
            <td><strong>Body / UI</strong></td>
            <td style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 14 }}>Noto Sans</td>
            <td className={styles.typeMeta}>--font-family</td>
            <td className={styles.typeMeta}>All body text, labels, buttons, navigation, data</td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>Typographic Hierarchy</h2>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th style={{ width: 160 }}>Name</th>
            <th style={{ width: 140 }}>Size / Weight</th>
            <th>Sample</th>
            <th style={{ width: 140 }}>Token</th>
          </tr>
        </thead>
        <tbody>
          {HIERARCHY.map((h) => (
            <tr key={h.name}>
              <td>
                <strong>{h.name}</strong>
                <div className={styles.typeMeta} style={{ marginTop: 2 }}>{h.usage}</div>
              </td>
              <td className={styles.typeMeta}>
                {h.size}
                <br />
                {h.weight}
              </td>
              <td
                style={{
                  fontFamily: ('fontFamily' in h.style ? h.style.fontFamily : undefined) ?? 'var(--font-family)',
                  ...h.style,
                  color: '#000f47',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </td>
              <td className={styles.typeMeta}>{h.token}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>Weights</h2>
      <table className={styles.typeTable}>
        <thead>
          <tr>
            <th>Weight</th>
            <th>Value</th>
            <th>Token</th>
            <th>Sample (14px)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Light', value: 300, token: '--font-weight-light', note: 'Use at 14px+ only' },
            { name: 'Regular', value: 400, token: '--font-weight-regular', note: '' },
            { name: 'Medium', value: 500, token: '--font-weight-medium', note: 'Default for UI' },
            { name: 'Bold', value: 700, token: '--font-weight-bold', note: '' },
          ].map((w) => (
            <tr key={w.name}>
              <td>
                <strong>{w.name}</strong>
                {w.note && <div className={styles.typeMeta}>{w.note}</div>}
              </td>
              <td className={styles.typeMeta}>{w.value}</td>
              <td className={styles.typeMeta}>{w.token}</td>
              <td style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: w.value, color: '#000f47' }}>
                The quick brown fox jumps over the lazy dog
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.note}>
        <strong>Typography rules:</strong> Use sentence case across ALL communications.
        Text colours: Midnight Blue on light backgrounds, White or Sky Blue on dark.
        Noto Sans Light (300) should only be used at 14px+ for readability.
        Maintain consistent line spacing (1.5–1.6), letter-spacing, and alignment.
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Fonts & Hierarchy',
  component: Typography,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
