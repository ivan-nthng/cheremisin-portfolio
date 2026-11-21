'use client'

import { useEffect, useRef, useState } from 'react'
import { cubicBezier, useReducedMotion } from 'framer-motion'
import { demoEase } from '@/components/citymobil-demo/DemoMotion'
import { CitymobilBackdrop } from '@/components/citymobil-background/CitymobilBackgroundPreview'
import cm from '@/components/citymobil-demo/preview.module.css'
import background from '@/components/citymobil-background/background.module.css'
import styles from './motion.module.css'

const metrics = [
  { value: 15000, label: 'incoming requests / day' },
  { value: 50, label: 'support operators' },
  { value: 3600, label: 'team capacity / day' },
  { value: 11400, label: 'demand minus capacity / day' },
] as const
const ease = cubicBezier(...demoEase)
const range = (value: number, start: number, end: number) => Math.max(0, Math.min(1, (value - start) / (end - start)))
type Mode = 'animated' | 'static' | 'reduced'

/** Disposable motion study on the existing background canvas, not a port of the PORT-17 static layout. */
export default function CitymobilMotionPreview() {
  const [mode, setMode] = useState<Mode>('animated')
  const reducedPreference = useReducedMotion()
  const reduced = Boolean(reducedPreference || mode === 'reduced')
  const pin = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const baseline = useRef<HTMLElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLDivElement>(null)
  const demo = useRef<HTMLElement>(null)
  const swap = useRef<HTMLParagraphElement>(null)
  const poster = useRef<HTMLDivElement>(null)
  const filtered = useRef<HTMLDivElement>(null)
  const action = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const values = useRef<(HTMLSpanElement | null)[]>([])
  const select = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const root = pin.current!, canvas = stage.current!, layer = backdrop.current!
    let frame = 0, start = 0, length = 1, progress = 0, inView = false
    const visibility = () => {
      const running = String(mode === 'animated' && !reduced && inView && progress >= .28 && progress < 1 && document.visibilityState === 'visible')
      if (layer.dataset.running !== running) layer.dataset.running = running
    }
    const measure = () => { start = root.getBoundingClientRect().top + scrollY; length = Math.max(1, root.offsetHeight - innerHeight); schedule() }
    function render() {
      frame = 0
      if (document.visibilityState !== 'visible') return
      const p = range(scrollY - start, 0, length)
      progress = p; visibility()
      root.dataset.progress = p.toFixed(4)
      const count = reduced ? 1 : ease(range(p, .12, .24))
      metrics.forEach((metric, i) => {
        const text = Math.round(metric.value * count).toLocaleString('en-US')
        if (values.current[i]?.textContent !== text) values.current[i]!.textContent = text
      })
      if (reduced) {
        for (const node of [hero.current, baseline.current, demo.current, layer, headline.current, poster.current, filtered.current, action.current, canvas, ...swap.current!.children]) node?.removeAttribute('style')
        action.current!.inert = false
        return
      }
      hero.current!.style.opacity = String(1 - range(p, 0, .12))
      baseline.current!.style.opacity = String(range(p, .08, .12) * (1 - range(p, .28, .4)))
      baseline.current!.style.transform = `translateY(${12 * (1 - count)}px) scale(${.97 + .03 * count})`
      layer.style.opacity = String(range(p, .28, .4))
      demo.current!.style.opacity = String(range(p, .28, .4))
      const textSwap = range(p, .23, .28)
      const [before, after] = [...swap.current!.children] as HTMLElement[]
      before.style.opacity = String(1 - textSwap); before.style.transform = `translateY(${-12 * textSwap}px)`
      after.style.opacity = String(textSwap); after.style.transform = `translateY(${12 * (1 - textSwap)}px)`
      const rise = ease(range(p, .44, .62))
      headline.current!.style.opacity = String(1 - range(p, .44, .60))
      headline.current!.style.transform = `translateY(${-320 * rise}px)`
      poster.current!.style.transform = `translate(${24 * (1 - rise)}px,${innerHeight * (1 - rise)}px) scale(${.96 + .04 * rise})`
      poster.current!.style.opacity = String(range(p, .4, .46))
      filtered.current!.style.filter = `blur(${6 * range(p, .62, .74)}px)`
      const show = p >= .7 && p < .96
      if (!show && action.current!.contains(document.activeElement)) select.current?.focus({ preventScroll: true })
      action.current!.inert = !show
      action.current!.style.visibility = show ? 'visible' : 'hidden'
      action.current!.style.opacity = String(range(p, .68, .74))
      canvas.style.opacity = String(1 - range(p, .84, 1))
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(render) }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; visibility() }, { threshold: 0 })
    const resize = new ResizeObserver(measure)
    const visible = () => { visibility(); if (document.visibilityState === 'visible') schedule(); else { cancelAnimationFrame(frame); frame = 0 } }
    observer.observe(root); resize.observe(root); measure(); visibility()
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visible)
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect()
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', visible); layer.dataset.running = 'false'
    }
  }, [mode, reduced])

  return <main id="main-content" className={`${cm.preview} ${styles.page}`} data-theme="dark" data-reduced={reduced}>
    <header className={styles.controls}>
      <a href="#scene-top">Scene trial</a>
      <label>Backdrop <select ref={select} aria-label="Presentation mode" value={mode} onChange={event => setMode(event.target.value as Mode)}>
        <option value="animated">Animated</option><option value="static">Static</option><option value="reduced">Reduced motion</option>
      </select></label>
      <span>Local · motion-test · unverified figures</span>
    </header>
    <h1 className={styles.srOnly}>Citymobil motion experiment</h1>
    <div ref={pin} className={styles.pin} id="scene-top">
      <div ref={stage} className={styles.stage}>
        <section ref={hero} className={styles.hero} aria-label="Original editorial car reference">
          <picture>
            <source media="(max-width:760px)" srcSet="/images/citymobil/motion/hero-mobile.webp" width={500} height={1024}/>
            <img src="/images/citymobil/motion/hero-desktop.webp" alt="Existing editorial Citymobil car image" width={1536} height={1024} fetchPriority="high"/>
          </picture>
          <div className={styles.intro}><p>Citymobil / Local motion study</p><p>Scroll to try the scene. Reverse scroll retraces it.</p></div>
        </section>
        <section ref={baseline} className={styles.baseline} aria-label="Unverified motion-test numbers">
          <h2>Support demand outpaced capacity.</h2>
          <p className={styles.disclosure}>Motion-test data · source, period and methodology unverified. These are not published results.</p>
          <dl className={styles.metrics}>{metrics.map((metric, i) => <div key={metric.label}>
            <dt>{metric.label}</dt><dd><span ref={node => { values.current[i] = node }} aria-hidden="true">{metric.value.toLocaleString('en-US')}</span><span className={styles.srOnly}>{metric.value.toLocaleString('en-US')} — unverified test value</span></dd>
          </div>)}</dl>
          <p ref={swap} className={styles.swap}><span>Existing team. Growing demand.</span><span>Design objective: more capacity, less learning friction. Measured outcomes: TBD.</span></p>
        </section>
        <section ref={demo} className={styles.demo} aria-label="Static interface reveal">
          <div ref={backdrop} className={background.stage} data-running="false"><CitymobilBackdrop/></div>
          <div ref={headline} className={styles.headline}><p>Better conversations.</p><p>Better support.</p></div>
          <div ref={poster} className={styles.poster}><div ref={filtered} className={styles.filtered}>
            <p className={styles.browserTitle}>Citymobil · static local interface capture</p>
            <picture><source media="(max-width:599px)" srcSet="/images/citymobil/motion/poster-mobile.webp"/><img src="/images/citymobil/motion/poster-desktop.webp" width={1440} height={800} alt="Static fictional support workspace; the simulator is opened separately"/></picture>
          </div></div>
          <div ref={action} className={styles.action}>
            <p>Interactive demo</p><a href="/preview/citymobil" target="_blank" rel="noopener">Start local simulator <span aria-hidden="true">↗</span></a>
            <small>Opens a separate tab · fictional data · simulated support flow</small>
          </div>
        </section>
      </div>
    </div>
    <section className={styles.following} aria-label="Original interface references">
      <h2>Context beside the conversation</h2><p>Original interface stills. No playback or live map is running in this preview.</p>
      <div>{['info','scripts'].map(name => <figure key={name}><img src={`/vk/${name}-light.png`} alt={`Original Citymobil ${name} interface still`} width={628} height={628}/><figcaption>{name === 'info' ? 'Info' : 'Scripts'} · original static reference</figcaption></figure>)}</div>
      <p>Static design parity is not verified: full Figma scene context is unavailable. This is a motion trial on the existing background canvas.</p>
    </section>
  </main>
}
