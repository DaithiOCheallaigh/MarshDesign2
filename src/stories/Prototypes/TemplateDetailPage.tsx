import { useState, useEffect } from 'react'
import { type TemplateCardData } from './TemplatesPage'
import styles from './TemplateDetailPage.module.css'

interface TemplateDetailPageProps {
  template: TemplateCardData
  onBack: () => void
  onShowGraph?: () => void
}

function deepCloneTemplate(t: TemplateCardData): TemplateCardData {
  return {
    ...t,
    milestoneGroups: t.milestoneGroups.map((g) => ({
      ...g,
      milestones: g.milestones.map((m) => ({ ...m })),
    })),
  }
}

export function TemplateDetailPage({ template, onBack, onShowGraph }: TemplateDetailPageProps) {
  const [localTemplate, setLocalTemplate] = useState<TemplateCardData>(() => ({
    ...template,
    milestoneGroups: template.milestoneGroups.map((g) => ({
      ...g,
      milestones: g.milestones.map((m) => ({ ...m })),
    })),
  }))
  const [editMode, setEditMode] = useState(false)
  const [savedTemplate, setSavedTemplate] = useState<TemplateCardData | null>(null)

  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    template.milestoneGroups[0]?.id ?? '',
  )
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(template.milestoneGroups.map((g) => g.id)),
  )
  const [infoOpen, setInfoOpen] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const totalMilestones = localTemplate.milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.length,
    0,
  )
  const totalDays = localTemplate.milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.reduce((a, m) => a + m.days, 0),
    0,
  )

  const selectedGroup =
    localTemplate.milestoneGroups.find((g) => g.id === selectedGroupId) ??
    localTemplate.milestoneGroups[0]

  function toggleGroup(id: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function addGroup() {
    const id = `g-${Date.now()}`
    const newGroup = { id, name: 'New Group', milestones: [] }
    setLocalTemplate((prev) => ({
      ...prev,
      milestoneGroups: [...prev.milestoneGroups, newGroup],
    }))
    setSelectedGroupId(id)
    setExpandedGroups((prev) => {
      const s = new Set(prev)
      s.add(id)
      return s
    })
  }

  function removeGroup(groupId: string, e: React.MouseEvent) {
    e.stopPropagation()
    setLocalTemplate((prev) => ({
      ...prev,
      milestoneGroups: prev.milestoneGroups.filter((g) => g.id !== groupId),
    }))
    if (selectedGroupId === groupId) {
      const remaining = localTemplate.milestoneGroups.filter((g) => g.id !== groupId)
      setSelectedGroupId(remaining[0]?.id ?? '')
    }
    setToast('Removed successfully')
  }

  function addMilestone(groupId: string) {
    const newMs = { id: `m-${Date.now()}`, name: 'New Milestone', days: 7 }
    setLocalTemplate((prev) => ({
      ...prev,
      milestoneGroups: prev.milestoneGroups.map((g) =>
        g.id === groupId ? { ...g, milestones: [...g.milestones, newMs] } : g,
      ),
    }))
  }

  function removeMilestone(groupId: string, milestoneId: string, e: React.MouseEvent) {
    e.stopPropagation()
    setLocalTemplate((prev) => ({
      ...prev,
      milestoneGroups: prev.milestoneGroups.map((g) =>
        g.id === groupId
          ? { ...g, milestones: g.milestones.filter((m) => m.id !== milestoneId) }
          : g,
      ),
    }))
    setToast('Removed successfully')
  }

  function handleEditClick() {
    setSavedTemplate(deepCloneTemplate(localTemplate))
    setEditMode(true)
  }

  function handleSaveClick() {
    setEditMode(false)
    setSavedTemplate(null)
    setToast('Template saved')
  }

  function handleCancel() {
    if (savedTemplate) setLocalTemplate(savedTemplate)
    setEditMode(false)
    setSavedTemplate(null)
  }

  const charCount = localTemplate.description.length

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.breadcrumbBtn} onClick={onBack}>
            ← Back to Templates
          </button>
          <span className={styles.templateTitle}>{localTemplate.name}</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.showGraphBtn} onClick={onShowGraph}>
            {/* Bar chart icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="6" width="3" height="8" rx="1" fill="#374151" />
              <rect x="4" y="3" width="3" height="11" rx="1" fill="#374151" />
              <rect x="8" y="0" width="3" height="14" rx="1" fill="#374151" />
              <rect x="12" y="4" width="2" height="10" rx="1" fill="#374151" />
            </svg>
            Show Graph
          </button>

          {editMode ? (
            <>
              <button className={styles.editBtn} onClick={handleSaveClick}>
                {/* Pencil icon */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5 1.5a1.414 1.414 0 0 1 2 2L4 11H2v-2L9.5 1.5z"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Save Changes
              </button>
              <button
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: 6,
                  padding: '7px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                  color: '#374151',
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className={styles.editBtn} onClick={handleEditClick}>
              {/* Pencil icon */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.5 1.5a1.414 1.414 0 0 1 2 2L4 11H2v-2L9.5 1.5z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit Template
            </button>
          )}
        </div>
      </div>

      {/* ── Two-panel layout ── */}
      <div className={styles.panels}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span className={styles.leftTemplateName}>{localTemplate.name}</span>
            <button className={styles.addGroupBtn} onClick={addGroup}>+ Group</button>
          </div>

          <div className={styles.groupList}>
            {localTemplate.milestoneGroups.map((group) => {
              const isExpanded = expandedGroups.has(group.id)
              const isActive = group.id === selectedGroupId
              return (
                <div key={group.id}>
                  {/* Group row */}
                  <div
                    className={`${styles.groupRow} ${isActive ? styles.groupRowActive : ''}`}
                    onClick={() => setSelectedGroupId(group.id)}
                  >
                    <button
                      className={styles.groupChevron}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleGroup(group.id)
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
                      >
                        <path d="M4 2.5l4 3.5-4 3.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className={styles.groupName}>{group.name}</span>
                    <span className={styles.groupBadge}>{group.milestones.length}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={(e) => removeGroup(group.id, e)}
                      title="Remove group"
                    >
                      ×
                    </button>
                  </div>

                  {/* Milestones */}
                  {isExpanded && (
                    <>
                      {group.milestones.map((m) => (
                        <div key={m.id} className={styles.milestoneRow}>
                          <span className={styles.milestoneBullet} />
                          <span className={styles.milestoneName}>{m.name}</span>
                          <span className={styles.milestoneDays}>{m.days}d</span>
                          <button
                            className={styles.removeBtn}
                            onClick={(e) => removeMilestone(group.id, m.id, e)}
                            title="Remove milestone"
                          >
                            ×
                          </button>
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
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          {/* Stats bar */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{localTemplate.milestoneGroups.length}</span>
              <span className={styles.statLabel}>Groups</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{totalMilestones}</span>
              <span className={styles.statLabel}>Milestones</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{totalDays}d</span>
              <span className={styles.statLabel}>Est. Duration</span>
            </div>
          </div>

          {/* Template Information section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => setInfoOpen((v) => !v)}
            >
              <span className={styles.sectionTitle}>Template Information</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ transform: infoOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
              >
                <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {infoOpen && (
              <div className={styles.sectionBody}>
                <div className={styles.fieldGrid}>
                  {/* Row 1 */}
                  <div>
                    <label className={styles.fieldLabel}>
                      Template Name <span>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={localTemplate.name}
                      readOnly={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                      onChange={(e) =>
                        setLocalTemplate((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Business</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={localTemplate.business}
                      readOnly={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                      onChange={(e) =>
                        setLocalTemplate((prev) => ({ ...prev, business: e.target.value }))
                      }
                    />
                  </div>

                  {/* Row 2: Business Function */}
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>Business Function</label>
                    <select
                      className={styles.fieldInput}
                      value={localTemplate.businessFunction}
                      disabled={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                      onChange={(e) =>
                        setLocalTemplate((prev) => ({ ...prev, businessFunction: e.target.value }))
                      }
                    >
                      <option value="">Select…</option>
                      <option value="Risk Management">Risk Management</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>

                  {/* Row 3: Description */}
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>
                      Description <span>*</span>
                    </label>
                    <textarea
                      className={styles.fieldTextarea}
                      value={localTemplate.description}
                      maxLength={500}
                      rows={3}
                      readOnly={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                      onChange={(e) =>
                        setLocalTemplate((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                    <div className={styles.charCount}>{charCount}/500 characters</div>
                  </div>

                  {/* Row 4: Version */}
                  <div>
                    <label className={styles.fieldLabel}>Version</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      defaultValue="1.0"
                      readOnly
                      style={{ background: '#f9fafb' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Milestone Group section */}
          {selectedGroup && (
            <div className={styles.section}>
              <div className={styles.sectionHeader} style={{ cursor: 'default' }}>
                <div className={styles.milestoneGroupHeader} style={{ margin: 0, flex: 1 }}>
                  <span className={styles.milestoneGroupTitle}>Milestone Group</span>
                </div>
                <button
                  className={styles.addMilestoneSectionBtn}
                  onClick={() => addMilestone(selectedGroupId)}
                >
                  + Add Milestone
                </button>
              </div>

              <div className={styles.sectionBody}>
                <div className={styles.fieldGrid}>
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>
                      Group Name <span>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={selectedGroup.name}
                      key={selectedGroup.id}
                      readOnly={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                      onChange={(e) => {
                        const val = e.target.value
                        setLocalTemplate((prev) => ({
                          ...prev,
                          milestoneGroups: prev.milestoneGroups.map((g) =>
                            g.id === selectedGroup.id ? { ...g, name: val } : g,
                          ),
                        }))
                      }}
                    />
                  </div>
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>Description</label>
                    <textarea
                      className={styles.fieldTextarea}
                      placeholder="Brief description of this group"
                      rows={3}
                      readOnly={!editMode}
                      style={{ background: editMode ? 'white' : '#f9fafb' }}
                    />
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  Milestones in this group ({selectedGroup.milestones.length})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#000f47',
            color: 'white',
            padding: '10px 18px',
            borderRadius: 8,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 100,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
