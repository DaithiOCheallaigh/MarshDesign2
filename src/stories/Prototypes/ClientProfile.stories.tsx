import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AppShell, type ActivePage } from './AppShell'
import { ClientsPage, type ClientRow } from './ClientsPage'
import { ClientDetailPage, type ProjectRow } from './ClientDetailPage'
import { TemplatesPage, type TemplateCardData } from './TemplatesPage'
import { TemplateDetailPage } from './TemplateDetailPage'
import { CreateTemplatePage } from './CreateTemplatePage'
import { DependencyGraphOverlay } from './DependencyGraphOverlay'
import { ProjectDetailPage } from './ProjectDetailPage'
import { DashboardPage } from './DashboardPage'

// ---------------------------------------------------------------------------
// Default data for drill-in stories
// ---------------------------------------------------------------------------

const DEFAULT_CLIENT: ClientRow = {
  id: '1',
  name: 'Tesrol Australia Pty Ltd',
  cn: 'CN114935407',
  country: 'AU',
  industryPractice: 'Forestry & Integrated Wood Products',
  teamSize: 0,
  projects: 1,
  activeProjects: 0,
  progress: 0,
}

const DEFAULT_TEMPLATE: TemplateCardData = {
  id: '1',
  name: 'Babcock International Group PLC',
  business: 'Marsh Risk',
  businessFunction: 'Risk Management',
  description:
    'End-to-end risk management framework for Babcock International covering all business units.',
  updatedDate: '2025-11-01',
  milestoneGroups: [
    {
      id: 'g1',
      name: 'Service Delivery',
      milestones: [
        { id: 'm1', name: 'Policy Documentation Issued', days: 30 },
        { id: 'm2', name: 'Global Register of Insurance', days: 60 },
        { id: 'm3', name: 'Statutory Certificates - TWMIC Letters', days: 5 },
        { id: 'm4', name: 'Invoice Issuance', days: 30 },
        { id: 'm5', name: 'Acknowledgement of Correspondence/Phone Calls', days: 1 },
        { id: 'm6', name: 'Meeting Minutes', days: 5 },
        { id: 'm7', name: 'WIP Calls', days: 5 },
      ],
    },
    { id: 'g2', name: 'Renewal', milestones: [] },
    { id: 'g3', name: 'Risk Management - Tech Solutions', milestones: [] },
    { id: 'g4', name: 'Claims Management', milestones: [] },
    { id: 'g5', name: 'Governance & Control / Strategy', milestones: [] },
    { id: 'g6', name: 'Transition', milestones: [] },
  ],
}

// ---------------------------------------------------------------------------
// View state type
// ---------------------------------------------------------------------------

type ViewName =
  | 'dashboard'
  | 'clients'
  | 'clientDetail'
  | 'templates'
  | 'templateDetail'
  | 'createTemplate'

// ---------------------------------------------------------------------------
// Wrapper — manages all navigation state
// ---------------------------------------------------------------------------

interface ClientProfileAppProps {
  defaultView?: ViewName
  defaultShowGraph?: boolean
}


