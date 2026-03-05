import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../Icon'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { Input } from '../Input'
import { Avatar } from '../Avatar'
import { Card } from '../Card'
import { Table } from '../Table'
import { Tabs } from '../Tabs'
import { Select } from '../Select'
import { LineChart, PieChart } from '../Charts'
const marshLogoWhite = '/assets/marsh-logo-white.png'

// ─── Data ─────────────────────────────────────────────────────────────────────

const trendData = [
  { date: 'Jan 8',  sent: 1200, success: 1180, failed: 18 },
  { date: 'Jan 9',  sent: 1380, success: 1355, failed: 12 },
  { date: 'Jan 10', sent: 1050, success: 1030, failed: 10 },
  { date: 'Jan 11', sent: 1450, success: 1428, failed: 14 },
  { date: 'Jan 12', sent: 1440, success: 1415, failed: 15 },
  { date: 'Jan 13', sent: 1900, success: 1875, failed: 9 },
  { date: 'Jan 14', sent: 2100, success: 2082, failed: 11 },
  { date: 'Jan 15', sent: 2790, success: 2762, failed: 13 },
]

const trendSeries = [
  { key: 'sent',    label: 'Sent',    color: '#000f47' },
  { key: 'success', label: 'Success', color: '#14853d' },
  { key: 'failed',  label: 'Failed',  color: '#c53532' },
]

const channelData = [
  { label: 'Email',  value: 8420, color: '#000f47' },
  { label: 'SMS',    value: 3210, color: '#0b4bff' },
  { label: 'Push',   value: 2850, color: '#ffbf00' },
  { label: 'In-App', value: 1240, color: '#14853d' },
]

const recentActivity = [
  { name: 'Order Confirmation',   app: 'E-Commerce App',    count: 423,  time: '2 min ago' },
  { name: 'Transaction Alert',    app: 'Banking Portal',    count: 867,  time: '5 min ago' },
  { name: 'Appointment Reminder', app: 'Healthcare System', count: 156,  time: '12 min ago' },
  { name: 'Ticket Update',        app: 'Support Platform',  count: 234,  time: '18 min ago' },
]

const apps = [
  { name: 'E-Commerce Platform', desc: 'Online shopping and order management',   id: 'app_live_a8f3••••o6p7', status: 'inactive', perms: ['send_email','send_sms','send_push'], lastUsed: '2 hours ago' },
  { name: 'Banking Portal',      desc: 'Customer banking and transaction services', id: 'app_live_b9g4••••p7q8', status: 'active',   perms: ['send_email','send_sms'],             lastUsed: '5 min ago' },
  { name: 'Healthcare System',   desc: 'Patient management and appointments',    id: 'app_live_c0h5••••q8r9', status: 'active',   perms: ['send_email','send_push'],            lastUsed: '1 day ago' },
  { name: 'Support Platform',    desc: 'Customer support ticketing system',      id: 'app_live_d1i6••••r9s0', status: 'inactive', perms: ['send_email'],                        lastUsed: '1 week ago' },
]

const events = [
  { name: 'user.registration',    desc: 'Triggered when a new user registers',  app: 'E-Commerce Platform', templates: 3, status: 'active' },
  { name: 'order.confirmed',      desc: 'Triggered when an order is confirmed', app: 'E-Commerce Platform', templates: 5, status: 'active' },
  { name: 'transaction.alert',    desc: 'Triggered for account transactions',   app: 'Banking Portal',      templates: 4, status: 'active' },
  { name: 'appointment.reminder', desc: 'Reminder for upcoming appointments',   app: 'Healthcare System',   templates: 2, status: 'active' },
]

