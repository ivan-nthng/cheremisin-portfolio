'use client'

import CitymobilFeatures from '@/components/citymobil-features/CitymobilFeatures'
import styles from './features.module.css'
import { CaseFeatureCard } from '@/components/portfolio/case-story/CaseDetails'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import type { SceneId } from '@/components/citymobil-features/scenes'
import CaseFragmentViewer from './CaseFragmentViewer'

// Current Figma3255:3145 copy and order. The media is the existing native loop.
const cards: { scene: SceneId; label: string; title: string; copy: string }[] = [
  { scene: 'issue', label: 'Issue', title: 'Start with context', copy: 'Review the issue and switch to Scripts for guidance on the conversation.' },
  { scene: 'actions', label: 'Actions', title: 'Find the next action', copy: 'Open Command-A to search the available support actions.' },
  { scene: 'chat', label: 'Chat', title: 'Keep the conversation moving', copy: 'Use a suggested reply as a starting point, then edit and send your message.' },
  { scene: 'details', label: 'Details', title: 'Inspect the details', copy: 'Check driver information and payment details alongside the conversation.' },
  { scene: 'map', label: 'Map', title: 'Read the trip', copy: 'View the prepared route and the driver and rider positions on the map.' },
]

export default function CaseFeatures({ scene, gallery, reduced, suspended, expanded, prepare, preparing, prepared, preparationFailed, onPrepared, onPreparationFailed, onExpand, onClose }: { scene: SceneId; gallery: boolean; reduced: boolean; suspended: boolean; expanded: boolean; prepare: boolean; preparing: boolean; prepared: boolean; preparationFailed: boolean; onPrepared: () => void; onPreparationFailed: () => void; onExpand: () => void; onClose: () => void }) {
  const card = cards.find(card => card.scene === scene)!
  return <CaseFeatureCard id={`feature-${card.scene}-title`} eyebrow={card.label} title={card.title} description={card.copy} gallery={gallery} expanded={expanded}>
    <div className={styles.featureMedia}><CaseFragmentViewer expanded={expanded} title={card.label} onExpand={onExpand} onClose={onClose}>{expand =>
      <RepeatReveal active={gallery || reduced || expanded || undefined}>
        <CitymobilFeatures scene={card.scene} embedded retained gallery={gallery} suspended={suspended} interactive={expanded} prepare={prepare} preparing={preparing} prepared={prepared} preparationFailed={preparationFailed} onPrepared={onPrepared} onPreparationFailed={onPreparationFailed} onExpand={expand}/>
      </RepeatReveal>
    }</CaseFragmentViewer></div>
  </CaseFeatureCard>
}
