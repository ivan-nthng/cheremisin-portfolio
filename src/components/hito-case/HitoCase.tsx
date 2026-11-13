import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { ContactSheet } from '@/components/layout/ContactSheet'
import { ContactLinks } from '@/components/portfolio/ContactLinks'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { PortfolioBackLink } from '@/components/portfolio/PortfolioBackLink'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { CaseTemplate } from '@/components/portfolio/case-story/CaseTemplate'
import ProjectNavigation from '@/components/ProjectNavigation'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { CasePlayer } from './CasePlayer'
import { Examples } from './Examples'
import styles from './case.module.css'

const storybookUrl = 'https://www.hitocajon.com/storybook/'
const resources = [
  ['Website', 'https://www.hitocajon.com/'],
  ['Storybook', storybookUrl],
  ['GitHub', 'https://github.com/ivan-nthng/hito-runner'],
  ['Figma', 'https://www.figma.com/design/C8ymDNFqGISrgIe6iGimHX/Hito-DS'],
]

function CaseHeader() {
  const trigger = useRef<HTMLButtonElement>(null)
  const [contact, setContact] = useState<{ animate: boolean } | null>(null)
  return <>
    <header className={`context-header context-page ${styles.header}`}>
      <div className="context-header-lane">
        <PortfolioBackLink from="/projects/ds-hito" />
        <div className="context-identity"><p className="context-title">Hito DS</p></div>
        <nav className="context-contacts" aria-label="Contact Ivan"><ContactLinks /></nav>
        <button ref={trigger} className="editorial-link context-contact-trigger" type="button" aria-haspopup="dialog"
          aria-expanded={Boolean(contact)} aria-controls={contact ? 'mobile-contact-sheet' : undefined}
          onClick={event => setContact({ animate: event.detail > 0 })}>Contact <ChevronDown size={16} aria-hidden="true" /></button>
      </div>
    </header>
    <PortfolioGrid trackSelector="[data-case-feature-grid]" showContact={false} />
    {contact && <ContactSheet returnFocus={trigger} onClose={() => setContact(null)} animateEntry={contact.animate} />}
  </>
}

const ellipses = [
  [1726.81, 0, 1172.93, 824.727],
  [879.69, 229.09, 1596.49, 503.99],
  [0, 91.64, 1221.81, 916.364],
  [1857.13, 219.93, 977.444, 549.808],
  [993.73, 265.74, 1140.35, 503.99],
  [293.23, 36.65, 733.081, 641.444],
]

function Hero() {
  const hero = useRef<HTMLElement>(null)
  useEffect(() => {
    const node = hero.current
    if (!node) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let heroEnd = 0
    let frame = 0
    function paint() {
      frame = 0
      if (!node) return
      const { top, height } = node.getBoundingClientRect()
      const travel = Math.max(0, Math.min(height, 44 - top))
      const start = Math.max(0, height - (innerHeight - 44))
      const progress = Math.min(1, Math.max(0, (travel - start) / Math.min(height * .65, innerHeight * .65)))
      node.style.setProperty('--art-y', `${travel}px`)
      node.style.setProperty('--hero-offset', `${-progress * 72}px`)
      node.style.setProperty('--hero-opacity', String(1 - progress))
    }
    function request() {
      if (!frame && scrollY < heroEnd && !document.hidden && !motion.matches) frame = requestAnimationFrame(paint)
    }
    function update() {
      if (!node) return
      node.dataset.drift = String(visible && !document.hidden && !motion.matches)
      if (node.dataset.drift === 'true') request()
      else if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(node)
    const size = new ResizeObserver(() => {
      heroEnd = node.getBoundingClientRect().bottom + scrollY
      request()
    })
    size.observe(node)
    window.addEventListener('scroll', request, { passive: true })
    document.addEventListener('visibilitychange', update)
    motion.addEventListener('change', update)
    return () => {
      observer.disconnect()
      size.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      document.removeEventListener('visibilitychange', update)
      motion.removeEventListener('change', update)
    }
  }, [])
  return <section ref={hero} className={styles.hero} aria-labelledby="hito-title">
    <div className={styles.artWindow} aria-hidden="true">
      <div className={styles.artCanvas}>
        <div className={styles.artPosition}>
          <div className={styles.artDrift}>{ellipses.map(([x, y, width, height], i) =>
            <img key={i} src={`/images/hito/case/artwork-${i + 1}.svg`} width={width} height={height}
              alt="" draggable={false} style={{ left: x, top: y } as CSSProperties} />)}</div>
        </div>
        <div className={styles.grain} /><div className={styles.veil} />
      </div>
    </div>
    <div className={styles.heroContent}>
      <div className={styles.intro}>
        <h1 id="hito-title"><a className={styles.wordmark} href={resources[0][1]} target="_blank" rel="noreferrer"><img src="/images/hito/case/wordmark.svg" width={227.665} height={95.9963} alt="Hito" /></a></h1>
        <p>An AI-first design system for small teams and solo developers.</p>
        <nav className={styles.resources} aria-label="Hito resources">
          {resources.map(([label, href]) => <a className="editorial-link" key={label} href={href} target="_blank" rel="noreferrer">
            {label}<PortfolioArrow />
          </a>)}
        </nav>
      </div>
      <CasePlayer />
    </div>
  </section>
}

export default function HitoCase() {
  return <div className={styles.root} data-hito-case="">
    <a className={styles.skip} href="#main-content">Skip to main content</a>
    <CaseHeader />
    <CaseTemplate hero={<Hero />}
      context={<div className={`${styles.story} ${styles.storyContext}`}>
        <RepeatReveal className={styles.why}>
          <section aria-labelledby="why-hito">
            <h2 id="why-hito">Why Hito</h2>
            <p>A shared foundation. Room for identity.</p>
            <p>I started by organizing and extending a component and token library into a system that designers and React developers could adapt for different products. The aim was to keep patterns consistent while leaving room for each product’s identity.</p>
          </section>
        </RepeatReveal>
        <RepeatReveal className={styles.why}>
          <section aria-labelledby="how-hito-works">
            <h2 id="how-hito-works">How it works</h2>
            <p>Semantic tokens describe the role of each value; reusable components carry that structure into real interface states. Figma, React and Storybook let teams design, build and inspect the system.</p>
          </section>
        </RepeatReveal>
      </div>}
      details={<div className={styles.story}>
        <Examples />
        <a className={`editorial-link ${styles.moreComponents}`} href={storybookUrl} target="_blank" rel="noreferrer">
          More components<PortfolioArrow />
        </a>
      </div>}
      further={<>
        <div className={styles.story}>
          <RepeatReveal className={styles.why}>
            <section aria-labelledby="hito-status">
              <h2 id="hito-status">Still taking shape.</h2>
              <p>Hito is in alpha. I’m developing its theming and setup guidance, and looking for designers and developers to help test and shape it in real projects.</p>
              <a className="editorial-link" href="mailto:ivan@cheremisin.co.uk">Let’s collaborate<PortfolioArrow /></a>
            </section>
          </RepeatReveal>
        </div>
        <ProjectNavigation href="/projects/ds-hito" native />
      </>}
    />
  </div>
}