const deliveryLogs = [
  { ts: '2025-01-15 14:32', event: 'order.confirmed',      template: 'Order Confirmation – Email', recipient: 'john.doe@example.com', channel: 'email', status: 'success', detail: 'Delivered in 2.3s' },
  { ts: '2025-01-15 14:31', event: 'user.registration',    template: 'Welcome Email – English',    recipient: 'jane.smith@example.com', channel: 'email', status: 'success', detail: 'Delivered in 1.8s' },
  { ts: '2025-01-15 14:30', event: 'transaction.alert',    template: 'Transaction Alert – SMS',    recipient: '+1-555-0103',            channel: 'sms',   status: 'danger',  detail: 'Invalid phone number' },
  { ts: '2025-01-15 14:29', event: 'appointment.reminder', template: 'Appointment Reminder – SMS', recipient: '+1-555-0104',            channel: 'sms',   status: 'success', detail: 'Delivered in 0.9s' },
  { ts: '2025-01-15 14:28', event: 'order.confirmed',      template: 'Order Confirmation – Push',  recipient: 'device_token_abc',       channel: 'push',  status: 'warning', detail: 'In progress' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'default'

function statusVariant(s: string): BadgeVariant {
  if (s === 'active' || s === 'success') return 'success'
  if (s === 'failed' || s === 'danger')  return 'danger'
  if (s === 'pending' || s === 'warning') return 'warning'
  if (s === 'inactive') return 'default'
  return 'info'
}

function CodeChip({ children }: { children: string }) {
  return (
    <code style={{
      display: 'inline-block',
      padding: '2px 6px',
      borderRadius: 'var(--radius-subtle)',
      background: 'var(--color-neutral-250)',
      fontFamily: 'monospace',
      fontSize: 11,
      color: 'var(--color-brand-midnight)',
    }}>
      {children}
    </code>
  )
}

function StatCard({ label, value, sub, valueColor, icon }: {
  label: string; value: string; sub?: string; valueColor?: string; icon: string
}) {
  return (
    <div style={{
      background: 'var(--color-white)',
      border: '1px solid var(--color-neutral-500)',
      borderRadius: 'var(--radius-soft)',
      padding: '20px 24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--color-neutral-750)', fontWeight: 400 }}>{label}</span>
        <Icon name={icon} size="sm" color="var(--color-neutral-750)" />
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: valueColor ?? 'var(--color-brand-midnight)', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ marginTop: 6, fontSize: 12, color: 'var(--color-neutral-750)' }}>{sub}</div>}
    </div>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-brand-midnight)', margin: '0 0 4px' }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--color-neutral-750)', margin: 0 }}>Real-time overview of notification activity and system performance</p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatCard label="Total Sent (24h)" value="15,720" sub="↑ +12.5% from yesterday" valueColor="var(--color-brand-midnight)" icon="notifications" />
        <StatCard label="Success Rate"     value="97.2%"  sub="15,334 delivered"         valueColor="var(--color-status-success)"  icon="check-circle-outline" />
        <StatCard label="Failed Deliveries" value="386"   sub="Requires attention"        valueColor="var(--color-status-danger)"  icon="error-outline" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Notification Trends" padding="medium">
          <p style={{ fontSize: 12, color: 'var(--color-neutral-750)', marginBottom: 12 }}>Last 7 days delivery statistics</p>
          <LineChart
            data={trendData}
            series={trendSeries}
            xKey="date"
            height={200}
          />
        </Card>

        <Card title="Channel Distribution" padding="medium">
          <p style={{ fontSize: 12, color: 'var(--color-neutral-750)', marginBottom: 12 }}>Notifications by delivery channel</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <PieChart data={channelData} height={180} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {channelData.map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-neutral-750)', width: 40 }}>{d.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-brand-midnight)' }}>{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <Card title="Recent Activity" padding="none">
        {recentActivity.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 24px',
            borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-neutral-250)' : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--color-brand-sky)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="notifications" size="sm" color="var(--color-brand-midnight)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-brand-midnight)' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>{item.app}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-brand-midnight)' }}>{item.count.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: 'var(--color-neutral-750)' }}>{item.time}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Bottom stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatCard label="Active Applications" value="24" sub="8 registered this month" icon="open-in-browser" />
        <StatCard label="Active Events"       value="47" sub="Across all applications"  icon="calendar-today" />
        <StatCard label="Total Recipients"    value="12,847" sub="+342 this week"        icon="group" />
      </div>
    </div>
  )
}

