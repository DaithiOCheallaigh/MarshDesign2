import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import marshLogoWhite from '../../public/marsh-logo-white.png'
import {
  Bell, LayoutDashboard, AppWindow, CalendarDays, ClipboardList,
  MoreVertical, Plus,
  Search, TrendingUp, Users, CheckCircle2, XCircle, Clock,
  Activity, Eye, Copy,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

// ─── Data ────────────────────────────────────────────────────────────────────

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

const trendConfig = {
  sent:    { label: 'Sent',    color: '#0C103D' },
  success: { label: 'Success', color: '#16A34A' },
  failed:  { label: 'Failed',  color: '#DC2626' },
}

const channelData = [
  { name: 'Email',  value: 8420, pct: '54%', color: '#0C103D' },
  { name: 'SMS',    value: 3210, pct: '20%', color: '#4EA8DE' },
  { name: 'Push',   value: 2850, pct: '18%', color: '#F97316' },
  { name: 'In-App', value: 1240, pct: '8%',  color: '#16A34A' },
]

const recentActivity = [
  { name: 'Order Confirmation',   app: 'E-Commerce App',    count: 423,  time: '2 min ago' },
  { name: 'Transaction Alert',    app: 'Banking Portal',    count: 867,  time: '5 min ago' },
  { name: 'Appointment Reminder', app: 'Healthcare System', count: 156,  time: '12 min ago' },
  { name: 'Ticket Update',        app: 'Support Platform',  count: 234,  time: '18 min ago' },
]

const apps = [
  {
    name: 'E-Commerce Platform', desc: 'Online shopping and order management system',
    id: 'app_live_a8f3••••••••••••••••o6p7', status: 'inactive',
    perms: ['send_email', 'send_sms', 'send_push'], lastUsed: '2 hours ago',
  },
  {
    name: 'Banking Portal', desc: 'Customer banking and transaction services',
    id: 'app_live_b9g4••••••••••••••••p7q8', status: 'active',
    perms: ['send_email', 'send_sms'], lastUsed: '5 min ago',
  },
  {
    name: 'Healthcare System', desc: 'Patient management and appointment scheduling',
    id: 'app_live_c0h5••••••••••••••••q8r9', status: 'active',
    perms: ['send_email', 'send_push'], lastUsed: '1 day ago',
  },
  {
    name: 'Support Platform', desc: 'Customer support ticketing system',
    id: 'app_live_d1i6••••••••••••••••r9s0', status: 'inactive',
    perms: ['send_email'], lastUsed: '1 week ago',
  },
]

const events = [
  { name: 'user.registration',   desc: 'Triggered when a new user registers',       app: 'E-Commerce Platform', templates: 3, status: 'active' },
  { name: 'order.confirmed',     desc: 'Triggered when an order is confirmed',       app: 'E-Commerce Platform', templates: 5, status: 'active' },
  { name: 'transaction.alert',   desc: 'Triggered for account transactions',         app: 'Banking Portal',      templates: 4, status: 'active' },
  { name: 'appointment.reminder',desc: 'Reminder for upcoming appointments',         app: 'Healthcare System',   templates: 2, status: 'active' },
]

const deliveryLogs = [
  { ts: '2025-01-15 14:32:15', event: 'order.confirmed',     template: 'Order Confirmation - Email', recipient: 'john.doe@example.com', channel: 'email', status: 'success', detail: 'Delivered in 2.3s' },
  { ts: '2025-01-15 14:31:42', event: 'user.registration',   template: 'Welcome Email - English',    recipient: 'jane.smith@example.com', channel: 'email', status: 'success', detail: 'Delivered in 1.8s' },
  { ts: '2025-01-15 14:30:58', event: 'transaction.alert',   template: 'Transaction Alert - SMS',    recipient: '+1-555-0103',            channel: 'sms',   status: 'failed',  detail: 'Invalid phone number format' },
  { ts: '2025-01-15 14:29:23', event: 'appointment.reminder',template: 'Appointment Reminder - SMS', recipient: '+1-555-0104',            channel: 'sms',   status: 'success', detail: 'Delivered in 0.9s' },
  { ts: '2025-01-15 14:28:44', event: 'order.confirmed',     template: 'Order Confirmation - Push',  recipient: 'device_token_abc',       channel: 'push',  status: 'pending', detail: 'In progress' },
]

// ─── Shared helpers ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === 'active' || status === 'success') {
    return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">{status}</Badge>
  }
  if (status === 'failed') {
    return <Badge className="bg-red-100 text-red-600 border-red-200 hover:bg-red-100">{status}</Badge>
  }
  if (status === 'pending') {
    return <Badge className="bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-100">{status}</Badge>
  }
  return <Badge variant="secondary">{status}</Badge>
}

