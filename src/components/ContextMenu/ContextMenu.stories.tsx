import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenu } from './ContextMenu'
import styles from './ContextMenu.module.css'

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu
      items={[
        { label: 'View details' },
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: '', divider: true },
        { label: 'Delete', danger: true },
      ]}
    >
      <div style={{ padding: 24, background: '#F4F8FF', borderRadius: 8, fontSize: 14, color: '#404040', userSelect: 'none' }}>
        Right-click anywhere in this area
      </div>
    </ContextMenu>
  ),
}

// Static preview showing the menu open — for Figma capture
export const MenuOpen: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 180 }}>
      <div style={{ padding: 24, background: '#F4F8FF', borderRadius: 8, fontSize: 14, color: '#404040' }}>
        Right-click target area
      </div>
      <div className={styles.menu} style={{ position: 'absolute', top: 16, left: 16 }} role="menu">
        {[
          { label: 'View details', danger: false },
          { label: 'Edit', danger: false },
          { label: 'Duplicate', danger: false },
        ].map(item => (
          <button key={item.label} className={styles.item} role="menuitem">{item.label}</button>
        ))}
        <div className={styles.divider} />
        <button className={[styles.item, styles.danger].join(' ')} role="menuitem">Delete</button>
      </div>
    </div>
  ),
}