function ApplicationsPage() {
  const columns = [
    {
      key: 'app',
      header: 'Application',
      render: (row: typeof apps[0]) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--color-brand-midnight)' }}>{row.name}</div>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>{row.desc}</div>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'Application ID',
      render: (row: typeof apps[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CodeChip>{row.id}</CodeChip>
          <Icon name="visibility" size="sm" color="var(--color-neutral-750)" style={{ cursor: 'pointer' }} />
          <Icon name="content-copy" size="sm" color="var(--color-neutral-750)" style={{ cursor: 'pointer' }} />
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof apps[0]) => <Badge label={row.status} variant={statusVariant(row.status)} />,
    },
    {
      key: 'perms',
      header: 'Permissions',
      render: (row: typeof apps[0]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {row.perms.map(p => <CodeChip key={p}>{p}</CodeChip>)}
        </div>
      ),
    },
    {
      key: 'lastUsed',
      header: 'Last Used',
      render: (row: typeof apps[0]) => <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{row.lastUsed}</span>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-brand-midnight)', margin: '0 0 4px' }}>Application Registration</h1>
          <p style={{ fontSize: 13, color: 'var(--color-neutral-750)', margin: 0 }}>Manage client applications, unique IDs, and access permissions</p>
        </div>
        <Button variant="primary" iconLeading={<Icon name="add" size="sm" color="#000f47" />}>
          Register Application
        </Button>
      </div>

      <Card title="Registered Applications" padding="none">
        <Table
          columns={columns as Parameters<typeof Table>[0]['columns']}
          rows={apps as unknown as Parameters<typeof Table>[0]['rows']}
          keyField="name"
        />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatCard label="Total Applications"    value="4" icon="open-in-browser" />
        <StatCard label="Active Applications"   value="2" icon="check-circle-outline" />
        <StatCard label="Inactive Applications" value="2" icon="error-outline" />
      </div>
    </div>
  )
}

