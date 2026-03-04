import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, FileText, Shield, BarChart2, Settings } from 'lucide-react'
import marshLogoNavy from '../../public/marsh-logo-navy.png'
import marshLogoWhite from '../../public/marsh-logo-white.png'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from '@/components/ui/sidebar'

const navItems = [
  { title: 'Dashboard', icon: Home, url: '#' },
  { title: 'Policies', icon: FileText, url: '#' },
  { title: 'Claims', icon: Shield, url: '#' },
  { title: 'Reports', icon: BarChart2, url: '#' },
]

function MarshSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <img src={marshLogoNavy} alt="Marsh" width={466} height={102} className="h-7 w-auto max-w-full object-contain object-left" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}><item.icon /><span>{item.title}</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#"><Settings /><span>Settings</span></a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

const navyStyle = {
  '--sidebar': '#0C103D',
  '--sidebar-foreground': '#ffffff',
  '--sidebar-border': 'rgba(255,255,255,0.1)',
  '--sidebar-accent': 'rgba(255,255,255,0.08)',
  '--sidebar-accent-foreground': '#ffffff',
  '--sidebar-primary': '#C6E8F5',
  '--sidebar-primary-foreground': '#0C103D',
  '--sidebar-ring': '#C6E8F5',
} as React.CSSProperties

function MarshSidebarDark() {
  return (
    <Sidebar style={navyStyle}>
      <SidebarHeader className="border-b border-white/10 px-4 py-3">
        <img src={marshLogoWhite} alt="Marsh" width={434} height={95} className="h-7 w-auto max-w-full object-contain object-left" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}><item.icon /><span>{item.title}</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#"><Settings /><span>Settings</span></a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

const meta: Meta = {
  title: 'Components/Sidebar',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-96 w-full overflow-hidden rounded-lg border">
        <MarshSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">Main content area</p>
        </main>
      </div>
    </SidebarProvider>
  ),
}

export const Dark: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-96 w-full overflow-hidden rounded-lg border">
        <MarshSidebarDark />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">Main content area</p>
        </main>
      </div>
    </SidebarProvider>
  ),
}
