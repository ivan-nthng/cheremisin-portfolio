'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { CaseShowcase } from './CaseTemplate'
import { GuidedPreview } from './GuidedPreview'
import { caseDemoDesktopQuery, useCaseDemoDesktop } from './case-demo-viewport'
import { Lightbox } from '@/components/Lightbox'
import type { CaseImage } from './CaseHero'
import { useCaseDemo } from './CaseDemoOverlay'
import { caseShowcasePose, watchCaseShowcase } from './motion'
import { useRepeatReveal } from '@/components/portfolio/RepeatReveal'
import styles from './case-draft.module.css'
import chromeStyles from '@/components/citymobil-case/case.module.css'

const animatedViewport = `${caseDemoDesktopQuery} and (min-height: 700px) and (prefers-reduced-motion: no-preference)`

type Props = {
  id?: string
  headingId: string
  kicker: string
  lines: [string, string]
  chrome: string
  backdrop?: ReactNode
  onBackdropRunning?: (running: boolean) => void
  className?: string
  pinClassName?: string
  hidden?: boolean
  suspended?: boolean
  sectionRef?: RefObject<HTMLElement | null>
  frameRef?: RefObject<HTMLDivElement | null>
  revealPin?: boolean
  wide?: boolean
  still: ReactNode
  desktopPreview?: ReactNode
  scene?: ReactNode
  mobilePoster: CaseImage
  entry: ReactNode
}

export function CaseGuidedShowcase({
  still, scene, desktopPreview, mobilePoster, entry, hidden = false, suspended = false,
  className = '', pinClassName = '', onBackdropRunning, sectionRef, frameRef,
  revealPin = false, wide = false, ...content
}: Props) {
  const { active } = useCaseDemo()
  const localSection = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLDivElement>(null)
  const localFrame = useRef<HTMLDivElement>(null)
  const invitation = useRef<HTMLDivElement>(null)
  const imageEntry = useRef<HTMLButtonElement>(null)
  const section = sectionRef ?? localSection
  const frame = frameRef ?? localFrame
  const desktop = useCaseDemoDesktop()
  const [imageOpen, setImageOpen] = useState(false)
  const paused = active || suspended || hidden || imageOpen
  const playbackPaused = useRef(paused)
  playbackPaused.current = paused
  const [animated, setAnimated] = useState(false)
  useRepeatReveal(pin, revealPin && !hidden)

  useEffect(() => {
    const motion = matchMedia(animatedViewport)
    const update = () => setAnimated(motion.matches)
    update()
    motion.addEventListener('change', update)
    return () => motion.removeEventListener('change', update)
  }, [])

  useEffect(() => { if (desktop || hidden) setImageOpen(false) }, [desktop, hidden])
  useEffect(() => { if (paused) onBackdropRunning?.(false) }, [paused, onBackdropRunning])

  useLayoutEffect(() => {
    // Playback pauses in fullscreen; the inline return rectangle must still resize.
    if (hidden) return
    const root = section.current!, browser = frame.current!, text = heading.current!, cta = invitation.current!
    if (!animated) {
      root.dataset.pose = 'hold'
      text.dataset.reveal = '2'
      cta.inert = false
      return
    }

    root.dataset.pose = 'peek'
    cta.inert = true
    const stop = watchCaseShowcase(root, browser, (progress, distance, inView) => {
      const viewport = innerHeight
      const pose = caseShowcasePose(progress, viewport, browser.offsetHeight, 56, 120)
      const held = progress >= .82
      root.dataset.pose = held ? 'hold' : pose.rise === 0 ? 'peek' : 'rise'
      text.dataset.reveal = distance > viewport * .65 ? '0' : distance > viewport * .22 ? '1' : '2'
      browser.style.setProperty('--draft-frame-top', `${pose.top}px`)
      browser.style.setProperty('--draft-frame-shift', `${pose.shift}px`)
      browser.style.setProperty('--draft-frame-tilt', `${10 * (1 - pose.rise)}deg`)
      text.style.setProperty('--draft-heading-opacity', String(pose.opacity))
      text.style.setProperty('--draft-heading-shift', `${pose.headlineShift}px`)
      if (!held && cta.contains(document.activeElement)) root.focus({ preventScroll: true })
      cta.inert = !held
      onBackdropRunning?.(!playbackPaused.current && inView && !held && document.visibilityState === 'visible')
    })
    return () => {
      stop()
      onBackdropRunning?.(false)
    }
  }, [animated, hidden, section, frame, onBackdropRunning])

  return <><CaseShowcase {...content}
    sectionRef={section} pinRef={pin} headingRef={heading} frameRef={frame} entryRef={invitation}
    className={`${styles.showcase} ${wide ? styles.wideShowcase : ''} ${className}`} pinClassName={`${styles.showcasePin} ${pinClassName}`} hidden={hidden}
    data-motion={animated} data-pose="hold"
    preview={desktop ? desktopPreview ?? <GuidedPreview still={still} suspended={paused}>{scene}</GuidedPreview> : still}
    mobile={<div className={chromeStyles.mobileShowcase}>
      <div className={chromeStyles.compactDemoFrame} data-case-mobile-preview>
        <div className={chromeStyles.chrome} aria-hidden="true">{content.chrome}</div>
        <img {...mobilePoster} loading="lazy" draggable={false} />
      </div>
      <button ref={imageEntry} data-case-image-entry type="button" className={chromeStyles.mobileImageAction} onClick={() => setImageOpen(true)}>View workspace image</button>
    </div>}
    entry={desktop ? entry : null}
  />
    <Lightbox preventMediaSelection isOpen={imageOpen && !desktop && !hidden} onClose={() => setImageOpen(false)}
      image={mobilePoster.src} alt={mobilePoster.alt} returnFocus={imageEntry} />
  </>
}
