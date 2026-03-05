import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

interface Swatch {
  name: string
  hex: string
  token: string
  usage?: string
}

// Source: Marsh Brand Design Guide — Component Library Reference March 2026

const BRAND_CORE: Swatch[] = [
  { name: 'Midnight Blue', hex: '#000f47', token: '--color-brand-midnight', usage: 'Primary brand / text / dark bg' },
  { name: 'Sky Blue', hex: '#ceecff', token: '--color-brand-sky', usage: 'Primary brand / light bg / tints' },
  { name: 'White', hex: '#ffffff', token: '--color-white', usage: 'Backgrounds / contrast' },
]

const ACTION: Swatch[] = [
  { name: 'Gold 750', hex: '#ffbf00', token: '--color-action-gold', usage: 'CTA / interactive elements (buttons, active nav)' },
  { name: 'Gold 1000', hex: '#cb7e03', token: '--color-action-gold-hover', usage: 'Gold hover state' },
  { name: 'Gold 250', hex: '#fff3da', token: '--color-action-gold-light', usage: 'Warning bg / highlight bg' },
  { name: 'Blue 750', hex: '#0b4bff', token: '--color-blue-active', usage: 'Focus rings / active links / interactive' },
]

const BLUE_SCALE: Swatch[] = [
  { name: 'Blue 1000 (Midnight)', hex: '#000f47', token: '--color-blue-1000', usage: 'Deepest / headers / primary chart' },
  { name: 'Blue 750 (Active)', hex: '#0b4bff', token: '--color-blue-750', usage: 'Interactive / links / secondary chart' },
  { name: 'Blue 500', hex: '#82baff', token: '--color-blue-500', usage: 'Mid tone / charts' },
  { name: 'Blue 250 (Sky)', hex: '#ceecff', token: '--color-blue-250', usage: 'Lightest / backgrounds / tertiary chart' },
]

const NEUTRALS: Swatch[] = [
  { name: 'Neutral 1000', hex: '#3d3c37', token: '--color-neutral-1000', usage: 'Dark text / borders' },
  { name: 'Neutral 750', hex: '#7b7974', token: '--color-neutral-750', usage: 'Secondary text / icons' },
  { name: 'Neutral 500', hex: '#b9b6b1', token: '--color-neutral-500', usage: 'Disabled / muted' },
  { name: 'Neutral 250', hex: '#f7f3ee', token: '--color-neutral-250', usage: 'Page background / cards' },
]

const STATUS: Swatch[] = [
  { name: 'Success Green', hex: '#14853d', token: '--color-status-success', usage: 'Success border / icon' },
  { name: 'Success Bg', hex: '#dfecd7', token: '--color-status-success-bg', usage: 'Success alert background' },
  { name: 'Warning Yellow', hex: '#ffbe00', token: '--color-status-warning', usage: 'Warning border / icon' },
  { name: 'Warning Bg', hex: '#fff3da', token: '--color-status-warning-bg', usage: 'Warning alert background' },
  { name: 'Danger Crimson', hex: '#c53532', token: '--color-status-danger', usage: 'Error border / icon / destructive btn' },
  { name: 'Danger Bg', hex: '#feecec', token: '--color-status-danger-bg', usage: 'Error alert background' },
  { name: 'Info Blue', hex: '#0b4bff', token: '--color-status-info', usage: 'Info border / icon' },
  { name: 'Info Bg (Sky)', hex: '#ceecff', token: '--color-status-info-bg', usage: 'Info alert background' },
]

function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className={styles.swatchGrid}>
      {swatches.map((s) => (
        <div key={s.token} className={styles.swatch}>
          <div
            className={styles.swatchColor}
            style={{
              backgroundColor: s.hex,
              border: s.hex === '#ffffff' || s.hex === '#f7f3ee' || s.hex === '#fff3da' || s.hex === '#dfecd7' || s.hex === '#feecec' || s.hex === '#ceecff'
                ? '1px solid #b9b6b1'
                : undefined,
            }}
          />
          <div className={styles.swatchInfo}>
            <p className={styles.swatchName}>{s.name}</p>
            <p className={styles.swatchValue}>{s.hex}</p>
            <p className={styles.swatchToken}>{s.token}</p>
            {s.usage && <p className={styles.swatchUsage}>{s.usage}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function Colours() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Colour System</h1>
      <p className={styles.subtitle}>
        The Marsh palette reflects clarity, confidence, and precision.
        Led by <strong>Midnight Blue</strong> and <strong>Sky Blue</strong>, with <strong>Gold 750</strong> as the
        sole action/CTA colour. Use Midnight Blue and Sky Blue for 80%+ of any composition.
      </p>

      <div className={styles.ruleBox}>
        <strong>Colour rules:</strong> No gradients · No transparency effects · No new colours outside this palette ·
        Gold is action-only — use sparingly · Secondary colours (Green, Purple) only for complex data sets
      </div>

      <h2 className={styles.sectionTitle}>Brand Core</h2>
      <SwatchGrid swatches={BRAND_CORE} />

      <h2 className={styles.sectionTitle}>Action &amp; Interaction</h2>
      <SwatchGrid swatches={ACTION} />

      <h2 className={styles.sectionTitle}>Blue Scale</h2>
      <SwatchGrid swatches={BLUE_SCALE} />

      <h2 className={styles.sectionTitle}>Neutral Scale (Warm)</h2>
      <SwatchGrid swatches={NEUTRALS} />

      <h2 className={styles.sectionTitle}>Traffic / Status Colours</h2>
      <p style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, color: '#7b7974', marginBottom: 16 }}>
        Use exclusively for status indicators, alerts, and data validation. Never for decorative purposes.
        Always pair with an icon or label — never rely on colour alone.
      </p>
      <SwatchGrid swatches={STATUS} />
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Colours',
  component: Colours,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
