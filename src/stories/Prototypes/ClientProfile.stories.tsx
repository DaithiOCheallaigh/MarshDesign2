import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AppShell, type ActivePage } from './AppShell'
import { DashboardPage } from './DashboardPage'
import { EventsPage } from './EventsPage'
import { ClientsPage } from './ClientsPage'

// Wrapper component to handle navigation state
function ClientProfileApp({ defaultPage = 'dashboard' }: { defaultPage?: ActivePage }) {
  const [activePage, setActivePage] = useState<ActivePage>(defaultPage)

  function renderPage() {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />
      case 'clients':
        return <ClientsPage />
      case 'events':
        return <EventsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </AppShell>
  )
}

const meta: Meta<typeof ClientProfileApp> = {
  title: 'Prototypes/Client Profile',
  component: ClientProfileApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page prototype of the Marsh Client Profile application. Use the sidebar to navigate between Events and Clients views.',
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
        story: 'All Events view — sortable table with priority and status badges, filter controls, and pagination.',
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
