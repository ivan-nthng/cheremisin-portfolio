'use client'

import { lazy, type ReactNode } from 'react'
import { CaseDemoProvider, type CaseDemo } from './CaseDemoOverlay'

const Products = lazy(() => import('@/components/metabox/products/ProductsDemo'))
const Camera = lazy(() => import('@/components/metabox/MetaboxDemo'))
const SuiteDemo = lazy(() => import('@/components/metabox/suite/SuiteDemo'))

export const metaboxScenarios = [
  { id: 'metabox-products', label: 'Products and renders' },
  { id: 'metabox-camera', label: 'Camera setup' },
  { id: 'metabox-projects', label: 'Projects gallery' },
] as const

export function renderMetaboxDemo(demo: CaseDemo, close: () => void, navigate: (next: CaseDemo) => void) {
  const scenarioControls = { scenarios: metaboxScenarios, scenario: demo === 'metabox-suite' ? 'metabox-projects' as const : demo, onScenario: navigate }
  switch (demo) {
    case 'metabox-products': return <Products scenarioControls={scenarioControls} onReturn={close} onOpenApplications={() => navigate('metabox-suite')} onOpenConfigurator={() => navigate('metabox-camera')} />
    case 'metabox-camera': return <Camera scenarioControls={scenarioControls} onReturn={close} onOpenApplications={() => navigate('metabox-suite')} />
    case 'metabox-suite': return <SuiteDemo scenarioControls={scenarioControls} close={close} navigate={navigate} />
    case 'metabox-projects': return <SuiteDemo scenarioControls={scenarioControls} projects close={close} navigate={navigate} />
    default: return null
  }
}
const retainedMetabox = ['metabox-products', 'metabox-camera', 'metabox-projects', 'metabox-suite'] as const

export function DraftDemoProvider({ children, library }: { children: ReactNode; library: boolean }) {
  return <CaseDemoProvider retainedDemo={library ? 'library' : retainedMetabox}>{children}</CaseDemoProvider>
}
