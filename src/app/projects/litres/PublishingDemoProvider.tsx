'use client'

import { lazy, type ReactNode } from 'react'
import { CaseDemoProvider } from '@/components/portfolio/case-story/CaseDemoOverlay'

const LitresDemo = lazy(() => import('@/components/litres-author/LitresDemo'))

export function PublishingDemoProvider({ children }: { children: ReactNode }) {
  return <CaseDemoProvider renderDemo={(_, close) => <LitresDemo onReturn={close} />}>{children}</CaseDemoProvider>
}
