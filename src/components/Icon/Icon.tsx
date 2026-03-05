import { useEffect, useState, type CSSProperties } from 'react'
import styles from './Icon.module.css'

// Eagerly import all SVGs as raw strings for the icon registry
const iconModules = import.meta.glob('/src/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: false,
})

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | number

export interface IconProps {
  /** Icon name — matches the Material Symbols filename (e.g. "search", "notifications-none") */
  name: string
  /** Size: sm=20, md=24 (default), lg=32, xl=48, or a pixel number */
  size?: IconSize
  /** CSS colour — defaults to currentColor (inherits from parent) */
  color?: string
  /** Accessible label. Omit for decorative icons — will set aria-hidden */
  label?: string
  className?: string
  style?: CSSProperties
}

const sizeMap: Record<string, number> = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
}

function resolveSize(size: IconSize): number {
  if (typeof size === 'number') return size
  return sizeMap[size] ?? 24
}

export function Icon({ name, size = 'md', color = 'currentColor', label, className, style }: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    const key = `/src/icons/${name}.svg`
    const loader = iconModules[key]
    if (!loader) {
      console.warn(`[Icon] Unknown icon: "${name}"`)
      setSvgContent(null)
      return
    }
    let cancelled = false
    loader().then((raw) => {
      if (!cancelled) setSvgContent(raw as string)
    })
    return () => { cancelled = true }
  }, [name])

  const px = resolveSize(size)

  if (!svgContent) {
    return (
      <span
        className={`${styles.icon} ${className ?? ''}`}
        style={{ width: px, height: px, display: 'inline-block', ...style }}
        aria-hidden
      />
    )
  }

  // Inject size and color into the SVG string
  const processed = svgContent
    .replace(/width="[^"]*"/, `width="${px}"`)
    .replace(/height="[^"]*"/, `height="${px}"`)
    .replace(/fill="currentColor"/g, `fill="${color}"`)

  return (
    <span
      className={`${styles.icon} ${className ?? ''}`}
      style={{ width: px, height: px, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  )
}
