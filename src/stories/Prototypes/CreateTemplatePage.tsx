import { useState } from 'react'
import styles from './CreateTemplatePage.module.css'

interface NewMilestone {
  id: string
  name: string
  days: number
}

interface NewGroup {
  id: string
  name: string
  milestones: NewMilestone[]
}

interface CreateTemplatePageProps {
  onBack: () => void
  onSave?: () => void
}

export function CreateTemplatePage({ onBack, onSave }: CreateTemplatePageProps) {
  const [templateName, setTemplateName] = useState('')
  const [business, setBusiness] = useState('')
  const [businessFunction, setBusinessFunction] = useState('')
  const [description, setDescription] = useState('')
  const [groups, setGroups] = useState<NewGroup[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [_showGraph, setShowGraph] = useState(false) // placeholder
  const [infoOpen, setInfoOpen] = useState(true)

  const totalMilestones = groups.reduce((sum, g) => sum + g.milestones.length, 0)
  const totalDays = groups.reduce(
    (sum, g) => sum + g.milestones.reduce((s, m) => s + m.days, 0),
    0
  )

  function addGroup() {
    const id = `g${Date.now()}`
    const newGroup: NewGroup = { id, name: 'New Group', milestones: [] }
    setGroups(prev => [...prev, newGroup])
    setSelectedGroupId(id)
    setExpandedGroups(prev => {
      const s = new Set(prev)
      s.add(id)
      return s
    })
  }

  function removeGroup(id: string) {
    setGroups(prev => prev.filter(g => g.id !== id))
    if (selectedGroupId === id) {
      setSelectedGroupId(null)
    }
  }

  function toggleGroup(id: string) {
    setExpandedGroups(prev => {
      const s = new Set(prev)
      if (s.has(id)) {
        s.delete(id)
      } else {
        s.add(id)
      }
      return s
    })
  }

  function updateGroupName(id: string, name: string) {
    setGroups(prev => prev.map(g => (g.id === id ? { ...g, name } : g)))
  }

  function addMilestone(groupId: string) {
    const milestone: NewMilestone = {
      id: `m${Date.now()}`,
      name: 'New Milestone',
      days: 0,
    }
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId ? { ...g, milestones: [...g.milestones, milestone] } : g
      )
    )
  }

  const selectedGroup = groups.find(g => g.id === selectedGroupId) ?? null

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.breadcrumbBtn} onClick={onBack}>
            ← Back to Templates
          </button>
          <h2 className={styles.pageTitle}>Create Template</h2>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.showGraphBtn}
            onClick={() => setShowGraph(v => !v)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Show Graph
          </button>
          <button className={styles.saveBtn} onClick={onSave}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Template
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className={styles.panels}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span
              className={
                templateName
                  ? styles.leftTemplateName
                  : `${styles.leftTemplateName} ${styles.leftTemplateNameEmpty}`
              }
            >
              {templateName || 'Untitled Template'}
            </span>
            <button className={styles.addGroupBtn} onClick={addGroup}>
              + Group
            </button>
          </div>

          {groups.length === 0 ? (
            <div className={styles.emptyGroups}>No groups yet</div>
          ) : (
            <div className={styles.groupList}>
              {groups.map(group => {
                const isExpanded = expandedGroups.has(group.id)
                const isActive = selectedGroupId === group.id
                return (
                  <div key={group.id}>
                    <div
                      className={`${styles.groupRow} ${isActive ? styles.groupRowActive : ''}`}
                      onClick={() => setSelectedGroupId(group.id)}
                    >
                      <button
                        className={styles.groupChevron}
                        onClick={e => {
                          e.stopPropagation()
                          toggleGroup(group.id)
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.15s',
                          }}
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                      <span className={styles.groupName}>{group.name}</span>
                      <span className={styles.groupBadge}>{group.milestones.length}</span>
                      <button
                        className={styles.removeGroupBtn}
                        onClick={e => {
                          e.stopPropagation()
                          removeGroup(group.id)
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    {isExpanded && (
                      <>
                        {group.milestones.map(milestone => (
                          <div key={milestone.id} className={styles.milestoneRow}>
                            <span className={styles.milestoneBullet} />
                            <span className={styles.milestoneName}>{milestone.name}</span>
                            {milestone.days > 0 && (
                              <span className={styles.milestoneDays}>{milestone.days}d</span>
                            )}
                          </div>
                        ))}
                        <button
                          className={styles.addMilestoneBtn}
                          onClick={() => addMilestone(group.id)}
                        >
                          + Milestone
                        </button>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          {/* Stats Bar */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{groups.length}</span>
              <span className={styles.statLabel}>Groups</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{totalMilestones}</span>
              <span className={styles.statLabel}>Milestones</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{totalDays > 0 ? `${totalDays}d` : '—'}</span>
              <span className={styles.statLabel}>Est. Duration</span>
            </div>
          </div>

          {/* Template Information section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => setInfoOpen(v => !v)}
            >
              <span className={styles.sectionTitle}>Template Information</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: infoOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {infoOpen && (
              <div className={styles.sectionBody}>
                <div className={styles.fieldGrid}>
                  <div>
                    <label className={styles.fieldLabel}>Template Name *</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={templateName}
                      onChange={e => setTemplateName(e.target.value)}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Business</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={business}
                      onChange={e => setBusiness(e.target.value)}
                      placeholder="Enter business"
                    />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Business Function</label>
                    <select
                      className={styles.fieldSelect}
                      value={businessFunction}
                      onChange={e => setBusinessFunction(e.target.value)}
                    >
                      <option value="">Select function</option>
                      <option value="risk-management">Risk Management</option>
                      <option value="claims-management">Claims Management</option>
                      <option value="client-service">Client Service</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Version</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value="1.0"
                      readOnly
                    />
                  </div>
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>Description</label>
                    <textarea
                      className={styles.fieldTextarea}
                      value={description}
                      onChange={e => {
                        if (e.target.value.length <= 500) setDescription(e.target.value)
                      }}
                      placeholder="Enter a description"
                    />
                    <div className={styles.charCount}>{description.length}/500 characters</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Empty state or Milestone Group section */}
          {groups.length === 0 ? (
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyStateIcon}
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="5" rx="1" />
                <rect x="2" y="10" width="20" height="5" rx="1" />
                <rect x="2" y="17" width="20" height="5" rx="1" />
              </svg>
              <p className={styles.emptyStateText}>
                No groups yet — create one to start organizing milestones.
              </p>
              <button className={styles.createGroupBtn} onClick={addGroup}>
                + Create First Group
              </button>
            </div>
          ) : selectedGroup ? (
            <div className={styles.milestoneGroupSection}>
              <div className={styles.milestoneGroupHeader}>
                <span className={styles.milestoneGroupTitle}>Milestone Group</span>
                <button
                  className={styles.addMilestoneSectionBtn}
                  onClick={() => addMilestone(selectedGroup.id)}
                >
                  Add Milestone
                </button>
              </div>
              <div className={styles.milestoneGroupBody}>
                <div style={{ marginBottom: 12 }}>
                  <label className={styles.fieldLabel}>Group Name *</label>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    value={selectedGroup.name}
                    onChange={e => updateGroupName(selectedGroup.id, e.target.value)}
                    placeholder="Enter group name"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className={styles.fieldLabel}>Description</label>
                  <textarea
                    className={styles.fieldTextarea}
                    placeholder="Enter group description"
                  />
                </div>
                <div className={styles.fieldLabel} style={{ marginBottom: 8 }}>
                  Milestones in this group ({selectedGroup.milestones.length})
                </div>
                {selectedGroup.milestones.map(milestone => (
                  <div
                    key={milestone.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 0',
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <span className={styles.milestoneBullet} />
                    <span className={styles.milestoneName}>{milestone.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
