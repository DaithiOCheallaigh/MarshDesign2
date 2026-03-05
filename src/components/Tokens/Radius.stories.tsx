import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

// Source: Marsh Brand Design Guide §5.2 Border Radius (March 2026)

const RADII = [
  {
    name: 'Subtle',
    token: '--radius-subtle',
    value: '2px',
    usage: 'Badges, chips, status tags',
  },
  {
    name: 'Default',
    token: '--radius-default',
    value: '4px',
    usage: 'Buttons, inputs, tooltips, small cards',
  },
  {
    name: 'Soft',
    token: '--radius-soft',
    value: '8px',
    usage: 'Standard cards, panels, modals',
  },
  {
    name: 'Large',
    token: '--radius-large',
    value: '12px',
    usage: 'Featured cards, prominent containers',
  },
  {
    name: 'Pill',
    token: '--radius-pill',
    value: '9999px',
    usage: 'Toggle buttons, search inputs',
  },
  {
    name: 'Sharp',
    token: '--radius-sharp',
    value: '0px',
    usage: 'Sidebar panels, full-bleed sections, data tables',
  },
] as const

function Radius() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Border Radius</h1>
      <p className={styles.subtitle}>
        Six border-radius tokens from sharp (0) to pill (9999px). The Marsh brand uses a
        clean, precise aesthetic — favour smaller radii. The default for most interactive
        elements is <strong>4px</strong>.
      </p>

      <h2 className={styles.sectionTitle}>Values</h2>
      <div className={styles.radiusGrid}>
        {RADII.map((r) => (
          <div key={r.name} className={styles.radiusCard}>
            <div
              className={styles.radiusSample}
              style={{ borderRadius: r.value }}
            />
            <div className={styles.radiusLabel}>{r.name}</div>
            <div className={styles.radiusValue}>{r.value} — {r.token}</div>
            <div className={styles.radiusUsage}>{r.usage}</div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>In Context</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Subtle — badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-block', padding: '3px 8px', fontSize: 12, fontWeight: 500, fontFamily: 'Noto Sans, sans-serif', backgroundColor: '#ceecff', color: '#000f47', borderRadius: '2px' }}>
            Status
          </span>
          <span className={styles.radiusValue}>2px — subtle</span>
        </div>

        {/* Default — button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button style={{ padding: '12px 24px', fontSize: 14, fontWeight: 500, fontFamily: 'Noto Sans, sans-serif', backgroundColor: '#ffbf00', color: '#000f47', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Get a Quote
          </button>
          <span className={styles.radiusValue}>4px — default (button)</span>
        </div>

        {/* Soft — card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 120, height: 60, backgroundColor: '#f7f3ee', borderRadius: '8px', border: '1px solid #b9b6b1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#7b7974', fontFamily: 'Noto Sans, sans-serif' }}>
            Card
          </div>
          <span className={styles.radiusValue}>8px — soft (card)</span>
        </div>

        {/* Large — featured card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 120, height: 60, backgroundColor: '#000f47', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#ceecff', fontFamily: 'Noto Sans, sans-serif' }}>
            Featured
          </div>
          <span className={styles.radiusValue}>12px — large (featured)</span>
        </div>

        {/* Pill — search input */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ padding: '8px 16px', border: '1px solid #b9b6b1', borderRadius: '9999px', fontSize: 12, color: '#7b7974', fontFamily: 'Noto Sans, sans-serif', background: '#fff' }}>
            Search…
          </div>
          <span className={styles.radiusValue}>9999px — pill</span>
        </div>

        {/* Sharp — data table */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 120, height: 40, backgroundColor: '#000f47', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontFamily: 'Noto Sans, sans-serif' }}>
            Panel header
          </div>
          <span className={styles.radiusValue}>0 — sharp (panel)</span>
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Radius',
  component: Radius,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
