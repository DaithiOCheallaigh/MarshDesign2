import { BarChart } from '../../components/Charts/BarChart'
import { LineChart } from '../../components/Charts/LineChart'
import { PieChart } from '../../components/Charts/PieChart'
import { ActivityGauge } from '../../components/Charts/ActivityGauge'
import { Icon } from '../../components/Icon'
import styles from './DashboardPage.module.css'

// ---- Data derived from the Client Profile events & clients ----

const STATUS_DISTRIBUTION = [
  { label: 'Not Started', value: 2, color: '#b9b6b1' },
  { label: 'In Progress', value: 2, color: '#ffbf00' },
  { label: 'Complete – On Time', value: 1, color: '#14853d' },
  { label: 'Complete – Ahead', value: 1, color: '#0b4bff' },
]

const PRIORITY_DATA = [
  { priority: 'High', events: 4 },
  { priority: 'Medium', events: 2 },
  { priority: 'Low', events: 0 },
]

const EVENTS_BY_MONTH = [
  { month: 'Jan', started: 2, completed: 1 },
  { month: 'Feb', started: 3, completed: 2 },
  { month: 'Mar', started: 2, completed: 1 },
  { month: 'Apr', started: 1, completed: 0 },
  { month: 'May', started: 0, completed: 0 },
  { month: 'Jun', started: 1, completed: 1 },
]

const RECENT_EVENTS = [
  { name: 'Q1 Data Analysis', template: 'data-analysis', priority: 'High', status: 'Not Started', date: '01/01/2026' },
  { name: 'Q1 Document Processing', template: 'Document Review', priority: 'High', status: 'In Progress', date: '02/01/2025' },
  { name: 'Annual Compliance Review', template: 'Compliance Check', priority: 'Medium', status: 'Not Started', date: '03/01/2025' },
  { name: 'Platform Upgrade v2.0', template: 'System Update', priority: 'High', status: 'In Progress', date: '02/10/2025' },
  { name: 'Financial Audit Prep', template: 'Document Review', priority: 'Medium', status: 'Complete – Ahead', date: '01/20/2025' },
]

const TOP_CLIENTS = [
  { name: 'TechVision Solutions', location: 'San Francisco, CA', projects: 8, active: 5 },
  { name: 'GlobalFinance Partners', location: 'New York, NY', projects: 6, active: 4 },
  { name: 'Sunrise Healthcare Group', location: 'Boston, MA', projects: 5, active: 3 },
  { name: 'RetailMax Corporation', location: 'Chicago, IL', projects: 4, active: 2 },
  { name: 'The Palms South Properties', location: 'Miami, FL', projects: 3, active: 2 },
]

// ---- Sub-components ----

function KpiCard({
  label, value, unit, trend, trendValue, trendNote, iconName, iconClass,
}: {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down'
  trendValue?: string
  trendNote?: string
  iconName: string
  iconClass: string
}) {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiLabel}>
        <span>{label}</span>
        <span className={[styles.kpiIconWrap, styles[iconClass]].join(' ')}>
          <Icon name={iconName} size={18} color="currentColor" />
        </span>
      </div>
      <div className={styles.kpiValue}>
        {value}{unit && <span style={{ fontSize: 18, fontWeight: 500, marginLeft: 2 }}>{unit}</span>}
      </div>
      {(trend || trendNote) && (
        <div className={styles.kpiFooter}>
          {trend === 'up' && (
            <span className={styles.trendUp}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9l3.5-3.5L7.5 7.5 11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {trendValue}
            </span>
          )}
          {trend === 'down' && (
            <span className={styles.trendDown}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3l3.5 3.5L7.5 4.5 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9h3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {trendValue}
            </span>
          )}
          {trendNote && <span className={styles.trendNote}>{trendNote}</span>}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Not Started') return <span className={styles.badgeNS}>Not Started</span>
  if (status === 'In Progress') return <span className={styles.badgeIP}>In Progress</span>
  if (status.startsWith('Complete')) return <span className={styles.badgeDone}>{status}</span>
  return <span className={styles.badgeNS}>{status}</span>
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'High') return <span className={styles.badgeHigh}>High</span>
  return <span className={styles.badgeMedium}>{priority}</span>
}

// ---- Main Dashboard ----

interface DashboardPageProps {
  onNavigate?: (page: 'events' | 'clients') => void
}

