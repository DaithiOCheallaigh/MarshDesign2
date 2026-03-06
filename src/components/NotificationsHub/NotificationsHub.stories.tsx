import { useState, useRef, useEffect } from 'react'
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
import { Switch } from '../Switch'
import { Dialog } from '../Dialog'
import { IconButton } from '../IconButton'
import { LineChart, PieChart, MetricContainer } from '../Charts'
import { Skeleton } from '../Skeleton'
import { TextArea } from '../TextArea'

const BASE = import.meta.env.BASE_URL
const marshLogoWhite = `${BASE}assets/marsh-logo-new-white.png`

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

const initialApps = [
  { name: 'E-Commerce Platform', desc: 'Online shopping and order management',      id: 'app_live_a8f3••••o6p7', status: 'inactive', perms: ['send_email', 'send_sms', 'send_push'], lastUsed: '2 hours ago' },
  { name: 'Banking Portal',      desc: 'Customer banking and transaction services', id: 'app_live_b9g4••••p7q8', status: 'active',   perms: ['send_email', 'send_sms'],              lastUsed: '5 min ago' },
  { name: 'Healthcare System',   desc: 'Patient management and appointments',       id: 'app_live_c0h5••••q8r9', status: 'active',   perms: ['send_email', 'send_push'],             lastUsed: '1 day ago' },
  { name: 'Support Platform',    desc: 'Customer support ticketing system',         id: 'app_live_d1i6••••r9s0', status: 'inactive', perms: ['send_email'],                         lastUsed: '1 week ago' },
]

const events = [
  { name: 'user.registration',    desc: 'Triggered when a new user registers',  app: 'E-Commerce Platform', templates: 3, status: 'active' },
  { name: 'order.confirmed',      desc: 'Triggered when an order is confirmed', app: 'E-Commerce Platform', templates: 5, status: 'active' },
  { name: 'transaction.alert',    desc: 'Triggered for account transactions',   app: 'Banking Portal',      templates: 4, status: 'active' },
  { name: 'appointment.reminder', desc: 'Reminder for upcoming appointments',   app: 'Healthcare System',   templates: 2, status: 'active' },
]

const templates = [
  { name: 'Welcome Email – English',      event: 'user.registration',    channel: 'email', language: 'English', status: 'active' },
  { name: 'Welcome SMS – English',        event: 'user.registration',    channel: 'sms',   language: 'English', status: 'active' },
  { name: 'Welcome Push',                 event: 'user.registration',    channel: 'push',  language: 'English', status: 'active' },
  { name: 'Order Confirmation – Email',   event: 'order.confirmed',      channel: 'email', language: 'English', status: 'active' },
  { name: 'Order Confirmation – SMS',     event: 'order.confirmed',      channel: 'sms',   language: 'English', status: 'active' },
  { name: 'Order Confirmation – Push',    event: 'order.confirmed',      channel: 'push',  language: 'English', status: 'active' },
  { name: 'Transaction Alert – Email',    event: 'transaction.alert',    channel: 'email', language: 'English', status: 'active' },
  { name: 'Transaction Alert – SMS',      event: 'transaction.alert',    channel: 'sms',   language: 'English', status: 'active' },
  { name: 'Appointment Reminder – Email', event: 'appointment.reminder', channel: 'email', language: 'English', status: 'active' },
  { name: 'Appointment Reminder – SMS',   event: 'appointment.reminder', channel: 'sms',   language: 'English', status: 'active' },
]