function ClientProfileApp({
  defaultView = 'clients',
  defaultShowGraph = false,
}: ClientProfileAppProps) {
  const [view, setView] = useState<ViewName>(defaultView)
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(
    defaultView === 'clientDetail' ? DEFAULT_CLIENT : null,
  )
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCardData | null>(
    defaultView === 'templateDetail' ? DEFAULT_TEMPLATE : null,
  )
  const [showGraph, setShowGraph] = useState(defaultShowGraph)
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null)

  // Sidebar only knows about top-level pages
  const activeSidebarPage: ActivePage =
    view === 'templates' || view === 'templateDetail' || view === 'createTemplate'
      ? 'templates'
      : view === 'dashboard'
        ? 'dashboard'
        : 'clients'

  function handleSidebarNavigate(page: ActivePage) {
    setShowGraph(false)
    setSelectedProject(null)
    setView(page)
  }

  function renderPage() {
    // Dashboard
    if (view === 'dashboard') {
      return (
        <DashboardPage
          onNavigate={(page) => setView(page === 'clients' ? 'clients' : 'clients')}
        />
      )
    }

    // Client detail drill-in
    if (view === 'clientDetail' && selectedClient) {
      if (selectedProject) {
        return (
          <ProjectDetailPage
            client={selectedClient}
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        )
      }
      return (
        <ClientDetailPage
          client={selectedClient}
          onBack={() => setView('clients')}
          onViewProject={(p) => setSelectedProject(p)}
        />
      )
    }

    // My Clients list
    if (view === 'clients' || view === 'clientDetail') {
      return (
        <ClientsPage
          onViewClient={(c) => {
            setSelectedClient(c)
            setView('clientDetail')
          }}
        />
      )
    }

    // Create template
    if (view === 'createTemplate') {
      return <CreateTemplatePage onBack={() => setView('templates')} />
    }

    // Template detail drill-in
    if (view === 'templateDetail' && selectedTemplate) {
      return (
        <TemplateDetailPage
          template={selectedTemplate}
          onBack={() => setView('templates')}
          onShowGraph={() => setShowGraph(true)}
        />
      )
    }

    // Templates list (also fallback for templateDetail with no template)
    return (
      <TemplatesPage
        onViewTemplate={(t) => {
          setSelectedTemplate(t)
          setView('templateDetail')
        }}
        onCreateTemplate={() => setView('createTemplate')}
      />
    )
  }

  return (
    <>
      <AppShell activePage={activeSidebarPage} onNavigate={handleSidebarNavigate}>
        {renderPage()}
      </AppShell>
      {showGraph && selectedTemplate && (
        <DependencyGraphOverlay
          template={selectedTemplate}
          onClose={() => setShowGraph(false)}
        />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ClientProfileApp> = {
  title: 'Prototypes/Milestones',
  component: ClientProfileApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page prototype of the Marsh Milestone Tracker. Use the sidebar to navigate between My Clients and Templates. Click client names or template "Open" buttons to drill into detail views.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ClientProfileApp>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Dashboard: Story = {
  args: { defaultView: 'dashboard' },
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard — overview of active clients, milestone completion rates, event activity charts, and top clients by project count.',
      },
    },
  },
}

export const MyClients: Story = {
  args: { defaultView: 'clients' },
  parameters: {
    docs: {
      description: {
        story:
          'My Clients — searchable client list with CN numbers, progress bars, and delete actions. Click a client name to drill into the Client Detail view.',
      },
    },
  },
}

export const ClientDetail: Story = {
  args: { defaultView: 'clientDetail' },
  parameters: {
    docs: {
      description: {
        story:
          'Client Detail — header card with KPI stats row and Project Portfolio table for Tesrol Australia Pty Ltd. Click the → arrow on a project row to drill into the project milestones view.',
      },
    },
  },
}

export const Templates: Story = {
  args: { defaultView: 'templates' },
  parameters: {
    docs: {
      description: {
        story:
          'Business Process Templates — card grid showing group/milestone/duration stats. Click "Open" to view a template detail, or "+ New Template" to start a blank template.',
      },
    },
  },
}

export const TemplateDetail: Story = {
  args: { defaultView: 'templateDetail' },
  parameters: {
    docs: {
      description: {
        story:
          'Template Detail — two-panel view with a group tree sidebar on the left and template information + milestone group editor on the right. Click "Show Graph" to launch the dependency graph overlay.',
      },
    },
  },
}

export const CreateTemplate: Story = {
  args: { defaultView: 'createTemplate' },
  parameters: {
    docs: {
      description: {
        story:
          'Create Template — blank two-panel creation flow. Add groups via the left panel, fill in template metadata on the right. Groups and milestones are added interactively.',
      },
    },
  },
}

export const DependencyGraph: Story = {
  args: { defaultView: 'templateDetail', defaultShowGraph: true },
  parameters: {
    docs: {
      description: {
        story:
          'Dependency Graph — full-viewport overlay showing all milestone nodes for Babcock International Group PLC. Supports zoom in/out and close.',
      },
    },
  },
}
