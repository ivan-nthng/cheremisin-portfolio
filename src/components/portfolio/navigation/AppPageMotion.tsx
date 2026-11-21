'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { PageMotion } from './PageMotion'

export function AppPageMotion({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  return <PageMotion pathname={pathname ?? ''} onNavigate={href => router.push(href)}
    onRestoreUnownedEntry={(href, scroll) => router.replace(href, { scroll })}>{children}</PageMotion>
}
