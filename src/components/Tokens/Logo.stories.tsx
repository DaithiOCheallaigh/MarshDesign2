import type { Meta, StoryObj } from '@storybook/react'
import styles from './Tokens.module.css'

// Source: Marsh Brand Design Guide §4 Logo (March 2026)
// https://brand.marsh.com/document/1154#/core-guidelines/logo-1

const LOGO_VARIANTS = [
  {
    name: 'Midnight (Primary)',
    file: '/assets/marsh-logo-rgb-midnight.svg',
    bg: '#ffffff',
    border: '1px solid #e8e8e8',
    label: 'For use on white or very light backgrounds.',
    recommended: true,
  },
  {
    name: 'Sky Blue',
    file: '/assets/marsh-logo-rgb-sky.svg',
    bg: '#000f47',
    border: 'none',
    label: 'For use on Midnight Blue backgrounds.',
    recommended: false,
  },
  {
    name: 'White (Reversed)',
    file: '/assets/marsh-logo-rgb-white.svg',
    bg: '#000f47',
    border: 'none',
    label: 'For use on dark or photographic backgrounds.',
    recommended: false,
  },
]

const DO_RULES = [
  'Use the SVG version for all digital and screen applications.',
  'Maintain the minimum clear space on all sides (equal to the height of the "M" letterform).',
  'Use only the three approved colour versions: Midnight, Sky, or White.',
  'Use the Midnight version on white/light backgrounds whenever possible.',
  'Scale proportionally — never distort or stretch the logo.',
]

const DONT_RULES = [
  'Do not recolour the logo with any unapproved colours.',
  'Do not place the Midnight logo on dark or busy backgrounds.',
  'Do not place the White or Sky logo on white backgrounds.',
  'Do not add drop shadows, outlines, or effects.',
  'Do not rotate or tilt the logo.',
  'Do not place the logo on a coloured box or container.',
  'Do not use the logo at smaller than 80px wide in digital applications.',
]

function Logo() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Logo</h1>
      <p className={styles.subtitle}>
        The Marsh logo is the most recognisable element of the brand. It must appear on every
        touchpoint, correctly and consistently. Never modify the logo in any way.
      </p>

      <div className={styles.ruleBox}>
        <strong>Logo rules:</strong> Use only approved SVG files · Maintain clear space · Three
        colour versions only (Midnight, Sky, White) · Minimum digital width 80px · No effects,
        recolouring, distortion, or rotation
      </div>

      {/* Colour variants */}
      <h2 className={styles.sectionTitle}>Colour Variants</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        {LOGO_VARIANTS.map((v) => (
          <div
            key={v.name}
            style={{
              border: '1px solid #e8e8e8',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            {/* Preview area */}
            <div
              style={{
                background: v.bg,
                border: v.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 40px',
                minHeight: 140,
              }}
            >
              <img
                src={v.file}
                alt={`Marsh logo — ${v.name}`}
                style={{ width: '100%', maxWidth: 200, height: 'auto', display: 'block' }}
              />
            </div>
            {/* Info */}
            <div style={{ padding: '12px 16px', background: '#fff' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#000f47',
                  }}
                >
                  {v.name}
                </span>
                {v.recommended && (
                  <span
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#14853d',
                      background: '#dfecd7',
                      borderRadius: 999,
                      padding: '1px 8px',
                    }}
                  >
                    Preferred
                  </span>
                )}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 12,
                  color: '#7b7974',
                  margin: 0,
                }}
              >
                {v.label}
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#b9b6b1',
                  margin: '6px 0 0',
                }}
              >
                {v.file}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clear space */}
      <h2 className={styles.sectionTitle}>Clear Space</h2>
      <p
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          color: '#7b7974',
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        Always maintain a minimum clear space around the logo. The clear space is equal to the
        height of the "M" letterform. No other graphic elements, text, or imagery may appear
        within this zone.
      </p>
      <div
        style={{
          background: '#f7f3ee',
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          padding: '32px 40px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Clear space indicator */}
        <div
          style={{
            outline: '2px dashed #0b4bff',
            outlineOffset: 20,
            padding: 4,
          }}
        >
          <img
            src="/assets/marsh-logo-rgb-midnight.svg"
            alt="Marsh logo clear space demonstration"
            style={{ width: 200, display: 'block' }}
          />
        </div>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 12,
          color: '#0b4bff',
          marginTop: 8,
        }}
      >
        Blue dashed line indicates the minimum clear space boundary.
      </p>

      {/* Minimum size */}
      <h2 className={styles.sectionTitle}>Minimum Size</h2>
      <p
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          color: '#7b7974',
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        To preserve legibility, the logo should never be reproduced smaller than the minimums
        below.
      </p>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 40 }}>
        {[
          { label: 'Digital minimum', width: 80 },
          { label: 'Comfortable', width: 140 },
          { label: 'Preferred (header)', width: 200 },
        ].map((s) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: 6,
                padding: '16px 20px',
                background: '#fff',
                display: 'inline-flex',
              }}
            >
              <img
                src="/assets/marsh-logo-rgb-midnight.svg"
                alt={s.label}
                style={{ width: s.width, display: 'block' }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 12,
                color: '#7b7974',
              }}
            >
              {s.label} — {s.width}px wide
            </span>
          </div>
        ))}
      </div>

      {/* Do / Don't */}
      <h2 className={styles.sectionTitle}>Do and Don't</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Do */}
        <div
          style={{
            background: '#dfecd7',
            borderLeft: '4px solid #14853d',
            borderRadius: 8,
            padding: '16px 20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 13,
              fontWeight: 700,
              color: '#14853d',
              margin: '0 0 12px',
            }}
          >
            ✓ Do
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {DO_RULES.map((r) => (
              <li
                key={r}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 13,
                  color: '#3d3c37',
                  marginBottom: 6,
                  lineHeight: 1.5,
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Don't */}
        <div
          style={{
            background: '#feecec',
            borderLeft: '4px solid #c53532',
            borderRadius: 8,
            padding: '16px 20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 13,
              fontWeight: 700,
              color: '#c53532',
              margin: '0 0 12px',
            }}
          >
            ✕ Don't
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {DONT_RULES.map((r) => (
              <li
                key={r}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 13,
                  color: '#3d3c37',
                  marginBottom: 6,
                  lineHeight: 1.5,
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* File reference */}
      <h2 className={styles.sectionTitle}>Asset Files</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-family)',
          fontSize: 13,
        }}
      >
        <thead>
          <tr>
            {['File', 'Variant', 'Format', 'Use on'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderBottom: '2px solid #e8e8e8',
                  color: '#7b7974',
                  fontWeight: 500,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              file: 'marsh-logo-rgb-midnight.svg',
              variant: 'Midnight Blue',
              format: 'SVG',
              use: 'White / light backgrounds',
            },
            {
              file: 'marsh-logo-rgb-sky.svg',
              variant: 'Sky Blue',
              format: 'SVG',
              use: 'Midnight Blue backgrounds',
            },
            {
              file: 'marsh-logo-rgb-white.svg',
              variant: 'White',
              format: 'SVG',
              use: 'Dark / photographic backgrounds',
            },
          ].map((row) => (
            <tr key={row.file}>
              {[row.file, row.variant, row.format, row.use].map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid #f0f0f0',
                    fontFamily: i === 0 ? 'monospace' : 'var(--font-family)',
                    color: i === 0 ? '#7b7974' : '#3d3c37',
                    fontSize: i === 0 ? 12 : 13,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const meta: Meta = {
  title: 'Sub Atomic/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