export function DashboardPage({ onNavigate }: DashboardPageProps = {}) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitleGroup}>
            <h1>Dashboard</h1>
          </div>
          <p className={styles.subtitle}>Admin overview — AchieveA workspace</p>
        </div>
        <div className={styles.dateBadge}>
          <Icon name="calendar-today" size={14} />
          {today}
        </div>
      </div>

      {/* KPI row */}
      <div className={styles.kpiRow}>
        <KpiCard
          label="Total Events"
          value={6}
          iconName="event"
          iconClass="kpiIconBlue"
          trend="up"
          trendValue="+2"
          trendNote="this month"
        />
        <KpiCard
          label="Active Clients"
          value={5}
          iconName="contacts"
          iconClass="kpiIconNavy"
          trend="up"
          trendValue="+1"
          trendNote="this quarter"
        />
        <KpiCard
          label="In Progress"
          value={2}
          iconName="pending-actions"
          iconClass="kpiIconAmber"
          trendNote="2 high priority"
        />
        <KpiCard
          label="Completion Rate"
          value={33}
          unit="%"
          iconName="check-circle-outline"
          iconClass="kpiIconGreen"
          trendNote="2 of 6 complete"
        />
      </div>

      {/* Charts row 1: Status donut + Events over time line */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Event Status Distribution</h3>
          <PieChart
            data={STATUS_DISTRIBUTION}
            height={220}
            donut
            showLegend
          />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Events Activity</h3>
          <span className={styles.chartCardSubtitle}>Started vs. Completed per month</span>
          <LineChart
            data={EVENTS_BY_MONTH}
            series={[
              { key: 'started', label: 'Started', color: '#0b4bff' },
              { key: 'completed', label: 'Completed', color: '#14853d' },
            ]}
            xKey="month"
            height={200}
            showGrid
            showLegend
          />
        </div>
      </div>

      {/* Charts row 2: Priority bar + Gauges */}
      <div className={styles.chartsRowThree}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Events by Priority</h3>
          <BarChart
            data={PRIORITY_DATA}
            series={[{ key: 'events', label: 'Events', color: '#000f47' }]}
            xKey="priority"
            height={180}
            showGrid={false}
            showLegend={false}
          />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>On-Time Rate</h3>
          <span className={styles.chartCardSubtitle}>Completed events delivered on schedule</span>
          <div className={styles.gaugeRow}>
            <div className={styles.gaugeSingle}>
              <ActivityGauge
                value={100}
                max={100}
                label="On-Time"
                sublabel="2 / 2"
                color="#14853d"
                size={120}
              />
              <span className={styles.gaugeTitle}>Delivery</span>
            </div>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Client Activity</h3>
          <span className={styles.chartCardSubtitle}>Active projects across all clients</span>
          <div className={styles.gaugeRow}>
            <div className={styles.gaugeSingle}>
              <ActivityGauge
                value={16}
                max={26}
                label="Active"
                sublabel="16 / 26"
                color="#0b4bff"
                size={120}
              />
              <span className={styles.gaugeTitle}>Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Recent Events + Top Clients */}
      <div className={styles.bottomRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Recent Events</h3>
          <table className={styles.recentTable}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_EVENTS.map((ev) => (
                <tr key={ev.name}>
                  <td>
                    <a
                      href="#"
                      className={styles.eventLink}
                      onClick={(e) => { e.preventDefault(); onNavigate?.('events') }}
                    >
                      {ev.name}
                    </a>
                  </td>
                  <td><PriorityBadge priority={ev.priority} /></td>
                  <td><StatusBadge status={ev.status} /></td>
                  <td style={{ color: 'var(--color-neutral-750)', fontSize: 12 }}>{ev.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.cardFooter}>
            <button
              type="button"
              className={styles.sectionViewAll}
              onClick={() => onNavigate?.('events')}
            >
              View all events
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartCardTitle}>Top Clients by Projects</h3>
          <ul className={styles.clientList}>
            {TOP_CLIENTS.map((client, i) => (
              <li key={client.name} className={styles.clientListItem}>
                <span style={{ color: 'var(--color-neutral-500)', fontSize: 12, width: 16, flexShrink: 0 }}>{i + 1}</span>
                <a
                  href="#"
                  className={styles.clientName}
                  onClick={(e) => { e.preventDefault(); onNavigate?.('clients') }}
                >
                  {client.name}
                </a>
                <div className={styles.clientMeta}>
                  <span className={styles.clientMetaItem}>{client.location.split(',')[1]?.trim()}</span>
                  <span className={styles.clientMetaItemBlue}>{client.projects} projects</span>
                  <span className={styles.clientMetaItem}>{client.active} active</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cardFooter}>
            <button
              type="button"
              className={styles.sectionViewAll}
              onClick={() => onNavigate?.('clients')}
            >
              View all clients
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
