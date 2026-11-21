'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { contacts, homeIdentity } from '@/lib/site-content'
import { projects } from '@/lib/projects'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { PortfolioBackLink } from '@/components/portfolio/PortfolioBackLink'
import { ContactLinks } from '@/components/portfolio/ContactLinks'
import { ContactSheet } from './ContactSheet'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { HomeEyeLoader } from './HomeEyeLoader'
import { CaseNavigation } from '@/components/citymobil-case/CaseNavigation'
import caseStyles from '@/components/citymobil-case/case.module.css'

export function Header({ homeEyeBootstrap }: { homeEyeBootstrap: string }) {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  const trigger = useRef<HTMLButtonElement>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pointerEntry, setPointerEntry] = useState(false)
  const home = pathname === '/'
  const citymobilCase = pathname === '/preview/citymobil-case' || pathname === '/projects/taxi-aggregator-support-workspace'
  const gridPage = home || pathname === '/manifesto'
  const caseGrid = pathname === '/projects/litres' || pathname === '/projects/litres-library'
    || pathname === '/projects/metabox' || pathname === '/projects/taxi-aggregator-support-workspace'
  const title = home ? homeIdentity.name
    : citymobilCase ? 'Citymobil'
    : pathname === '/projects/litres' ? 'LitRes Publishing Workspace'
    : (pathname === '/preview/litres-library-case' || pathname === '/projects/litres-library') ? 'LitRes Library'
    : (pathname === '/preview/metabox-case' || pathname === '/projects/metabox') ? '3D Source Metabox'
    : pathname === '/projects' ? 'Projects'
    : pathname === '/manifesto' ? 'Manifesto'
    : projects.find(project => project.link === pathname)?.title ?? 'Portfolio'

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      setSheetOpen(false)
    }
  }, [pathname])

  useLayoutEffect(() => {
    const node = header.current
    const hero = document.querySelector<HTMLElement>('.home-photo-hero')
    const copy = hero?.querySelector<HTMLElement>('.home-hero-copy')
    const nav = node?.querySelector<HTMLElement>('.context-contacts')
    if (!home || !node || !hero || !copy || !nav) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clamp = (value: number) => Math.min(1, Math.max(0, value))
    let frame = 0
    let distance = 1
    let focusPlacement: string | null = null
    const update = () => {
      if (document.querySelector('#mobile-contact-sheet[open]')) return
      // If enlarged copy outgrows the first screen, keep it in readable
      // document flow instead of fading it before the visitor can reach it.
      const moving = !reduced.matches && hero.offsetHeight <= window.innerHeight + 1
      const progress = moving ? clamp(window.scrollY / distance) : 0
      node.dataset.heroMotion = moving ? 'scroll' : 'static'
      node.style.setProperty('--hero-name-offset', `${moving ? Math.max(0, distance - window.scrollY) : distance}px`)
      node.style.setProperty('--hero-surface-opacity', String(clamp((progress - .5) * 2)))
      hero.style.setProperty('--hero-photo-opacity', String(1 - progress))
      hero.style.setProperty('--hero-details-opacity', String(clamp((1 - progress) / .7)))
      const opacity = progress < .65 ? 1 - clamp((progress - .35) / .3) : clamp((progress - .9) / .1)
      const focused = nav.contains(document.activeElement)
      if (focused) focusPlacement = nav.dataset.heroPlacement ?? 'hero'
      else if (opacity === 0 || !moving) focusPlacement = null
      // Keyboard focus holds its existing target in place. Normal relocation
      // happens inside the zero-opacity band, symmetrically on reverse scroll.
      nav.dataset.heroPlacement = focusPlacement ?? (progress >= .8 ? 'header' : 'hero')
      nav.style.setProperty('--hero-contacts-opacity', String(focused ? 1 : opacity))
    }
    const measure = () => {
      if (document.querySelector('#mobile-contact-sheet[open]')) return
      const safeTop = Number.parseFloat(getComputedStyle(node).paddingTop) || 0
      distance = Math.max(1, copy.getBoundingClientRect().top + window.scrollY - safeTop - 12)
      node.style.setProperty('--hero-name-rest', `${distance}px`)
      update()
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    measure()
    let observer: ResizeObserver | undefined
    try { observer = new ResizeObserver(measure); observer.observe(hero); observer.observe(copy) } catch { observer?.disconnect() }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    nav.addEventListener('focusin', update)
    nav.addEventListener('focusout', schedule)
    reduced.addEventListener('change', measure)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      nav.removeEventListener('focusin', update)
      nav.removeEventListener('focusout', schedule)
      reduced.removeEventListener('change', measure)
      delete node.dataset.heroMotion
      for (const property of ['--hero-name-offset', '--hero-name-rest', '--hero-surface-opacity']) node.style.removeProperty(property)
      hero.style.removeProperty('--hero-photo-opacity')
      hero.style.removeProperty('--hero-details-opacity')
      nav.style.removeProperty('--hero-contacts-opacity')
      delete nav.dataset.heroPlacement
    }
  }, [home])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 599px)')
    const closeOnDesktop = () => { if (!mobile.matches) setSheetOpen(false) }
    mobile.addEventListener('change', closeOnDesktop)
    return () => mobile.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!header.current) return
    const update = () => document.documentElement.style.setProperty('--header-offset', `${header.current!.getBoundingClientRect().height + 24}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header.current, { box: 'border-box' })
    return () => observer.disconnect()
  }, [pathname])

  // The local product preview deliberately has no portfolio chrome.
  if (pathname?.startsWith('/projects/litres/demo') || pathname === '/preview/metabox' || pathname?.startsWith('/preview/metabox/') || pathname === '/preview/litres-readers' || pathname === '/preview/litres-library-components' || (pathname === '/preview/litres-author' || pathname?.startsWith('/preview/litres-author/')) || pathname === '/preview/citymobil' || pathname === '/preview/citymobil-background' || pathname === '/preview/citymobil-motion' || pathname === '/preview/citymobil-features' || pathname?.startsWith('/preview/citymobil-features/')) return null

  return <>
    {home ? <HomeEyeLoader bootstrap={homeEyeBootstrap} /> : null}
    <header ref={header} className={`context-header ${home ? 'context-home context-photo-home' : 'context-page'}${gridPage ? ' context-grid' : ''}${citymobilCase ? ` ${caseStyles.header}` : ''}`} style={{ paddingTop: gridPage ? 'env(safe-area-inset-top, 0px)' : 0 }}>
      <div className={`context-header-lane${gridPage ? ' portfolio-grid-lane' : ''}`}>
        {!home ? <PortfolioBackLink from={pathname ?? ''} /> : null}
        <div className="context-identity">{home
          ? <h1 id="portfolio-identity" className="context-title"><span className="context-title-label">{title}</span></h1>
          : <p className="context-title"><span className="context-title-label">{title}</span></p>}</div>
        {citymobilCase && <CaseNavigation/>}
        <nav className="context-contacts" aria-label="Contact Ivan" data-hero-placement={home ? 'hero' : undefined}>
          {contacts.map(contact => <a key={contact.label} className="editorial-link" href={contact.href}
            {...(contact.label !== 'Email' ? { target: '_blank', rel: 'noreferrer' } : {})}>
            <span className="context-control-label"><span className="context-inline-contact-label">{contact.label}</span><PortfolioArrow /></span>
          </a>)}
        </nav>
        {!gridPage ? <button ref={trigger} type="button" className="editorial-link context-contact-trigger" aria-haspopup="dialog"
          aria-expanded={sheetOpen} aria-controls={sheetOpen ? 'mobile-contact-sheet' : undefined} onClick={event => {
            setPointerEntry(event.detail > 0)
            setSheetOpen(true)
          }}>
          <span className="context-control-label"><span className="context-contact-label">Contact</span><ChevronDown size={16} aria-hidden="true" /></span>
        </button> : null}
        <noscript>
          <style>{'.context-contact-trigger { display: none !important; }'}</style>
          <nav className="context-contact-fallback" aria-label="Contact Ivan">
            <ContactLinks />
          </nav>
        </noscript>
      </div>
    </header>
    {gridPage || caseGrid ? <PortfolioGrid key={pathname}
      trackSelector={caseGrid ? '[data-case-feature-grid]' : undefined} showContact={gridPage}
      contactTrigger={trigger} contactOpen={sheetOpen} onContact={event => {
      setPointerEntry(event.detail > 0)
      setSheetOpen(true)
    }} /> : null}
    {sheetOpen ? <ContactSheet onClose={() => setSheetOpen(false)} returnFocus={trigger} animateEntry={pointerEntry} /> : null}
  </>
}
export default Header
