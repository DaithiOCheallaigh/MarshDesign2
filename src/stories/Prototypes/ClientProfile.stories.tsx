import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AppShell, type ActivePage } from './AppShell'
import { DashboardPage } from './DashboardPage'
import { EventsPage, type EventRow } from './EventsPage'
import { ClientsPage } from './ClientsPage'
import { TeamPage } from './TeamPage'
import { AdminPage } from './AdminPage'
import { MilestonesPage } from './MilestonesPage'

// Wrapper component to handle navigation state
function ClientProfileApp({ defaultPage = 'dashboard' }: { defaultPage?: ActivePage }) {
  const [activePage, setActivePage] = useState<ActivePage>(defaultPage)
  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null)

  function handleNavigate(page: ActivePage) {
    setSelectedEvent(null)
    setActivePage(page)
  }

  function renderPage() {
    if (activePage === 'events' && selectedEvent) {
      return <MilestonesPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />
    }
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />
      case 'events':
        return <EventsPage onViewMilestones={setSelectedEvent} />
      case 'clients':
        return <ClientsPage defaultTab="my-clients" />
      case 'templates':
        return <ClientsPage defaultTab="templates" />
      case 'team':
        return <TeamPage />
      case 'admin':
        return <AdminPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <AppShell activePage={activePage} onNavigate={handleNavigate}>
      {renderPage()}
    </AppShell>
  )
}

const meta: Meta<typeof ClientProfileApp> = {
  title: 'Prototypes/Milestones',
  component: ClientProfileApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page prototype of the Marsh Client Profile application. Use the sidebar to navigate between all views.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ClientProfileApp>

export const Dashboard: Story = {
  args: {
    defaultPage: 'dashboard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin dashboard — KPI metrics, event status/activity charts, priority breakdown, on-time rate gauges, recent events, and top clients.',
      },
    },
  },
}

export const Events: Story = {
  args: {
    defaultPage: 'events',
  },
  parameters: {
    docs: {
      description: {
        story: 'All Events view — sortable table with priority and status badges, filter controls, pagination, and interactive "Add New Event" dialog with 2-step template selection flow.',
      },
    },
  },
}

export const Clients: Story = {
  args: {
    defaultPage: 'clients',
  },
  parameters: {
    docs: {
      description: {
        story: 'Clients view — tabbed table listing clients with project counts and last-updated dates.',
      },
    },
  },
}

export const Templates: Story = {
  args: {
    defaultPage: 'templates',
  },
  parameters: {
    docs: {
      description: {
        story: 'Templates view — card grid of 6 industry templates with colored left borders, milestone counts, and "Use Template" CTA.',
      },
    },
  },
}

export const Team: Story = {
  args: {
    defaultPage: 'team',
  },
  parameters: {
    docs: {
      description: {
        story: 'Team Members view — card grid showing 5 team members with role badges, role dropdowns, and joined dates.',
      },
    },
  },
}

export const Admin: Story = {
  args: {
    defaultPage: 'admin',
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin Dashboard — system stats (users, clients, events, active rate) plus user management table with role dropdowns.',
      },
    },
  },
}
