import { useState } from 'react'
import { type TemplateCardData } from './TemplatesPage'
import styles from './TemplateDetailPage.module.css'

interface TemplateDetailPageProps {
  template: TemplateCardData
  onBack: () => void
  onShowGraph?: () => void
}

export function TemplateDetailPage({ template, onBack, onShowGraph }: TemplateDetailPageProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    template.milestoneGroups[0]?.id ?? '',
  )
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(template.milestoneGroups.map((g) => g.id)),
  )
  const [infoOpen, setInfoOpen] = useState(true)

  const totalMilestones = template.milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.length,
    0,
  )
  const totalDays = template.milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.reduce((a, m) => a + m.days, 0),
    0,
  )

  const selectedGroup =
    template.milestoneGroups.find((g) => g.id === selectedGroupId) ??
    template.milestoneGroups[0]

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

  const descriptionText = template.description
  const charCount = descriptionText.length

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.breadcrumbBtn} onClick={onBack}>
            ← Back to Templates
          </button>
          <span className={styles.templateTitle}>{template.name}</span>
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
          <button className={styles.editBtn}>
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
        </div>
      </div>

      {/* ── Two-panel layout ── */}
      <div className={styles.panels}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span className={styles.leftTemplateName}>{template.name}</span>
            <button className={styles.addGroupBtn}>+ Group</button>
          </div>

          <div className={styles.groupList}>
            {template.milestoneGroups.map((group) => {
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
                      onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
                            title="Remove milestone"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button className={styles.addMilestoneBtn}>+ Milestone</button>
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
              <span className={styles.statValue}>{template.milestoneGroups.length}</span>
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
                      defaultValue={template.name}
                    />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Business</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      defaultValue={template.business}
                    />
                  </div>

                  {/* Row 2: Business Function */}
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>Business Function</label>
                    <select className={styles.fieldInput} defaultValue={template.businessFunction}>
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
                      defaultValue={template.description}
                      maxLength={500}
                      rows={3}
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
                <button className={styles.addMilestoneSectionBtn}>+ Add Milestone</button>
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
                      defaultValue={selectedGroup.name}
                      key={selectedGroup.id}
                    />
                  </div>
                  <div className={styles.fieldFull}>
                    <label className={styles.fieldLabel}>Description</label>
                    <textarea
                      className={styles.fieldTextarea}
                      placeholder="Brief description of this group"
                      rows={3}
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
    </div>
  )
}
