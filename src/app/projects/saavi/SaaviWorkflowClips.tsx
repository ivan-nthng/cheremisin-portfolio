'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { CaseDemoMedia } from '@/components/portfolio/case-story/CaseDemoMedia'
import { CaseFeatureCard, CaseFeatureGrid } from '@/components/portfolio/case-story/CaseDetails'
import { useCaseDemoDesktop } from '@/components/portfolio/case-story/case-demo-viewport'
import { isSaaviChartClip, saaviClipCompactQuery, saaviClipCompactWidth, saaviClipFrames, type SaaviClip } from '@/lib/portfolio/client/saavi-kitchen-host'
import { KitchenGuidedFrame } from './KitchenGuidedFrame'
import styles from './workflow-clips.module.css'

const clips = [
  { id: 'dish', span: 'third', title: 'Set up a dish.', description: 'The Kitchen editor brings the dish photo, description and proposed price together.' },
  { id: 'buyers', span: 'third', title: 'Total buyers', description: 'Track how many distinct customers bought a meal over four weeks.' },
  { id: 'order-detail', span: 'third', title: 'Inspect an order.', description: 'Open a production order to see its items and delivery status.' },
  { id: 'production', span: 'full', title: 'See what’s in production', description: 'Filter the production queue by restaurant.' },
  { id: 'analytics', span: 'half', title: 'Compare weekly sales', description: 'Filter delivered order value by restaurant and switch between chart views.' },
  { id: 'dish-comparison', span: 'half', title: 'Compare dish sales', description: 'Compare weekly portions sold for three dishes over the same period.' },
] as const

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
function subscribeToMotion(onChange: () => void) {
  const media = matchMedia(reducedMotionQuery)
  document.addEventListener('visibilitychange', onChange)
  media.addEventListener('change', onChange)
  return () => {
    document.removeEventListener('visibilitychange', onChange)
    media.removeEventListener('change', onChange)
  }
}

function canPlayMotion() {
  return document.visibilityState === 'visible' && !matchMedia(reducedMotionQuery).matches
}

function subscribeToCompact(onChange: () => void) {
  const media = matchMedia(saaviClipCompactQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function isCompact() {
  return matchMedia(saaviClipCompactQuery).matches
}

function WorkflowMedia({ clip, origin, expanded, suspended, onExpand, onClose }: {
  clip: typeof clips[number]; origin: string | null; expanded: boolean; suspended: boolean;
  onExpand: () => void; onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null)
  const desktop = useCaseDemoDesktop()
  const compact = useSyncExternalStore(subscribeToCompact, isCompact, () => false)
  const canPlayAtWidth = desktop || isSaaviChartClip(clip.id)
  const motion = useSyncExternalStore(subscribeToMotion, canPlayMotion, () => false)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!origin || !canPlayAtWidth || !motion || suspended) return
    // Native menus dismiss when their anchor scrolls out of view.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= .9), {
      threshold: .9, rootMargin: '-56px 0px 0px',
    })
    observer.observe(root.current!)
    return () => observer.disconnect()
  }, [origin, canPlayAtWidth, motion, suspended])
  const playing = origin && canPlayAtWidth && motion && !suspended && (visible || expanded)
  const { width, height, compactHeight } = saaviClipFrames[clip.id]
  const ratios = { '--clip-wide': `${width} / ${height}`, '--clip-compact': `${saaviClipCompactWidth} / ${compactHeight}` } as CSSProperties

  return <CaseDemoMedia title={clip.title} expanded={expanded} onExpand={onExpand} onClose={onClose}>
    <div ref={root} className={styles.frame} data-saavi-clip={clip.id} style={ratios}>
      <picture>
        <source media={saaviClipCompactQuery} srcSet={`/images/saavi/case/workflows/${clip.id}-mobile.jpg`} width={saaviClipCompactWidth} height={compactHeight} />
        <img className={styles.still} src={`/images/saavi/case/workflows/${clip.id}.jpg`} alt="" width={width} height={height} loading="lazy" />
      </picture>
      {playing && <KitchenGuidedFrame key={compact ? 'compact' : 'wide'} origin={origin} clip={clip.id} compact={compact} />}
    </div>
  </CaseDemoMedia>
}

export function SaaviWorkflowClips() {
  const [origin, setOrigin] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<SaaviClip | null>(null)
  useEffect(() => { setOrigin(location.origin) }, [])

  return <CaseFeatureGrid variant="tracks" className={styles.grid}>
    {clips.map(clip => <CaseFeatureCard key={clip.id} listItem span={clip.span} title={clip.title} description={clip.description}>
      <WorkflowMedia clip={clip} origin={origin} expanded={expanded === clip.id} suspended={expanded !== null && expanded !== clip.id}
        onExpand={() => setExpanded(clip.id)} onClose={() => setExpanded(null)} />
    </CaseFeatureCard>)}
  </CaseFeatureGrid>
}
