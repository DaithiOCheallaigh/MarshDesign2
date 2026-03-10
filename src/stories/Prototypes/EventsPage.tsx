import { useState, useRef, useEffect } from 'react'
import { ActionButton } from '../../components/ActionButton'
import { Select } from '../../components/Select'
import { SearchBar } from '../../components/SearchBar'
import { Checkbox } from '../../components/Checkbox'
import { Icon } from '../../components/Icon'
import styles from './EventsPage.module.css'

// ---- Add New Event dialog data ----

interface TemplateOption {
  id: string
  name: string
  description: string
  category: string
  milestones: number
  duration: string
  icon: string
  iconColor: string
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: '1', name: 'Banking Compliance Framework',
    description: 'Digital banking regulatory compliance with automated audit trails, KYC/AML processes,…',
    category: 'Compliance & Regulatory', milestones: 4, duration: '5 months',
    icon: 'shield', iconColor: '#14853d',
  },
  {
    id: '2', name: 'Business Intelligence Platform',
    description: 'Comprehensive BI solution with data warehousing, visualization dashboards, and…',
    category: 'Data Warehousing', milestones: 4, duration: '4 months',
    icon: 'addchart', iconColor: '#cb7e03',
  },
  {
    id: '3', name: 'Document Processing Pipeline',
    description: 'Automated document intake, OCR processing, classification, and structured data extraction…',
    category: 'Document Management', milestones: 2, duration: '3 months',
    icon: 'inventory', iconColor: '#cb7e03',
  },
  {
    id: '4', name: 'Healthcare Data Analytics',
    description: 'Patient data analytics platform with FHIR compliance, reporting capabilities, and secur…',
    category: 'Healthcare Analytics', milestones: 4, duration: '4 months',
    icon: 'trending-up', iconColor: '#0b4bff',
  },
  {
    id: '5', name: 'Retail Inventory Automation',
    description: 'End-to-end retail inventory management with real-time tracking and demand forecasting…',
    category: 'Retail Operations', milestones: 4, duration: '3 months',
    icon: 'inventory-2', iconColor: '#000f47',
  },
  {
    id: '6', name: 'Risk Management & Trading',
    description: 'Quantitative risk analysis and trading platform with real-time market data integration…',
    category: 'Finance & Trading', milestones: 5, duration: '6 months',
    icon: 'account-balance', iconColor: '#0b4bff',
  },
]

interface MilestoneGroup {
  id: string
  name: string
  items: { id: string; name: string; days: number }[]
}

const MILESTONE_GROUPS: MilestoneGroup[] = [
  {
    id: 'g1', name: 'Compliance Foundation',
    items: [
      { id: 'm1', name: 'Define Regulatory Requirements', days: 7 },
      { id: 'm2', name: 'Set Up Audit Logging', days: 8 },
    ],
  },
  {
    id: 'g2', name: 'Process Automation',
    items: [
      { id: 'm3', name: 'KYC Workflow Implementation', days: 15 },
      { id: 'm4', name: 'AML Screening Integration', days: 12 },
    ],
  },
]

// ---- Dialog sub-components ----

