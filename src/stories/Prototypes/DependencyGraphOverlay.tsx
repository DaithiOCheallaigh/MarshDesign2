import { useState } from 'react'
import { type TemplateCardData } from './TemplatesPage'
import styles from './DependencyGraphOverlay.module.css'

interface DependencyGraphOverlayProps {
  template: TemplateCardData
  onClose: () => void
}

const ZOOM_LEVELS = [50, 75, 100, 125, 150]

export function DependencyGraphOverlay({ template, onClose }: DependencyGraphOverlayProps) {
  const [zoomIndex, setZoomIndex] = useState<number>(2) // default 100%

  const zoom = ZOOM_LEVELS[zoomIndex]

  function zoomOut() {
    setZoomIndex((i) => Math.max(0, i - 1))
  }

  function zoomIn() {
    setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1))
  }

  function resetZoom() {
    setZoomIndex(2)
  }

  // Collect all milestones from all groups
  const allMilestones = template.milestoneGroups.flatMap((g) =>
    g.milestones.map((m) => ({ ...m, groupName: g.name })),
  )
  const totalMilestones = allMilestones.length

  return (
    <div className={styles.overlay}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerTitle}>Milestone dependency graph</span>
          <span className={styles.headerSub}>
            {totalMilestones} milestones · 0 dependencies · {totalMilestones} not started
          </span>
        </div>
        <div className={styles.headerRight}>
          {/* Zoom controls */}
          <div className={styles.zoomGroup}>
            <button
              className={styles.zoomBtn}
              onClick={zoomOut}
              disabled={zoomIndex === 0}
              title="Zoom out"
            >
              −
            </button>
            <span className={styles.zoomLabel}>{zoom}%</span>
            <button
              className={styles.zoomBtn}
              onClick={zoomIn}
              disabled={zoomIndex === ZOOM_LEVELS.length - 1}
              title="Zoom in"
            >
              +
            </button>
          </div>
          <button className={styles.headerBtn} onClick={resetZoom} title="Fit to view">
            Fit
          </button>
          <button className={styles.headerBtn} onClick={resetZoom} title="Reset zoom">
            Reset
          </button>
          {/* Close */}
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            ×
          </button>
        </div>
      </div>

      {/* ── Canvas area ── */}
      <div className={styles.canvasArea}>
        {/* Status legend */}
        <div className={styles.legend}>
          <div className={styles.legendTitle}>Status</div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: '#9ca3af' }} />
            Not Started
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: '#2563eb' }} />
            In Progress
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: '#059669' }} />
            Completed
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: '#dc2626' }} />
            Blocked
          </div>
        </div>

        {/* Settings/gear placeholder */}
        <button className={styles.settingsBtn} title="Settings">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="2.5" stroke="#6b7280" strokeWidth="1.5" />
            <path
              d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Nodes grid */}
        <div
          className={styles.nodesGrid}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
        >
          {allMilestones.map((m) => (
            <div key={m.id} className={styles.node}>
              <div className={styles.nodeName}>{m.name}</div>
              <div className={styles.nodeGroup}>{m.groupName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className={styles.bottomStrip}>
        Milestones in this template · {totalMilestones} total
      </div>
    </div>
  )
}
