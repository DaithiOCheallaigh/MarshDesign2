import styles from './Separator.module.css'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  const classes = [styles.separator, styles[orientation], className].filter(Boolean).join(' ')
  return <hr className={classes} role="separator" aria-orientation={orientation} />
}