const deliveryLogs = [
  { ts: '2025-01-15 14:32', event: 'order.confirmed',      template: 'Order Confirmation – Email', recipient: 'john.doe@example.com',   channel: 'email', status: 'success', detail: 'Delivered in 2.3s' },
  { ts: '2025-01-15 14:31', event: 'user.registration',    template: 'Welcome Email – English',    recipient: 'jane.smith@example.com', channel: 'email', status: 'success', detail: 'Delivered in 1.8s' },
  { ts: '2025-01-15 14:30', event: 'transaction.alert',    template: 'Transaction Alert – SMS',    recipient: '+1-555-0103',             channel: 'sms',   status: 'danger',  detail: 'Invalid phone number' },
  { ts: '2025-01-15 14:29', event: 'appointment.reminder', template: 'Appointment Reminder – SMS', recipient: '+1-555-0104',             channel: 'sms',   status: 'success', detail: 'Delivered in 0.9s' },
  { ts: '2025-01-15 14:28', event: 'order.confirmed',      template: 'Order Confirmation – Push',  recipient: 'device_token_abc',        channel: 'push',  status: 'warning', detail: 'In progress' },
  { ts: '2025-01-15 14:27', event: 'user.registration',    template: 'Welcome SMS – English',      recipient: '+1-555-0105',             channel: 'sms',   status: 'warning', detail: 'Processing...' },
  { ts: '2025-01-15 14:26', event: 'transaction.alert',    template: 'Transaction Alert – Email',  recipient: 'bob.johnson@example.com', channel: 'email', status: 'danger',  detail: 'SMTP connection timeout' },
  { ts: '2025-01-15 14:25', event: 'order.confirmed',      template: 'Order Confirmation – Push',  recipient: 'user_12345',              channel: 'push',  status: 'success', detail: 'Delivered in 0.5s' },
]

const auditTrail = [
  { action: 'Application Registered',    desc: 'E-Commerce Platform registered with send_email, send_sms, send_push permissions', ts: '2025-01-15 14:35', actor: 'admin@company.com', color: '#0b4bff' },
  { action: 'Event Created',             desc: 'order.confirmed event created for E-Commerce Platform',                           ts: '2025-01-15 13:20', actor: 'admin@company.com', color: '#14853d' },
  { action: 'Template Updated',          desc: 'Welcome Email – English template body content updated',                           ts: '2025-01-15 12:10', actor: 'admin@company.com', color: '#ffbf00' },
  { action: 'Application Status Changed',desc: 'Banking Portal status changed from inactive to active',                           ts: '2025-01-14 16:45', actor: 'admin@company.com', color: '#0b4bff' },
  { action: 'User Role Updated',         desc: 'john.doe@company.com role changed from App Owner to Admin',                       ts: '2025-01-14 10:30', actor: 'admin@company.com', color: '#7b7974' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'default'

function statusVariant(s: string): BadgeVariant {
  if (s === 'active'  || s === 'success') return 'success'
  if (s === 'failed'  || s === 'danger')  return 'danger'
  if (s === 'pending' || s === 'warning') return 'warning'
  if (s === 'inactive') return 'default'
  return 'info'
}

function CodeChip({ children }: { children: string }) {
  return (
    <code style={{
      display: 'inline-block',
      padding: '2px 6px',
      borderRadius: 'var(--radius-small)',
      background: 'var(--color-neutral-250)',
      fontFamily: 'monospace',
      fontSize: 'var(--font-size-xs)',
      color: 'var(--color-brand-midnight)',
    }}>
      {children}
    </code>
  )
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-brand-midnight)', margin: '0 0 var(--spacing-xs)', lineHeight: 1.2 }}>
        {title}
      </h1>
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', margin: 0, lineHeight: 1.5 }}>
        {subtitle}
      </p>
    </div>
  )
}