function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
      {children}
    </span>
  )
}

function StatCard({ label, value, sub, subColor, icon: Icon }: {
  label: string; value: string; sub: string; subColor?: string; icon: React.ElementType
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${subColor ?? 'text-foreground'}`}>{value}</p>
        <p className={`mt-1 text-xs ${subColor === 'text-red-600' ? 'text-muted-foreground' : subColor === 'text-green-600' ? 'text-green-600' : 'text-muted-foreground'}`}>
          {sub}
        </p>
      </CardContent>
    </Card>
  )
}

// ─── Sidebar nav ─────────────────────────────────────────────────────────────

type Page = 'dashboard' | 'applications' | 'events' | 'logs'

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard',    label: 'Dashboard',           icon: LayoutDashboard },
  { id: 'applications', label: 'Applications',        icon: AppWindow },
  { id: 'events',       label: 'Events & Templates',  icon: CalendarDays },
  { id: 'logs',         label: 'Logs & Audit',        icon: ClipboardList },
]

const navyStyle = {
  '--sidebar':                    '#0C103D',
  '--sidebar-foreground':         'rgba(255,255,255,0.75)',
  '--sidebar-border':             'rgba(255,255,255,0.08)',
  '--sidebar-accent':             'rgba(255,255,255,0.08)',
  '--sidebar-accent-foreground':  '#ffffff',
  '--sidebar-primary':            'rgba(198,232,245,0.18)',
  '--sidebar-primary-foreground': '#C6E8F5',
  '--sidebar-ring':               '#C6E8F5',
} as React.CSSProperties

function AppSidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-[#C6E8F5]">
            <Bell className="size-4 text-[#0C103D]" />
          </div>
          <span className="text-sm font-semibold text-white">Notifications Hub</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={page === item.id}
                    onClick={() => setPage(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4">
        <img
          src={marshLogoWhite}
          alt="Marsh"
          width={434} height={95}
          className="h-6 w-auto object-contain object-left"
        />
      </SidebarFooter>
    </Sidebar>
  )
}

// ─── Top header ──────────────────────────────────────────────────────────────

function TopHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b bg-background px-6">
      <div className="ml-auto flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Good Morning, Admin</span>
        <Avatar className="size-8">
          <AvatarFallback className="bg-[#0C103D] text-white text-xs">A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0C103D]">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time overview of notification activity and system performance</p>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent (24h)</CardTitle>
              <Bell className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#0C103D]">15,720</p>
            <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="size-3" /> +12.5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              <CheckCircle2 className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#0C103D]">97.2%</p>
            <p className="mt-1 text-xs text-muted-foreground">15,334 delivered successfully</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Failed Deliveries</CardTitle>
              <XCircle className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">386</p>
            <p className="mt-1 text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0C103D]">Notification Trends</CardTitle>
            <p className="text-xs text-muted-foreground">Last 7 days delivery statistics</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-52">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sent"    stroke="#0C103D" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="success" stroke="#16A34A" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="failed"  stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full bg-[#0C103D]" /> Sent</span>
              <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full bg-green-600" /> Success</span>
              <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full bg-red-600" /> Failed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0C103D]">Channel Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">Notifications by delivery channel</p>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div style={{ flexShrink: 0 }}>
              <PieChart width={220} height={220}>
                <Pie data={channelData} dataKey="value" cx={110} cy={110} outerRadius={100} labelLine={false}>
                  {channelData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2.5 text-sm">
              {channelData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="inline-block size-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-muted-foreground w-12">{d.name}</span>
                  <span className="font-medium text-xs">{d.value.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-1">{d.pct}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0C103D]">Recent Activity</CardTitle>
          <p className="text-xs text-muted-foreground">Latest notification events across all applications</p>
        </CardHeader>
        <CardContent className="p-0">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 border-b last:border-0 hover:bg-muted/30">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Bell className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0C103D]">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.app}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#0C103D]">{item.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        <StatCard label="Active Applications" value="24" sub="8 registered this month" icon={AppWindow} />
        <StatCard label="Active Events"       value="47" sub="Across all applications" icon={Activity} />
        <StatCard label="Total Recipients"    value="12,847" sub="+342 this week" icon={Users} />
      </div>
    </div>
  )
}

// ─── Applications page ────────────────────────────────────────────────────────

function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0C103D]">Application Registration</h1>
          <p className="text-sm text-muted-foreground">Manage client applications, unique IDs, and access permissions</p>
        </div>
        <Button className="bg-[#0C103D] hover:bg-[#0C103D]/90 text-white gap-1.5">
          <Plus className="size-4" /> Register Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0C103D]">Registered Applications</CardTitle>
          <p className="text-xs text-muted-foreground">4 applications registered</p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead style={{ paddingLeft: '1.5rem' }}>Application</TableHead>
                <TableHead>Application ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app.name}>
                  <TableCell style={{ paddingLeft: '1.5rem' }} className="whitespace-normal">
                    <p className="font-medium text-[#0C103D]">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.desc}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <code className="text-xs text-muted-foreground">{app.id}</code>
                      <button className="text-muted-foreground hover:text-foreground"><Eye className="size-3.5" /></button>
                      <button className="text-muted-foreground hover:text-foreground"><Copy className="size-3.5" /></button>
                    </div>
                  </TableCell>
                  <TableCell><StatusBadge status={app.status} /></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {app.perms.map((p) => <CodeTag key={p}>{p}</CodeTag>)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{app.lastUsed}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Regenerate key</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        <StatCard label="Total Applications"    value="4" sub="" icon={AppWindow} />
        <StatCard label="Active Applications"   value="2" sub="" icon={CheckCircle2} />
        <StatCard label="Inactive Applications" value="2" sub="" icon={XCircle} />
      </div>
    </div>
  )
}

// ─── Events & Templates page ──────────────────────────────────────────────────

function EventsTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0C103D]">Events &amp; Templates</h1>
          <p className="text-sm text-muted-foreground">Register notification events and create customizable templates</p>
        </div>
        <Button className="bg-[#0C103D] hover:bg-[#0C103D]/90 text-white gap-1.5">
          <Plus className="size-4" /> Create Event
        </Button>
      </div>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#0C103D]">Registered Events</CardTitle>
              <p className="text-xs text-muted-foreground">4 events registered</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead style={{ paddingLeft: '1.5rem' }}>Event Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Application</TableHead>
                    <TableHead>Templates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((ev) => (
                    <TableRow key={ev.name}>
                      <TableCell style={{ paddingLeft: '1.5rem' }}><CodeTag>{ev.name}</CodeTag></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{ev.desc}</TableCell>
                      <TableCell className="text-sm font-medium text-[#0C103D]">{ev.app}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#0C103D] text-white hover:bg-[#0C103D]/90">
                          {ev.templates} templates
                        </Badge>
                      </TableCell>
                      <TableCell><StatusBadge status={ev.status} /></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View templates</DropdownMenuItem>
                            <DropdownMenuItem>Edit event</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              Select an event to view its templates.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ─── Logs & Audit page ────────────────────────────────────────────────────────

function LogsAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0C103D]">Logs &amp; Audit Trail</h1>
        <p className="text-sm text-muted-foreground">View delivery logs and track system changes for compliance</p>
      </div>

      <Tabs defaultValue="delivery">
        <TabsList>
          <TabsTrigger value="delivery">Delivery Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="mt-4 space-y-4">
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground">Total Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium text-muted-foreground">Successful</CardTitle>
                  <CheckCircle2 className="size-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-xs text-muted-foreground">62.5% success rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium text-muted-foreground">Failed</CardTitle>
                  <XCircle className="size-4 text-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium text-muted-foreground">Pending</CardTitle>
                  <Clock className="size-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-500">1</p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0C103D]">Filter Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input style={{ paddingLeft: '3.5rem' }} placeholder="Search by recipient, event, or template..." />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Logs table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#0C103D]">Delivery Logs</CardTitle>
              <p className="text-xs text-muted-foreground">8 records found</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead style={{ paddingLeft: '1.5rem' }}>Timestamp</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ paddingLeft: '1.5rem' }} className="text-xs text-muted-foreground whitespace-nowrap">{log.ts}</TableCell>
                      <TableCell><CodeTag>{log.event}</CodeTag></TableCell>
                      <TableCell className="text-sm">{log.template}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.recipient}</TableCell>
                      <TableCell><CodeTag>{log.channel}</CodeTag></TableCell>
                      <TableCell><StatusBadge status={log.status} /></TableCell>
                      <TableCell className={`text-xs ${log.status === 'success' ? 'text-[#0C103D] font-medium' : log.status === 'failed' ? 'text-red-600' : 'text-orange-600'}`}>
                        {log.detail}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              Audit trail records will appear here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────

function NotificationsHubApp() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div className="h-screen w-full overflow-hidden">
      <SidebarProvider style={navyStyle}>
        <AppSidebar page={page} setPage={setPage} />
        <SidebarInset className="flex flex-col overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-auto bg-muted/20 p-6">
            {page === 'dashboard'    && <DashboardPage />}
            {page === 'applications' && <ApplicationsPage />}
            {page === 'events'       && <EventsTemplatesPage />}
            {page === 'logs'         && <LogsAuditPage />}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Prototypes/Notifications Hub',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <NotificationsHubApp />,
}
