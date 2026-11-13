'use client'

import { useRef, type ReactNode } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { useCaseDemo } from './CaseDemoOverlay'
import { useCaseHeroExit } from './motion'
import styles from './case-draft.module.css'
import editorial from './case-editorial.module.css'

export type CaseImage = { src: string; alt: string; width: number; height: number }

type Props = {
  headingId: string
  title: string
  titleSize?: 'display' | 'large'
  introduction: string
  kicker?: ReactNode
  logo?: ReactNode
  metadata?: ReactNode
  actions?: ReactNode
  artwork?: CaseImage
  mobileArtwork?: CaseImage
  cover?: 'image' | 'workspace'
  effects?: ReactNode
  rightUI?: { label: string; content: ReactNode }
}

export function CaseHero({ headingId, title, titleSize = 'display', introduction, kicker, logo, metadata, actions, artwork, mobileArtwork, cover = 'image', effects, rightUI }: Props) {
  const section = useRef<HTMLElement>(null)
  const { active } = useCaseDemo()
  useCaseHeroExit(section, active)

  const copy = <div className={`${styles.heroCopy} ${editorial.exitCopy}`}>
    {logo}
    {kicker && <p className={styles.kicker}>{kicker}</p>}
    <h1 id={headingId} className={titleSize === 'large' ? 'portfolio-type-lg' : editorial.heroTitle}>{title}</h1>
    <p className={styles.introduction}>{introduction}</p>
    {metadata}
    {actions && <div className={styles.heroActions}>{actions}</div>}
  </div>

  return <section ref={section} className={styles.hero} data-cover={cover} data-mobile-cover={mobileArtwork ? 'separate' : undefined} data-pose={rightUI ? 'hold' : undefined} aria-labelledby={headingId}>
    {artwork && (mobileArtwork ? <picture className={styles.heroArtwork}>
      <source media="(max-width: 640px)" srcSet={mobileArtwork.src} width={mobileArtwork.width} height={mobileArtwork.height} />
      <img {...artwork} className={styles.heroImage} draggable={false} fetchPriority="high" />
    </picture> : <img {...artwork} className={styles.heroImage} draggable={false} fetchPriority="high" />)}
    <RepeatReveal>{copy}</RepeatReveal>
    {effects}
    {rightUI && <div data-case-hero-interface className={`${styles.heroInterface} ${editorial.exitInterface}`} role="img" aria-label={rightUI.label}>
      {rightUI.content}
    </div>}
  </section>
}