// Click-triggered row actions dropdown
function ActionsMenu({ items }: { items: Array<{ label: string; onClick: () => void; danger?: boolean }> }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <IconButton
        icon={<Icon name="more-vert" size="sm" color="var(--color-neutral-750)" />}
        label="Actions"
        variant="ghost"
        size="small"
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 200, background: 'var(--color-white)', border: '1px solid var(--color-gray-100)', borderRadius: 'var(--radius-medium)', boxShadow: '0 4px 16px rgba(0,15,71,0.12)', minWidth: 148, padding: '4px 0' }}>
          {items.map(item => (
            <button
              key={item.label}
              onClick={() => { item.onClick(); setOpen(false) }}
              style={{ display: 'block', width: '100%', padding: '8px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: item.danger ? 'var(--color-status-danger)' : 'var(--color-brand-midnight)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-neutral-250)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardPage({ showData }: { showData: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <PageHeading title="Dashboard" subtitle="Real-time overview of notification activity and system performance" />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
        {showData ? (
          <>
            <MetricContainer label="Total Sent (24h)"   value="15,720" trend="up"   trendValue="+12.5% from yesterday"  icon={<Icon name="notifications"       size="sm" color="var(--color-neutral-750)" />} />
            <MetricContainer label="Success Rate"        value="97.2%"  description="15,334 delivered successfully"     icon={<Icon name="check-circle-outline" size="sm" color="var(--color-neutral-750)" />} />
            <MetricContainer label="Failed Deliveries"   value="386"    trend="down" trendValue="Requires attention"    icon={<Icon name="error-outline"        size="sm" color="var(--color-neutral-750)" />} />
          </>
        ) : (
          [0,1,2].map(i => (
            <Card key={i} padding="medium">
              <Skeleton variant="text" width="60%" />
              <div style={{ marginTop: 8 }}><Skeleton variant="text" width="40%" /></div>
            </Card>
          ))
        )}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
        <Card title="Notification Trends" padding="medium">
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', margin: '0 0 var(--spacing-sm)', lineHeight: 1.5 }}>
            Last 7 days delivery statistics
          </p>
          {showData
            ? <LineChart data={trendData} series={trendSeries} xKey="date" height={200} />
            : <Skeleton variant="rect" height={200} />}
        </Card>

        <Card title="Channel Distribution" padding="medium">
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', margin: '0 0 var(--spacing-sm)', lineHeight: 1.5 }}>
            Notifications by delivery channel
          </p>
          {showData ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
              <div style={{ flex: '0 0 200px' }}>
                <PieChart data={channelData} height={200} showLegend={false} donut />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {channelData.map(d => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', width: 44 }}>{d.label}</span>
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-brand-midnight)' }}>{d.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : <Skeleton variant="rect" height={200} />}
        </Card>
      </div>

      {/* Recent activity */}
      <Card title="Recent Activity" padding="none">
        {showData ? recentActivity.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-sm) var(--spacing-lg)', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-neutral-250)' : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-brand-sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="notifications" size="sm" color="var(--color-brand-midnight)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', lineHeight: 1.4 }}>{item.name}</div>
              <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', lineHeight: 1.4 }}>{item.app}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-brand-midnight)' }}>{item.count.toLocaleString()}</div>
              <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-750)' }}>{item.time}</div>
            </div>
          </div>
        )) : (
          <div style={{ padding: 'var(--spacing-md)' }}>
            {[0,1,2,3].map(i => <div key={i} style={{ marginBottom: 12 }}><Skeleton variant="text" /></div>)}
          </div>
        )}
      </Card>

      {/* Secondary metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
        {showData ? (
          <>
            <MetricContainer label="Active Applications" value="24"     description="8 registered this month" icon={<Icon name="open-in-browser"   size="sm" color="var(--color-neutral-750)" />} />
            <MetricContainer label="Active Events"       value="47"     description="Across all applications" icon={<Icon name="calendar-today"    size="sm" color="var(--color-neutral-750)" />} />
            <MetricContainer label="Total Recipients"    value="12,847" trend="up" trendValue="+342 this week" icon={<Icon name="group"             size="sm" color="var(--color-neutral-750)" />} />
          </>
        ) : (
          [0,1,2].map(i => (
            <Card key={i} padding="medium">
              <Skeleton variant="text" width="60%" />
              <div style={{ marginTop: 8 }}><Skeleton variant="text" width="40%" /></div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

type AppRow = (typeof initialApps)[0] & { status: string }

function ApplicationsPage() {
  const [apps, setApps] = useState<AppRow[]>(initialApps)

  const toggleStatus = (name: string) =>
    setApps(prev => prev.map(a => a.name === name ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a))

  const active   = apps.filter(a => a.status === 'active').length
  const inactive = apps.filter(a => a.status === 'inactive').length

  const columns = [
    {
      key: 'app', header: 'Application',
      render: (row: AppRow) => (
        <div>
          <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', lineHeight: 1.4 }}>{row.name}</div>
          <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', lineHeight: 1.4 }}>{row.desc}</div>
        </div>
      ),
    },
    {
      key: 'id', header: 'Application ID',
      render: (row: AppRow) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <CodeChip>{row.id}</CodeChip>
          <Icon name="visibility"    size="sm" color="var(--color-neutral-750)" style={{ cursor: 'pointer' }} />
          <Icon name="content-copy"  size="sm" color="var(--color-neutral-750)" style={{ cursor: 'pointer' }} />
        </div>
      ),
    },
    { key: 'status',   header: 'Status',      render: (row: AppRow) => <Badge label={row.status} variant={statusVariant(row.status)} /> },
    {
      key: 'perms', header: 'Permissions',
      render: (row: AppRow) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
          {row.perms.map(p => <CodeChip key={p}>{p}</CodeChip>)}
        </div>
      ),
    },
    {
      key: 'lastUsed', header: 'Last Used',
      render: (row: AppRow) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>{row.lastUsed}</span>,
    },
    {
      key: 'actions', header: 'Actions',
      render: (row: AppRow) => (
        <ActionsMenu items={[
          { label: row.status === 'active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(row.name) },
          { label: 'Copy App ID', onClick: () => navigator.clipboard?.writeText(row.id) },
          { label: 'Delete',      onClick: () => {}, danger: true },
        ]} />
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <PageHeading title="Application Registration" subtitle="Manage client applications, unique IDs, and access permissions" />
        <Button variant="secondary" iconLeading={<Icon name="add" size="sm" color="var(--color-white)" />}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
        <MetricContainer label="Total Applications"    value={String(apps.length)} icon={<Icon name="open-in-browser"      size="sm" color="var(--color-neutral-750)" />} />
        <MetricContainer label="Active Applications"   value={String(active)}      icon={<Icon name="check-circle-outline" size="sm" color="var(--color-neutral-750)" />} />
        <MetricContainer label="Inactive Applications" value={String(inactive)}    icon={<Icon name="error-outline"        size="sm" color="var(--color-neutral-750)" />} />
      </div>
    </div>
  )
}

function EventsPage() {
  const eventCols = [
    { key: 'name', header: 'Event Name', render: (r: (typeof events)[0]) => <CodeChip>{r.name}</CodeChip> },
    {
      key: 'desc', header: 'Description',
      render: (r: (typeof events)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', lineHeight: 1.5 }}>{r.desc}</span>,
    },
    {
      key: 'app', header: 'Application',
      render: (r: (typeof events)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)' }}>{r.app}</span>,
    },
    { key: 'templates', header: 'Templates', render: (r: (typeof events)[0]) => <Badge label={`${r.templates} templates`} variant="info" /> },
    { key: 'status',    header: 'Status',    render: (r: (typeof events)[0]) => <Badge label={r.status} variant={statusVariant(r.status)} /> },
    {
      key: 'actions', header: 'Actions',
      render: () => (
        <ActionsMenu items={[
          { label: 'View Templates', onClick: () => {} },
          { label: 'Edit Event',     onClick: () => {} },
          { label: 'Delete',         onClick: () => {}, danger: true },
        ]} />
      ),
    },
  ]

  const templateCols = [
    {
      key: 'name', header: 'Template Name',
      render: (r: (typeof templates)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)' }}>{r.name}</span>,
    },
    { key: 'event',   header: 'Event',    render: (r: (typeof templates)[0]) => <CodeChip>{r.event}</CodeChip> },
    { key: 'channel', header: 'Channel',  render: (r: (typeof templates)[0]) => <CodeChip>{r.channel}</CodeChip> },
    {
      key: 'language', header: 'Language',
      render: (r: (typeof templates)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>{r.language}</span>,
    },
    { key: 'status', header: 'Status', render: (r: (typeof templates)[0]) => <Badge label={r.status} variant={statusVariant(r.status)} /> },
    {
      key: 'actions', header: 'Actions',
      render: () => (
        <ActionsMenu items={[
          { label: 'Edit Template', onClick: () => {} },
          { label: 'Duplicate',     onClick: () => {} },
          { label: 'Delete',        onClick: () => {}, danger: true },
        ]} />
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <PageHeading title="Events & Templates" subtitle="Register notification events and create customisable templates" />
        <Button variant="secondary" iconLeading={<Icon name="add" size="sm" color="var(--color-white)" />}>
          Create Event
        </Button>
      </div>

      <Tabs
        tabs={[
          {
            id: 'events',
            label: 'Events',
            content: (
              <div style={{ marginTop: 'var(--spacing-md)' }}>
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
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <Card title="Notification Templates" padding="none">
                  <Table
                    columns={templateCols as Parameters<typeof Table>[0]['columns']}
                    rows={templates as unknown as Parameters<typeof Table>[0]['rows']}
                    keyField="name"
                  />
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
    {
      key: 'ts', header: 'Timestamp',
      render: (r: (typeof deliveryLogs)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-750)', whiteSpace: 'nowrap' as const }}>{r.ts}</span>,
    },
    { key: 'event',   header: 'Event',   render: (r: (typeof deliveryLogs)[0]) => <CodeChip>{r.event}</CodeChip> },
    {
      key: 'template', header: 'Template',
      render: (r: (typeof deliveryLogs)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', color: 'var(--color-brand-midnight)' }}>{r.template}</span>,
    },
    {
      key: 'recipient', header: 'Recipient',
      render: (r: (typeof deliveryLogs)[0]) => <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>{r.recipient}</span>,
    },
    { key: 'channel', header: 'Channel', render: (r: (typeof deliveryLogs)[0]) => <CodeChip>{r.channel}</CodeChip> },
    { key: 'status',  header: 'Status',  render: (r: (typeof deliveryLogs)[0]) => <Badge label={r.status === 'danger' ? 'failed' : r.status} variant={statusVariant(r.status)} /> },
    {
      key: 'detail', header: 'Details',
      render: (r: (typeof deliveryLogs)[0]) => {
        const color = r.status === 'danger' ? 'var(--color-status-danger)' : r.status === 'warning' ? 'var(--color-neutral-750)' : 'var(--color-status-success)'
        return <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color }}>{r.detail}</span>
      },
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <PageHeading title="Logs & Audit Trail" subtitle="View delivery logs and track system changes for compliance" />

      <Tabs
        tabs={[
          {
            id: 'delivery',
            label: 'Delivery Logs',
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
                  <MetricContainer label="Total Deliveries" value="8" description="Last 24 hours"       icon={<Icon name="list-alt"             size="sm" color="var(--color-neutral-750)" />} />
                  <MetricContainer label="Successful"       value="5" description="62.5% success rate"  trend="up"   trendValue="Success"           icon={<Icon name="check-circle-outline" size="sm" color="var(--color-neutral-750)" />} />
                  <MetricContainer label="Failed"           value="2" trend="down" trendValue="Requires attention"                                    icon={<Icon name="error-outline"        size="sm" color="var(--color-neutral-750)" />} />
                  <MetricContainer label="Pending"          value="1" description="In progress"         icon={<Icon name="warning-amber"         size="sm" color="var(--color-neutral-750)" />} />
                </div>

                <Card title="Filter Logs" padding="medium">
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Input placeholder="Search by recipient, event, or template…" />
                    </div>
                    <Select
                      options={[
                        { label: 'All Status', value: 'all' },
                        { label: 'Success',    value: 'success' },
                        { label: 'Failed',     value: 'failed' },
                        { label: 'Pending',    value: 'warning' },
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
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <Card title="System Audit Trail" padding="medium">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {auditTrail.map((entry, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < auditTrail.length - 1 ? 20 : 0, position: 'relative' }}>
                        {/* Timeline connector */}
                        {i < auditTrail.length - 1 && (
                          <div style={{ position: 'absolute', left: 10, top: 22, bottom: 0, width: 2, background: 'var(--color-neutral-250)' }} />
                        )}
                        {/* Dot */}
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: entry.color, flexShrink: 0, marginTop: 2, zIndex: 1, border: '3px solid var(--color-white)', boxShadow: `0 0 0 2px ${entry.color}` }} />
                        {/* Content */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)' }}>
                              {entry.action}
                            </span>
                            <span style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-750)', flexShrink: 0, marginLeft: 16 }}>
                              {entry.ts}
                            </span>
                          </div>
                          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', margin: '0 0 2px', lineHeight: 1.5 }}>
                            {entry.desc}
                          </p>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-500)' }}>
                            by {entry.actor}
                          </span>
                        </div>
                      </div>
                    ))}
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

