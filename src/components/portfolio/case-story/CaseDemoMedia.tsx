'use client'

import type { ReactNode } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { CaseExpandTrigger } from './CaseExpandTrigger'
import CaseFragmentViewer from '@/components/citymobil-case/CaseFragmentViewer'
import styles from './case-demo-media.module.css'

export function CaseDemoMedia({ title, expanded, onExpand, onClose, className, reveal = false, manual = false, children }: {
  title: string
  expanded: boolean
  onExpand: () => void
  onClose: () => void
  className?: string
  reveal?: boolean
  manual?: boolean
  children: ReactNode
}) {
  return <CaseFragmentViewer authored title={title} expanded={expanded} onExpand={onExpand} onClose={onClose}>
    {expand => <div className={[styles.media, className].filter(Boolean).join(' ')} data-native-feature data-case-demo-media>
      <div aria-hidden={!manual || undefined} inert={!manual}>{reveal
        ? <RepeatReveal className={styles.artwork} active={expanded ? true : undefined}>{children}</RepeatReveal>
        : children}</div>
      <CaseExpandTrigger title={title} hidden={expanded} touchHint onExpand={expand} />
    </div>}
  </CaseFragmentViewer>
}