function EventsPage() {
  const eventCols = [
    { key: 'name', header: 'Event Name', render: (r: typeof events[0]) => <CodeChip>{r.name}</CodeChip> },
    { key: 'desc', header: 'Description', render: (r: typeof events[0]) => <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>{r.desc}</span> },
    { key: 'app',  header: 'Application', render: (r: typeof events[0]) => <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-brand-midnight)' }}>{r.app}</span> },
    { key: 'templates', header: 'Templates', render: (r: typeof events[0]) => <Badge label={`${r.templates} templates`} variant="info" /> },
    { key: 'status', header: 'Status', render: (r: typeof events[0]) => <Badge label={r.status} variant={statusVariant(r.status)} /> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-brand-midnight)', margin: '0 0 4px' }}>Events &amp; Templates</h1>
          <p style={{ fontSize: 13, color: 'var(--color-neutral-750)', margin: 0 }}>Register notification events and create customisable templates</p>
        </div>
        <Button variant="primary" iconLeading={<Icon name="add" size="sm" color="#000f47" />}>
          Create Event
        </Button>
      </div>

      <Tabs
        tabs={[
          {
            id: 'events',
            label: 'Events',
            content: (
              <div style={{ marginTop: 16 }}>
                <Card title="Registered Events" padding="none">
                  <Table
                    columns={eventCols as Parameters<typeof Table>[0]['columns']}
                    rows={events as unknown as Parameters<typeof Table>[0]['rows']}
                    keyField="name"
                  />
                </Card>
              </div>
            ),
          },
          {
            id: 'templates',
            label: 'Templates',
            content: (
              <div style={{ marginTop: 16 }}>
                <Card padding="medium">
                  <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--color-neutral-750)', fontSize: 14 }}>
                    Select an event to view its templates.
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

function LogsPage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = statusFilter === 'all'
    ? deliveryLogs
    : deliveryLogs.filter(l => l.status === statusFilter || (statusFilter === 'failed' && l.status === 'danger'))

  const logCols = [
    { key: 'ts',       header: 'Timestamp',  render: (r: typeof deliveryLogs[0]) => <span style={{ fontSize: 11, color: 'var(--color-neutral-750)', whiteSpace: 'nowrap' as const }}>{r.ts}</span> },
    { key: 'event',    header: 'Event',      render: (r: typeof deliveryLogs[0]) => <CodeChip>{r.event}</CodeChip> },
    { key: 'template', header: 'Template',   render: (r: typeof deliveryLogs[0]) => <span style={{ fontSize: 13 }}>{r.template}</span> },
    { key: 'recipient',header: 'Recipient',  render: (r: typeof deliveryLogs[0]) => <span style={{ fontSize: 12, color: 'var(--color-neutral-750)' }}>{r.recipient}</span> },
    { key: 'channel',  header: 'Channel',    render: (r: typeof deliveryLogs[0]) => <CodeChip>{r.channel}</CodeChip> },
    { key: 'status',   header: 'Status',     render: (r: typeof deliveryLogs[0]) => <Badge label={r.status} variant={statusVariant(r.status)} /> },
    { key: 'detail',   header: 'Details',    render: (r: typeof deliveryLogs[0]) => <span style={{ fontSize: 12, color: r.status === 'danger' ? 'var(--color-status-danger)' : r.status === 'warning' ? 'var(--color-status-warning-text)' : 'var(--color-status-success)' }}>{r.detail}</span> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-brand-midnight)', margin: '0 0 4px' }}>Logs &amp; Audit Trail</h1>
        <p style={{ fontSize: 13, color: 'var(--color-neutral-750)', margin: 0 }}>View delivery logs and track system changes for compliance</p>
      </div>

      <Tabs
        tabs={[
          {
            id: 'delivery',
            label: 'Delivery Logs',
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  <StatCard label="Total Deliveries" value="8"  sub="Last 24 hours"    icon="list-alt" />
                  <StatCard label="Successful"       value="5"  sub="62.5% success rate" valueColor="var(--color-status-success)" icon="check-circle-outline" />
                  <StatCard label="Failed"           value="2"  sub="Requires attention" valueColor="var(--color-status-danger)"  icon="error-outline" />
                  <StatCard label="Pending"          value="1"  sub="In progress"        valueColor="var(--color-status-warning)" icon="warning-amber" />
                </div>

                <Card title="Filter Logs" padding="medium">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <Input placeholder="Search by recipient, event, or template…" />
                    </div>
                    <Select
                      options={[
                        { label: 'All Status', value: 'all' },
                        { label: 'Success', value: 'success' },
                        { label: 'Failed', value: 'failed' },
                        { label: 'Pending', value: 'warning' },
                      ]}
                      value={statusFilter}
                      onChange={setStatusFilter}
                    />
                  </div>
                </Card>

                <Card title="Delivery Logs" padding="none">
                  <Table
                    columns={logCols as Parameters<typeof Table>[0]['columns']}
                    rows={filtered as unknown as Parameters<typeof Table>[0]['rows']}
                    keyField="ts"
                  />
                </Card>
              </div>
            ),
          },
          {
            id: 'audit',
            label: 'Audit Trail',
            content: (
              <div style={{ marginTop: 16 }}>
                <Card padding="medium">
                  <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--color-neutral-750)', fontSize: 14 }}>
                    Audit trail records will appear here.
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

// ─── Nav + Shell ──────────────────────────────────────────────────────────────

type Page = 'dashboard' | 'applications' | 'events' | 'logs'

const NAV: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',          icon: 'bar-chart' },
  { id: 'applications', label: 'Applications',       icon: 'open-in-browser' },
  { id: 'events',       label: 'Events & Templates', icon: 'calendar-today' },
  { id: 'logs',         label: 'Logs & Audit',       icon: 'description' },
]

function NotificationsHubApp() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-family)' }}>

      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: 'var(--color-brand-midnight)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Logo area */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 'var(--radius-default)',
              background: 'var(--color-brand-sky)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="notifications" size="sm" color="var(--color-brand-midnight)" />
            </div>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Notifications Hub</span>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '10px 12px',
                  borderRadius: 'var(--radius-default)',
                  border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(206,236,255,0.15)' : 'transparent',
                  color: active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)',
                  fontSize: 14, fontWeight: active ? 500 : 400,
                  marginBottom: 2, textAlign: 'left',
                  transition: 'background 150ms',
                }}
              >
                <Icon name={item.icon} size="sm" color={active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)'} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Logo footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={marshLogoWhite} alt="Marsh" style={{ height: 24, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top header */}
        <header style={{
          height: 56,
          borderBottom: '1px solid var(--color-neutral-250)',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          flexShrink: 0,
        }}>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--color-neutral-750)' }}>Good morning, Admin</span>
            <Avatar initials="A" size="small" />
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-neutral-250)' }}>
          {page === 'dashboard'    && <DashboardPage />}
          {page === 'applications' && <ApplicationsPage />}
          {page === 'events'       && <EventsPage />}
          {page === 'logs'         && <LogsPage />}
        </main>
      </div>
    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Prototypes/Notifications Hub',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <NotificationsHubApp />,
}