// ─── Quick Setup Wizard ───────────────────────────────────────────────────────

type WizardStep = 1 | 2 | 3

function QuickSetupWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<WizardStep>(1)
  const [form, setForm] = useState({ appName: '', team: '', description: '', eventName: '', eventDesc: '' })

  const reset = () => { setStep(1); setForm({ appName: '', team: '', description: '', eventName: '', eventDesc: '' }) }
  const handleClose = () => { reset(); onClose() }

  const stepLabel = step === 1 ? 'Step 1 of 3 — Register Application'
    : step === 2 ? 'Step 2 of 3 — Create Event'
    : 'Setup Complete'

  return (
    <Dialog
      open={open}
      title="Quick Setup"
      onClose={handleClose}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>
            {stepLabel}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {step < 3 && <Button variant="ghost" onClick={handleClose}>Cancel</Button>}
            {step === 1 && (
              <Button variant="secondary" onClick={() => setStep(2)} disabled={!form.appName || !form.team}>Continue</Button>
            )}
            {step === 2 && (
              <>
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button variant="secondary" onClick={() => setStep(3)} disabled={!form.eventName}>Finish Setup</Button>
              </>
            )}
            {step === 3 && <Button variant="secondary" onClick={handleClose}>Done</Button>}
          </div>
        </div>
      }
    >
      {/* 3-segment progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {[1,2,3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: s <= step ? 'var(--color-brand-midnight)' : 'var(--color-neutral-250)', transition: 'background 0.2s' }} />
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', marginBottom: 6 }}>
              Application Name <span style={{ color: 'var(--color-status-danger)' }}>*</span>
            </label>
            <Input placeholder="e.g. Certificates, Milestone Management" value={form.appName} onChange={e => setForm(f => ({ ...f, appName: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', marginBottom: 6 }}>
              Your Name and Team <span style={{ color: 'var(--color-status-danger)' }}>*</span>
            </label>
            <Input placeholder="e.g. Jane Smith · Digital Client Lifecycle" value={form.team} onChange={e => setForm(f => ({ ...f, team: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', marginBottom: 6 }}>
              Description
            </label>
            <TextArea placeholder="Describe what this application does and how it will use notifications…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 12, background: 'var(--color-neutral-250)', borderRadius: 'var(--radius-medium)', borderLeft: '3px solid var(--color-brand-midnight)' }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>
              Application: <strong style={{ color: 'var(--color-brand-midnight)' }}>{form.appName}</strong>
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', marginBottom: 6 }}>
              Event Name <span style={{ color: 'var(--color-status-danger)' }}>*</span>
            </label>
            <Input placeholder="e.g. user.registration" value={form.eventName} onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} />
            <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-750)', margin: '4px 0 0' }}>
              Use lowercase dot notation: e.g. order.confirmed
            </p>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)', marginBottom: 6 }}>
              Event Description
            </label>
            <Input placeholder="Describe when this event is triggered…" value={form.eventDesc} onChange={e => setForm(f => ({ ...f, eventDesc: e.target.value }))} />
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-status-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Icon name="check-circle-outline" size="lg" color="var(--color-status-success)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-xl)', color: 'var(--color-brand-midnight)', margin: '0 0 8px' }}>
            Setup Complete
          </h3>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)', margin: '0 0 20px', lineHeight: 1.6 }}>
            <strong>{form.appName}</strong> has been registered and the <strong>{form.eventName}</strong> event is ready.
            You can now create templates to customise how notifications are delivered.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', padding: '12px 0', borderTop: '1px solid var(--color-neutral-250)' }}>
            {[{ label: 'Application', value: form.appName }, { label: 'Event', value: form.eventName }, { label: 'Team', value: form.team }].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-750)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-midnight)' }}>{item.value || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Dialog>
  )
}

// ─── Shell ────────────────────────────────────────────────────────────────────

type Page = 'dashboard' | 'applications' | 'events' | 'logs'

const NAV: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',          icon: 'bar-chart' },
  { id: 'applications', label: 'Applications',       icon: 'open-in-browser' },
  { id: 'events',       label: 'Events & Templates', icon: 'calendar-today' },
  { id: 'logs',         label: 'Logs & Audit',       icon: 'description' },
]

function NotificationsHubApp() {
  const [page, setPage]         = useState<Page>('dashboard')
  const [showData, setShowData] = useState(true)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-family)' }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 240, background: 'var(--color-brand-midnight)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-default)', background: 'var(--color-brand-sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="notifications" size="sm" color="var(--color-brand-midnight)" />
            </div>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-white)', lineHeight: 1.4 }}>
              Notifications Hub
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: 'var(--spacing-sm)' }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)',
                  width: '100%', padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--radius-default)',
                  border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(206,236,255,0.15)' : 'transparent',
                  color: active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)',
                  fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                  marginBottom: 'var(--spacing-xs)', textAlign: 'left',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <Icon name={item.icon} size="sm" color={active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)'} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={marshLogoWhite} alt="Marsh" style={{ height: 24, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <header style={{ height: 56, borderBottom: '1px solid var(--color-neutral-250)', background: 'var(--color-white)', display: 'flex', alignItems: 'center', padding: '0 var(--spacing-lg)', flexShrink: 0, gap: 'var(--spacing-sm)' }}>
          {/* Display Data toggle */}
          <Switch label="Display Data" checked={showData} onChange={e => setShowData(e.target.checked)} />

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>
              Good morning, Admin
            </span>
            <Avatar initials="A" size="small" />
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg)', background: 'var(--color-neutral-250)' }}>
          {page === 'dashboard'    && <DashboardPage showData={showData} />}
          {page === 'applications' && <ApplicationsPage />}
          {page === 'events'       && <EventsPage />}
          {page === 'logs'         && <LogsPage />}
        </main>
      </div>

    </div>
  )
}

