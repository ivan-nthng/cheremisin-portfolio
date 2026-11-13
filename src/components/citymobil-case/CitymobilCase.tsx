'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import dynamic from 'next/dynamic'
import { CitymobilWorkspace } from '@/components/CityMobileInteractivePreview'
import { CitymobilBackdrop } from '@/components/citymobil-background/CitymobilBackgroundPreview'
import { useCaseHeroExit, useCaseViewportEntry, useScrollCasePhases } from '@/components/portfolio/case-story/motion'
import { CaseCounter } from '@/components/portfolio/case-story/CaseCounter'
import { CaseDemoArrow, CaseStatistics, CaseTemplate } from '@/components/portfolio/case-story/CaseTemplate'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import cm from '@/components/citymobil-demo/preview.module.css'
import background from '@/components/citymobil-background/background.module.css'
import styles from './case.module.css'
import CaseProcess from './CaseProcess'
import { CaseDemoOverlay } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseGuidedShowcase } from '@/components/portfolio/case-story/CaseGuidedShowcase'
import { caseDemoDesktopQuery as desktopQuery, useCaseDemoDesktop } from '@/components/portfolio/case-story/case-demo-viewport'
import { RepeatReveal, useRepeatReveal } from '@/components/portfolio/RepeatReveal'
import ProjectNavigation from '@/components/ProjectNavigation'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import { useCaseView } from './CaseNavigation'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import { citymobilContent as content, formatCitymobilNumber as format, type CitymobilMetric } from '@/lib/portfolio/citymobil-content'

type Phase = 'before' | 'after'
const phases = {
  before: { eyebrow: 'Before', title: content.beforeTitle, summary: content.beforeDescription, heading: content.priorityTitle, story: content.priorityDescription, metrics: content.before },
  after: { eyebrow: 'After', title: content.afterTitle, summary: content.comparisonNote, heading: 'Reported outcome', story: content.afterDescription, metrics: content.after },
} as const
const showcaseInset = 68
const CitymobilWorkspaceScene = dynamic(() => import('./CitymobilWorkspaceScene'))

function caseToolbarInset() {
  const toolbar = document.querySelector<HTMLElement>(`.${styles.navigation}`)
  if (!toolbar || getComputedStyle(toolbar).position !== 'fixed') return 0
  // Leave room for the reveal's vertical travel above the toolbar.
  const travel = Number.parseFloat(getComputedStyle(toolbar).getPropertyValue('--space-sm')) || 0
  return toolbar.offsetHeight + travel
}

function Metric({ value, label, accessible, entered, reduced, format: valueFormat }: CitymobilMetric & { entered: boolean; reduced: boolean }) {
  const display = useCallback((number: number) => format(number, valueFormat), [valueFormat])
  return <>
    <CaseCounter className={`${editorial.metric} ${styles.number}`} value={value} entered={entered} reduced={reduced} format={display} staticBeforeHydration />
    <span className={styles.srOnly}>{accessible}</span><span className={styles.metricLabel} aria-hidden="true">{label}</span>
  </>
}

function Statistics({ phase, entered, reduced, metricsRef }: { phase: Phase; entered?: boolean; reduced: boolean; metricsRef?: RefObject<HTMLDivElement | null> }) {
  const localMetrics = useRef<HTMLDivElement>(null)
  const metrics = metricsRef ?? localMetrics
  // Start at the first visible edge above the toolbar, not after a share of the two-row grid.
  const visible = useCaseViewportEntry(metrics, entered === undefined && !reduced, caseToolbarInset, 0)
  return <RepeatReveal active={reduced || undefined} bottomInset={caseToolbarInset}><div className={styles.statistics} data-phase={phase}>
    <div className={styles.statHeading}>{(['before', 'after'] as const).map(key => <RepeatReveal key={key} trackClassName={styles.phaseSlot} className={styles.phaseCopy} active={phase === key}>
      <p>{phases[key].eyebrow}</p><h2 className={editorial.sectionTitle}>{phases[key].title}</h2><p>{phases[key].summary}</p>
    </RepeatReveal>)}</div>
    <div ref={metrics} className={styles.metrics}>{content.before.map((metric, index) => <div key={metric.label} className={styles.metric}>
      <Metric {...phases[phase].metrics[index]} entered={reduced || (entered ?? visible)} reduced={reduced}/>
    </div>)}</div>
    <div className={styles.story}><div className={styles.storyCopy}>{(['before', 'after'] as const).map(key => <RepeatReveal key={key} trackClassName={styles.phaseSlot} className={styles.phaseCopy} active={phase === key}>
      <h3>{phases[key].heading}</h3><p>{phases[key].story}</p>
    </RepeatReveal>)}</div></div>
  </div></RepeatReveal>
}

