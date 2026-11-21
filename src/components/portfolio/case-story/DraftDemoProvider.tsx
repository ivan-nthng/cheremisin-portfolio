'use client'

import { lazy, useState, type ReactNode } from 'react'
import DemoShell, { type DemoScenarioSelection } from '@/components/portfolio/demo/DemoShell'
import { CaseDemoProvider, type CaseDemo } from './CaseDemoOverlay'

const Library = lazy(() => import('@/components/litres-readers/ReadersDemo'))
const Products = lazy(() => import('@/components/metabox/products/ProductsDemo'))
const Camera = lazy(() => import('@/components/metabox/MetaboxDemo'))
const Suite = lazy(() => import('@/components/metabox/suite/MetaboxSuite'))
const Projects = lazy(() => import('@/components/metabox/suite/MetaboxProjectsGrid'))
const SuiteLayout = lazy(() => import('@/components/metabox/suite/MetaboxSuite').then(module => ({ default: module.MetaboxSuiteLayout })))

function SuiteDemo({ projects, close, navigate, scenarioControls }: {
  projects?: boolean; close: () => void; navigate: (next: CaseDemo) => void; scenarioControls: DemoScenarioSelection<CaseDemo>
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [visit, setVisit] = useState(0)
  return <DemoShell {...scenarioControls} label="Metabox projects demo" theme={theme} onTheme={setTheme} onRestart={() => setVisit(value => value + 1)} onReturn={close}>
    <div key={visit}>{projects ? <SuiteLayout hosted onOpenApplications={() => navigate('metabox-suite')} title="Projects"><Projects /></SuiteLayout> : <Suite hosted onLaunch={destination => navigate(destination === 'projects' ? 'metabox-projects' : 'metabox-products')} />}</div>
  </DemoShell>
}

const metaboxScenarios = [
  { id: 'metabox-products', label: 'Products and renders' },
  { id: 'metabox-camera', label: 'Camera setup' },
  { id: 'metabox-projects', label: 'Projects gallery' },
] as const

function renderDemo(demo: CaseDemo, close: () => void, navigate: (next: CaseDemo) => void) {
  const scenarioControls = { scenarios: metaboxScenarios, scenario: demo === 'metabox-suite' ? 'metabox-projects' as const : demo, onScenario: navigate }
  switch (demo) {
    case 'library': return <Library onReturn={close} />
    case 'metabox-products': return <Products scenarioControls={scenarioControls} onReturn={close} onOpenApplications={() => navigate('metabox-suite')} onOpenConfigurator={() => navigate('metabox-camera')} />
    case 'metabox-camera': return <Camera scenarioControls={scenarioControls} onReturn={close} onOpenApplications={() => navigate('metabox-suite')} />
    case 'metabox-suite': return <SuiteDemo scenarioControls={scenarioControls} close={close} navigate={navigate} />
    case 'metabox-projects': return <SuiteDemo scenarioControls={scenarioControls} projects close={close} navigate={navigate} />
    default: return null
  }
}
export function DraftDemoProvider({ children }: { children: ReactNode }) {
  return <CaseDemoProvider renderDemo={renderDemo}>{children}</CaseDemoProvider>
}
