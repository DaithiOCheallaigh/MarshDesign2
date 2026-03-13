import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Icon, IconButton } from '../../components'

// ── Types ─────────────────────────────────────────────────────────────────────

interface MilestoneGroup {
  id: string
  name: string
  milestoneCount: number
  expanded: boolean
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const initialGroups: MilestoneGroup[] = [
  { id: 'g1', name: 'test',       milestoneCount: 1, expanded: false },
  { id: 'g2', name: 'Discovery',  milestoneCount: 3, expanded: false },
  { id: 'g3', name: 'Compliance', milestoneCount: 2, expanded: false },
]

// ── GroupRow ──────────────────────────────────────────────────────────────────

function GroupRow({
  group,
  onToggle,
  onDelete,
}: {
  group: MilestoneGroup
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      border: '1px solid var(--color-blue-250)',
      borderRadius: 'var(--radius-medium)',
      background: 'var(--color-white)',
      marginBottom: 'var(--spacing-sm)',
    }}>
      {/* Expand toggle */}
      <IconButton
        icon={<Icon name={group.expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size="sm" />}
        label={group.expanded ? 'Collapse' : 'Expand'}
        variant="ghost"
        size="small"
        onClick={onToggle}
      />

      {/* Folder icon */}
      <div style={{
        width: 28, height: 28, flexShrink: 0,
        background: '#ede9fe',
        borderRadius: 'var(--radius-small)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="folder-open" size="sm" color="#9333ea" />
      </div>

      {/* Name */}
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--color-neutral-1000)' }}>
        {group.name}
      </span>

      {/* Milestone count + actions */}
      <span style={{ fontSize: 13, color: 'var(--color-neutral-750)', marginRight: 8 }}>
        {group.milestoneCount} milestone{group.milestoneCount !== 1 ? 's' : ''}
      </span>
      <IconButton icon={<Icon name="edit"   size="sm" />} label="Edit group"   variant="ghost" size="small" />
      <IconButton icon={<Icon name="delete" size="sm" />} label="Delete group" variant="danger" size="small" onClick={onDelete} />
    </div>
  )
}

// ── AddGroupButton ────────────────────────────────────────────────────────────

function AddGroupButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 16px',
        border: '1px dashed var(--color-neutral-500)',
        borderRadius: 'var(--radius-medium)',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        color: 'var(--color-neutral-750)',
        fontSize: 13,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-neutral-250)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
    >
      <Icon name="add" size="sm" color="var(--color-neutral-750)" />
      Add another group
    </button>
  )
}

// ── Template ──────────────────────────────────────────────────────────────────

let nextId = 4

function MilestoneGroupsTemplate() {
  const [groups, setGroups] = useState<MilestoneGroup[]>(initialGroups)

  const toggleExpand = (id: string) =>
    setGroups(gs => gs.map(g => g.id === id ? { ...g, expanded: !g.expanded } : g))

  const deleteGroup = (id: string) =>
    setGroups(gs => gs.filter(g => g.id !== id))

  const addGroup = () => {
    setGroups(gs => [...gs, { id: `g${nextId++}`, name: `New Group ${nextId - 1}`, milestoneCount: 0, expanded: false }])
  }

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      {/* Section header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-sm)',
        borderBottom: '1px solid var(--color-neutral-250)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="format-list-bulleted" size="sm" color="var(--color-neutral-750)" />
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-neutral-1000)' }}>
            Milestone Groups
          </span>
        </div>
        <Button
          variant="ghost"
          size="small"
          iconLeading={<Icon name="add" size="sm" />}
          onClick={addGroup}
        >
          Add Group
        </Button>
      </div>

      {/* Group rows */}
      <div>
        {groups.map(g => (
          <GroupRow
            key={g.id}
            group={g}
            onToggle={() => toggleExpand(g.id)}
            onDelete={() => deleteGroup(g.id)}
          />
        ))}

        {/* Add another group */}
        <AddGroupButton onClick={addGroup} />
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Milestone Groups',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Milestone Groups** template for managing the group structure of a project template. Groups are collapsible containers that organise milestones by workstream or phase.

**Intended usage:** Render inside the template detail/edit page below the Template Information section. Users can expand groups to see their milestones, rename or delete groups, and add new ones via the header button or the dashed "Add another group" footer button. Changes are persisted to the template.

---

**Components used:**
| Component | Role |
|-----------|------|
| \`Button (ghost)\` | "Add Group" header action with plus icon |
| \`IconButton (ghost)\` | Expand/collapse toggle; Edit group |
| \`IconButton (danger)\` | Delete group |
| \`Icon\` | format-list-bulleted section heading; folder-open group identity; keyboard-arrow-right/down expand state; add for "Add another group" |
      `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <MilestoneGroupsTemplate />,
  name: 'Milestone Groups',
}