/** Citymobil's presentation follows the visitor's document scroll. */
export default function CitymobilCase({ review = true }: { review?: boolean }) {
  const view = useCaseView()
  const positions = useRef<Record<string, number>>({ result: 0, process: 0 })
  const currentView = useRef(view)
  const restoring = useRef(false)
  const [phase, setPhase] = useState<Phase>('before')
  const [entered, setEntered] = useState(false)
  const [stepped, setStepped] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const desktop = useCaseDemoDesktop()
  const active = desktop && demoOpen
  const hero = useRef<HTMLElement>(null)
  const stats = useRef<HTMLElement>(null)
  const metrics = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null), poster = useRef<HTMLDivElement>(null), launch = useRef<HTMLButtonElement>(null)
  const demoSource = useRef<HTMLElement>(null)
  const processLaunch = useRef<HTMLButtonElement>(null), processGallery = useRef<HTMLDivElement>(null)

  useEffect(() => { if (!desktop) setDemoOpen(false) }, [desktop])

  useLayoutEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const remember = () => { if (!restoring.current && !document.querySelector('dialog:modal, [role="dialog"][aria-modal="true"]')) positions.current[currentView.current] = scrollY }
    window.addEventListener('scroll', remember, { passive: true })
    return () => { history.scrollRestoration = previous; window.removeEventListener('scroll', remember) }
  }, [])
  useLayoutEffect(() => {
    if (currentView.current === view) return
    restoring.current = true
    currentView.current = view
    setDemoOpen(false)
    window.scrollTo({ top: positions.current[view], behavior: 'instant' })
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: positions.current[view], behavior: 'instant' })
      restoring.current = false
    })
    return () => cancelAnimationFrame(frame)
  }, [view])

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (view !== 'result') return
    const panel = stats.current!.querySelector<HTMLElement>('[data-phase]')!
    const measure = () => {
      // Retain the original comparison fit threshold independently of the
      // shared showcase's fit on short screens.
      const posterWidth = Math.min(document.documentElement.clientWidth * .8, 1280)
      const originalFrameHeight = Math.round(posterWidth * 756 / 1440) + 18
      setStepped(!reduced && matchMedia(desktopQuery).matches &&
        Math.max(panel.offsetHeight, panel.scrollHeight) <= innerHeight &&
        originalFrameHeight + showcaseInset * 2 <= innerHeight)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(panel); [...panel.children].forEach(child => observer.observe(child))
    measure(); window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [reduced, view])

  const selectPhase = useCallback((after: boolean, entered: boolean) => {
    setPhase(after ? 'after' : 'before')
    setEntered(entered)
  }, [])
  useCaseHeroExit(hero, view !== 'result' || active)
  useRepeatReveal(hero, view === 'result' && !reduced)
  useScrollCasePhases(view === 'result' && stepped && !active, stats, metrics, selectPhase)

  const setBackdropRunning = useCallback((running: boolean) => {
    if (stage.current && stage.current.dataset.running !== String(running)) {
      stage.current.dataset.running = String(running)
    }
  }, [])

  return <><CaseTemplate className={styles.case} data-port17-surface="case" data-restored-case data-case-view={view} data-reduced={reduced} data-statistics-steps={stepped}
    hero={<section ref={hero} hidden={view !== 'result'} className={styles.hero} aria-labelledby="case-title">
      <picture><source media="(max-width: 599px)" srcSet="/images/citymobil/case/hero-mobile.webp"/><img draggable={false} src="/images/citymobil/case/hero-desktop.webp" alt="Citymobil car in an evening city scene" width="1536" height="1024" fetchPriority="high"/></picture>
      <div className={styles.veil}/>
      <RepeatReveal><div className={`${styles.overview} ${editorial.exitCopy}`}><h1 id="case-title" className={editorial.heroTitle}>One workspace for Citymobil support</h1><p>{content.serviceContext}</p><div><p className={styles.role}>Role Lead Product Designer</p><p className={styles.company}><a className="editorial-link" href="https://vk.com/" target="_blank" rel="noreferrer">VK<PortfolioArrow/></a><span>/ Citymobil</span></p></div></div></RepeatReveal>
    </section>}
    statistics={<CaseStatistics hidden={view !== 'result'} sectionRef={stats} aria-label="Support capacity before and after" afterPin={<>
      {!stepped && <Statistics phase="after" reduced={reduced}/>}
      {stepped && <p className={styles.srOnly} role="status">{phase === 'before' ? `Before. ${content.beforeDescription}` : `After. ${content.afterDescription} ${content.comparisonNote}`}</p>}
    </>}>
      <Statistics phase={stepped ? phase : 'before'} entered={stepped ? entered : undefined} reduced={reduced} metricsRef={metrics}/>
    </CaseStatistics>}
    showcase={<CaseGuidedShowcase hidden={view !== 'result'} frameRef={poster} revealPin={!reduced}
      wide className={styles.resultShowcase} pinClassName={styles.resultShowcasePin}
      headingId="showcase-title" kicker="Citymobil / Support workspace" lines={['Better conversations.', 'Better support.']}
      backdrop={<div className={`${cm.preview} ${styles.backdrop}`} data-theme="dark"><div ref={stage} className={background.stage} data-running="false"><CitymobilBackdrop/></div></div>}
      onBackdropRunning={setBackdropRunning} suspended={active}
      chrome="Citymobil — support demo"
      still={<div className={styles.poster}><img draggable={false} src="/images/citymobil/case/poster-desktop.webp" alt="Citymobil support workspace preview" width="4320" height="2268"/></div>}
      scene={<CitymobilWorkspaceScene />}
      entry={<button className="editorial-link" type="button" aria-haspopup="dialog" onClick={event => {
        launch.current = event.currentTarget
        demoSource.current = event.currentTarget.closest<HTMLElement>('[data-case-browser]')
        setDemoOpen(true)
      }}>Try Live Demo<CaseDemoArrow /></button>}
      mobilePoster={{ src: '/images/citymobil/case/poster-mobile.webp', alt: 'Citymobil support workspace', width: 390, height: 656 }}
    />}
    details={<>
    <CaseProcess view={view} review={review} suspended={active} onDemo={() => { if (desktop) setDemoOpen(true) }} launch={processLaunch} galleryEntry={processGallery}/>
    {review && <p hidden={view !== 'result'} id="case-review-scope" className={styles.reviewScope}>Local preview · Result includes the introduction, support comparison, showcase and five feature demonstrations. Process presents the design approach and source component gallery.</p>}
    </>} further={!review && <RepeatReveal active={reduced || undefined}><ProjectNavigation href="/projects/taxi-aggregator-support-workspace" /></RepeatReveal>}
    footer={!review && <PortfolioFooter />} />
    {active && <CaseDemoOverlay onClose={() => setDemoOpen(false)} entry={view === 'process' ? processLaunch : launch}
      source={view === 'result' ? demoSource : undefined} fallback={view === 'process' ? processGallery : undefined}
      revealFallback={view === 'process'} label="Interactive Citymobil demo">
      {close => <div className={cm.standalone}><CitymobilWorkspace onReturn={close} /></div>}
    </CaseDemoOverlay>}
  </>
}
