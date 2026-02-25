import styles from './Avatar.module.css'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  className?: string
}

export function Avatar({ src, alt = '', initials, size = 'medium', className }: AvatarProps) {
  const classes = [styles.avatar, styles[size], className].filter(Boolean).join(' ')

  if (src) {
    return <img className={classes} src={src} alt={alt} />
  }

  return (
    <span className={classes} aria-label={alt || initials}>
      {initials ? initials.slice(0, 2).toUpperCase() : '?'}
    </span>
  )
}