// ─── First Time User Shell ────────────────────────────────────────────────────

function NotificationsHubFirstTimeUser() {
  const [page, setPage]           = useState<Page>('dashboard')
  const [wizardOpen, setWizardOpen] = useState(false)

  // Auto-open Quick Setup after 5 seconds to demonstrate first-time user flow
  useEffect(() => {
    const t = setTimeout(() => setWizardOpen(true), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-family)' }}>

      {/* ── Sidebar (same as main) ── */}
      <aside style={{ width: 240, background: 'var(--color-brand-midnight)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-default)', background: 'var(--color-brand-sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="notifications" size="sm" color="var(--color-brand-midnight)" />
            </div>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-white)', lineHeight: 1.4 }}>
              Notifications Hub
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: 'var(--spacing-sm)' }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)',
                  width: '100%', padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--radius-default)',
                  border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(206,236,255,0.15)' : 'transparent',
                  color: active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-base)',
                  fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                  marginBottom: 'var(--spacing-xs)', textAlign: 'left',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <Icon name={item.icon} size="sm" color={active ? 'var(--color-brand-sky)' : 'rgba(255,255,255,0.7)'} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={marshLogoWhite} alt="Marsh" style={{ height: 24, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Clean header — no controls for first-time user */}
        <header style={{ height: 56, borderBottom: '1px solid var(--color-neutral-250)', background: 'var(--color-white)', display: 'flex', alignItems: 'center', padding: '0 var(--spacing-lg)', flexShrink: 0 }}>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-750)' }}>
              Good morning, Admin
            </span>
            <Avatar initials="A" size="small" />
          </div>
        </header>

        {/* Dashboard locked to skeleton state — no data yet */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg)', background: 'var(--color-neutral-250)' }}>
          {page === 'dashboard'    && <DashboardPage showData={false} />}
          {page === 'applications' && <ApplicationsPage />}
          {page === 'events'       && <EventsPage />}
          {page === 'logs'         && <LogsPage />}
        </main>
      </div>

      {/* Quick Setup auto-launches after 5 s */}
      <QuickSetupWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
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

export const FirstTimeUser: Story = {
  name: 'First Time User',
  render: () => <NotificationsHubFirstTimeUser />,
}
