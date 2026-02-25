import styles from './Skeleton.module.css'

export type SkeletonVariant = 'text' | 'rect' | 'circle'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = 'rect', width, height, className }: SkeletonProps) {
  const classes = [styles.skeleton, styles[variant], className].filter(Boolean).join(' ')
  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return <span className={classes} style={style} aria-hidden="true" />
}