function AddEventDialog({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [templateSearch, setTemplateSearch] = useState('')
  const [checkedMilestones, setCheckedMilestones] = useState<Set<string>>(
    new Set(MILESTONE_GROUPS.flatMap((g) => g.items.map((i) => i.id)))
  )

  const filteredTemplates = TEMPLATE_OPTIONS.filter((t) =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(templateSearch.toLowerCase())
  )

  const totalDays = MILESTONE_GROUPS.flatMap((g) => g.items)
    .filter((i) => checkedMilestones.has(i.id))
    .reduce((sum, i) => sum + i.days, 0)
  const totalMilestones = MILESTONE_GROUPS.flatMap((g) => g.items).filter((i) => checkedMilestones.has(i.id)).length

  function toggleMilestone(id: string) {
    setCheckedMilestones((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={styles.dialogOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog}>
        {step === 1 ? (
          <>
            {/* Step 1: Template selection */}
            <div className={styles.dialogHeader}>
              <div>
                <h2 className={styles.dialogTitle}>Select Project Template</h2>
                <p className={styles.dialogSub}>Choose an industry template to get started quickly with pre-configured milestones and best practices.</p>
              </div>
              <div className={styles.dialogHeaderRight}>
                <span className={styles.dialogCount}>{filteredTemplates.length} templates found</span>
              </div>
            </div>
            <div className={styles.dialogFilters}>
              <div className={styles.dialogSearchWrap}>
                <Icon name="search" size={14} color="var(--color-neutral-750)" />
                <input
                  type="text"
                  className={styles.dialogSearchInput}
                  placeholder="Search templates..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                />
              </div>
              <button type="button" className={styles.dialogFilterBtn}>
                All Industries
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className={styles.dialogFilterBtn}>
                All Categories
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <div className={styles.dialogBody}>
              <div className={styles.templateGrid}>
                {filteredTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    className={[styles.templateTile, selectedTemplate === tpl.id ? styles.templateTileSelected : ''].filter(Boolean).join(' ')}
                    onClick={() => setSelectedTemplate(tpl.id)}
                  >
                    {selectedTemplate === tpl.id && (
                      <span className={styles.templateCheck}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="7" fill="#0b4bff" />
                          <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <div className={styles.templateTileIcon} style={{ color: tpl.iconColor }}>
                      <Icon name={tpl.icon} size={20} color={tpl.iconColor} />
                    </div>
                    <div className={styles.templateTileContent}>
                      <div className={styles.templateTileName}>{tpl.name}</div>
                      <div className={styles.templateTileDesc}>{tpl.description}</div>
                      <div className={styles.templateTileMeta}>
                        <span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M3 1v2M9 1v2M1 5h10v5a1 1 0 01-1 1H2a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          {tpl.milestones} milestones
                        </span>
                        <span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          {tpl.duration}
                        </span>
                      </div>
                      <div className={styles.templateTileCategory}>
                        <span className={styles.categoryTag}>{tpl.category}</span>
                        <span className={styles.previewLink}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2.5C3.5 2.5 1.5 6 1.5 6S3.5 9.5 6 9.5 10.5 6 10.5 6 8.5 2.5 6 2.5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                          Preview
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.dialogFooter}>
              <p className={styles.dialogFooterNote}>* Select a template to continue</p>
              <div className={styles.dialogFooterBtns}>
                <button type="button" className={styles.dialogCancelBtn} onClick={onClose}>Cancel</button>
                <button
                  type="button"
                  className={styles.dialogPrimaryBtn}
                  disabled={!selectedTemplate}
                  onClick={() => setStep(2)}
                >
                  + Create Project
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Milestone review */}
            <div className={styles.dialogHeader}>
              <div>
                <h2 className={styles.dialogTitle}>Configure Milestones</h2>
                <p className={styles.dialogSub}>Adjust milestone names, durations, and order before creating the project</p>
              </div>
              <button type="button" className={styles.dialogCloseBtn} onClick={onClose} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className={styles.dialogBody}>
              <div className={styles.milestoneTemplateLabel}>
                <Icon name="shield" size={16} color="#16a34a" />
                <div>
                  <div className={styles.milestoneTemplateName}>Banking Compliance Framework</div>
                  <div className={styles.milestoneTemplateCategory}>Banking</div>
                </div>
              </div>
              {MILESTONE_GROUPS.map((group) => (
                <div key={group.id} className={styles.milestoneGroup}>
                  <div className={styles.milestoneGroupHeader}>
                    <span className={styles.dragHandle}>⠿</span>
                    <button type="button" className={styles.groupExpandBtn}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span className={styles.groupName}>{group.name}</span>
                    <span className={styles.groupCount}>
                      {group.items.filter((i) => checkedMilestones.has(i.id)).length} of {group.items.length} milestones
                    </span>
                  </div>
                  {group.items.map((item) => (
                    <div key={item.id} className={styles.milestoneItem}>
                      <span className={styles.dragHandle}>⠿</span>
                      <Checkbox
                        checked={checkedMilestones.has(item.id)}
                        onChange={() => toggleMilestone(item.id)}
                        aria-label={item.name}
                      />
                      <span className={styles.milestoneName}>{item.name}</span>
                      <Icon name="access-time" size={14} color="var(--color-neutral-750)" />
                      <span className={styles.milestoneDays}>{item.days}</span>
                      <span className={styles.milestoneDaysLabel}>days</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.dialogFooter}>
              <p className={styles.dialogFooterNote}>{totalMilestones} milestones · {totalDays} days total</p>
              <div className={styles.dialogFooterBtns}>
                <button type="button" className={styles.dialogCancelBtn} onClick={() => setStep(1)}>Cancel</button>
                <button type="button" className={styles.dialogPrimaryBtn} onClick={onClose}>
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

type Priority = 'High' | 'Medium' | 'Low'
type EventStatus = 'Not Started' | 'In Progress' | 'Complete - On Time' | 'Complete - Ahead'

export interface EventRow {
  id: string
  template: string
  name: string
  description: string
  priority: Priority
  startDate: string
  endDate: string
  status: EventStatus
  client: string
}

const EVENTS: EventRow[] = [
  {
    id: '1',
    template: 'Data Analysis',
    name: 'Q1 Data Analysis',
    description: 'Test',
    priority: 'High',
    startDate: '01/01/2026',
    endDate: '01/06/2026',
    status: 'Not Started',
    client: 'Acme Financial',
  },
  {
    id: '2',
    template: 'Document Review',
    name: 'Q1 Document Processing',
    description: 'Initial setup and framework establishment for document processing',
    priority: 'High',
    startDate: '02/01/2025',
    endDate: '02/28/2025',
    status: 'In Progress',
    client: 'Metro Healthcare',
  },
  {
    id: '3',
    template: 'Compliance Check',
    name: 'Annual Compliance Review',
    description: 'Yearly compliance documentation and verification',
    priority: 'Medium',
    startDate: '03/01/2025',
    endDate: '03/31/2025',
    status: 'Not Started',
    client: 'Acme Financial',
  },
  {
    id: '4',
    template: 'Data Migration',
    name: 'Patient Records Migration',
    description: 'Migrate legacy patient records to new system',
    priority: 'High',
    startDate: '01/15/2025',
    endDate: '02/15/2025',
    status: 'Complete - On Time',
    client: 'Metro Healthcare',
  },
  {
    id: '5',
    template: 'System Update',
    name: 'Platform Upgrade v2.0',
    description: 'Major platform upgrade with new features',
    priority: 'High',
    startDate: '02/10/2025',
    endDate: '03/10/2025',
    status: 'In Progress',
    client: 'Retail Corp',
  },
  {
    id: '6',
    template: 'Document Review',
    name: 'Financial Audit Prep',
    description: 'Prepare documentation for annual financial audit',
    priority: 'Medium',
    startDate: '01/20/2025',
    endDate: '02/20/2025',
    status: 'Complete - Ahead',
    client: 'Acme Financial',
  },
]

// Unique filter option lists derived from data
const TEMPLATE_FILTER_OPTIONS = [...new Set(EVENTS.map((e) => e.template))].sort()
const PRIORITY_FILTER_OPTIONS: Priority[] = ['High', 'Medium', 'Low']
const STATUS_FILTER_OPTIONS: EventStatus[] = ['Not Started', 'In Progress', 'Complete - On Time', 'Complete - Ahead']
const CLIENT_FILTER_OPTIONS = [...new Set(EVENTS.map((e) => e.client))].sort()

const PROJECT_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'document-review', label: 'Document Review' },
  { value: 'compliance-check', label: 'Compliance Check' },
  { value: 'data-migration', label: 'Data Migration' },
  { value: 'system-update', label: 'System Update' },
]

/** Parse MM/DD/YYYY → Date, returns null on failure */
function parseMMDDYYYY(s: string): Date | null {
  const [m, d, y] = s.split('/')
  if (!m || !d || !y) return null
  const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
  return isNaN(dt.getTime()) ? null : dt
}

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'High') return <span className={styles.priorityHigh}>High</span>
  if (priority === 'Medium') return <span className={styles.priorityMedium}>Medium</span>
  return <span className={styles.priorityLow}>Low</span>
}

function StatusBadge({ status }: { status: EventStatus }) {
  if (status === 'Not Started') return <span className={styles.statusNotStarted}>Not Started</span>
  if (status === 'In Progress') return <span className={styles.statusInProgress}>In Progress</span>
  return <span className={styles.statusComplete}>{status}</span>
}

function SortHeader({ label }: { label: string }) {
  return (
    <span className={styles.sortIcon}>
      {label}
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className={styles.sortIconArrows}>
        <path d="M4 1L1 4h6L4 1zM4 11L1 8h6L4 11z" fill="currentColor" />
      </svg>
    </span>
  )
}

// ---- FilterButton: dropdown with checkboxes ----

interface FilterButtonProps {
  label: string
  options: string[]
  selected: Set<string>
  onChange: (next: Set<string>) => void
}

function FilterButton({ label, options, selected, onChange }: FilterButtonProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const isActive = selected.size > 0

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  function toggle(option: string) {
    const next = new Set(selected)
    if (next.has(option)) next.delete(option)
    else next.add(option)
    onChange(next)
  }

  return (
    <div ref={wrapRef} className={styles.filterDropdownWrap}>
      <button
        type="button"
        className={[styles.filterBtn, isActive ? styles.filterBtnActive : ''].filter(Boolean).join(' ')}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        {isActive && <span className={styles.filterBadge}>{selected.size}</span>}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={styles.filterBtnChevron}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className={styles.filterDropdown}>
          {options.map((opt) => (
            <label key={opt} className={styles.filterDropdownItem}>
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
          {isActive && (
            <button type="button" className={styles.filterClear} onClick={() => onChange(new Set())}>
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ---- DateFilterButton: dropdown with a native date input ----

interface DateFilterButtonProps {
  label: string
  value: string  // YYYY-MM-DD or ''
  onChange: (v: string) => void
}

function DateFilterButton({ label, value, onChange }: DateFilterButtonProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const isActive = value !== ''

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  const display = isActive
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : label

  return (
    <div ref={wrapRef} className={styles.filterDropdownWrap}>
      <button
        type="button"
        className={[styles.dateBtn, isActive ? styles.dateBtnActive : ''].filter(Boolean).join(' ')}
        onClick={() => setOpen((o) => !o)}
      >
        {!isActive && <Icon name="calendar-today" size={14} />}
        {display}
        {isActive && (
          <span
            role="button"
            className={styles.dateClearX}
            onClick={(e) => { e.stopPropagation(); onChange(''); setOpen(false) }}
          >
            ×
          </span>
        )}
      </button>
      {open && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterDropdownDateWrap}>
            <span className={styles.filterDropdownDateLabel}>{label}</span>
            <input
              type="date"
              className={styles.filterDateInput}
              value={value}
              onChange={(e) => { onChange(e.target.value); setOpen(false) }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </div>
          {isActive && (
            <button type="button" className={styles.filterClear} onClick={() => { onChange(''); setOpen(false) }}>
              Clear date
            </button>
          )}
        </div>
      )}
    </div>
  )
}

interface EventsPageProps {
  onViewMilestones?: (event: EventRow) => void
}

export function EventsPage({ onViewMilestones }: EventsPageProps = {}) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [projectType, setProjectType] = useState<string>('')
  const [search, setSearch] = useState('')
  const [showAddEvent, setShowAddEvent] = useState(false)

  // Filter row 2 state
  const [filterTemplates, setFilterTemplates] = useState<Set<string>>(new Set())
  const [filterPriorities, setFilterPriorities] = useState<Set<string>>(new Set())
  const [filterStatuses, setFilterStatuses] = useState<Set<string>>(new Set())
  const [filterClients, setFilterClients] = useState<Set<string>>(new Set())
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')

  const filteredEvents = EVENTS.filter((e) => {
    // Project Type dropdown (row 1)
    const matchesType = !projectType || projectType === 'all' ||
      e.template.toLowerCase().replace(/\s+/g, '-') === projectType
    // Search bar (row 1)
    const matchesSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.template.toLowerCase().includes(search.toLowerCase())
    // Filter chips (row 2)
    const matchesTemplate = filterTemplates.size === 0 || filterTemplates.has(e.template)
    const matchesPriority = filterPriorities.size === 0 || filterPriorities.has(e.priority)
    const matchesStatus = filterStatuses.size === 0 || filterStatuses.has(e.status)
    const matchesClient = filterClients.size === 0 || filterClients.has(e.client)
    // Date range (row 2) — filterFrom filters by event startDate, filterTo by event endDate
    let matchesFrom = true
    if (filterFrom) {
      const fromDate = new Date(filterFrom)
      const eStart = parseMMDDYYYY(e.startDate)
      matchesFrom = eStart !== null && eStart >= fromDate
    }
    let matchesTo = true
    if (filterTo) {
      const toDate = new Date(filterTo)
      const eEnd = parseMMDDYYYY(e.endDate)
      matchesTo = eEnd !== null && eEnd <= toDate
    }
    return matchesType && matchesSearch && matchesTemplate && matchesPriority && matchesStatus && matchesClient && matchesFrom && matchesTo
  })

  const allSelected = filteredEvents.length > 0 && filteredEvents.every((e) => selectedRows.has(e.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredEvents.map((e) => e.id)))
    }
  }

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {showAddEvent && <AddEventDialog onClose={() => setShowAddEvent(false)} />}

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <div>
            <h1>All Events</h1>
            <p className={styles.subtitle}>{EVENTS.length} Events</p>
          </div>
        </div>
        <ActionButton
          onClick={() => setShowAddEvent(true)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
        >
          Add New Event
        </ActionButton>
      </div>

      {/* Filter row 1 — Project Type + Search */}
      <div className={styles.filterRow1}>
        <div className={styles.filterProjectType}>
          <Select
            options={PROJECT_TYPE_OPTIONS}
            value={projectType}
            onChange={setProjectType}
            placeholder="Project Type"
          />
        </div>
        <div className={styles.filterSearch}>
          <SearchBar
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter row 2 — chips */}
      <div className={styles.filterRow2}>
        <FilterButton
          label="Template"
          options={TEMPLATE_FILTER_OPTIONS}
          selected={filterTemplates}
          onChange={setFilterTemplates}
        />
        <FilterButton
          label="Priority"
          options={PRIORITY_FILTER_OPTIONS}
          selected={filterPriorities}
          onChange={setFilterPriorities}
        />
        <FilterButton
          label="Status"
          options={STATUS_FILTER_OPTIONS}
          selected={filterStatuses}
          onChange={setFilterStatuses}
        />
        <FilterButton
          label="Client"
          options={CLIENT_FILTER_OPTIONS}
          selected={filterClients}
          onChange={setFilterClients}
        />
        <div className={styles.dateRangeGroup}>
          <DateFilterButton label="From date" value={filterFrom} onChange={setFilterFrom} />
          <span className={styles.dateArrow}>→</span>
          <DateFilterButton label="To date" value={filterTo} onChange={setFilterTo} />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.eventsTable}>
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <Checkbox
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th><SortHeader label="Event Template" /></th>
                <th><SortHeader label="Event Name" /></th>
                <th>Description</th>
                <th><SortHeader label="Priority" /></th>
                <th><SortHeader label="Start / End Date" /></th>
                <th><SortHeader label="Status" /></th>
                <th className={styles.actionsCol}></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.emptyRow}>
                    No events match the selected filters.
                  </td>
                </tr>
              ) : filteredEvents.map((row) => (
                <tr key={row.id}>
                  <td className={styles.checkboxCol}>
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </td>
                  <td>{row.template}</td>
                  <td>
                    <a
                      href="#"
                      className={styles.eventName}
                      onClick={(e) => { e.preventDefault(); onViewMilestones?.(row) }}
                    >
                      {row.name}
                    </a>
                  </td>
                  <td>
                    <span className={styles.description}>{row.description}</span>
                  </td>
                  <td>
                    <PriorityBadge priority={row.priority} />
                  </td>
                  <td>
                    <span className={styles.dateCellRange}>
                      {row.startDate} – {row.endDate}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" className={styles.actionIconBtn} aria-label="Edit">
                        <Icon name="edit" size={16} />
                      </button>
                      <button type="button" className={[styles.actionIconBtn, styles.danger].join(' ')} aria-label="Delete">
                        <Icon name="delete" size={16} />
                      </button>
                      <button
                        type="button"
                        className={[styles.actionIconBtn, styles.expandBtn].join(' ')}
                        aria-label="View milestones"
                        onClick={() => onViewMilestones?.(row)}
                      >
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className={styles.tableFooter}>
          <div className={styles.paginationControls}>
            <button type="button" className={styles.paginationBtn} disabled aria-label="Previous page">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className={styles.pageLabel}>Page 1 of 1</span>
            <button type="button" className={styles.paginationBtn} disabled aria-label="Next page">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={styles.perPageGroup}>
            <span>Results per page</span>
            <select className={styles.perPageSelect} defaultValue="20">
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
