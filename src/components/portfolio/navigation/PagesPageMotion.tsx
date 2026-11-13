'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { PageMotion, PageReady, usePageNavigation } from './PageMotion'

function PagesContent({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { cancel } = usePageNavigation()
  useEffect(() => {
    router.events.on('routeChangeError', cancel)
    return () => router.events.off('routeChangeError', cancel)
  }, [router.events, cancel])
  return <>{children}<PageReady key={router.asPath} /></>
}
export function PagesPageMotion({ children }: { children: ReactNode }) {
  const router = useRouter()
  return <PageMotion pathname={router.pathname} onNavigate={href => router.push(href)}>
    <PagesContent>{children}</PagesContent>
  </PageMotion>
}
