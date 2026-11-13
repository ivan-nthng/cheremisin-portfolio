'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './home-project-previews.module.css'

type Point = { x: number; y: number }
type Project = 'citymobil' | 'hito' | 'litres' | 'libraries' | 'metabox'
type Entry = { anchor: HTMLAnchorElement; project: Project }
const initialReady: Record<Project, boolean> = { citymobil: false, hito: false, litres: false, libraries: false, metabox: false }
const litresLogo = { src: '/images/litres/author/brand.svg', width: 124, height: 20 }
const projectCovers = [
  {
    id: 'litres',
    title: 'Publishing Workspace',
    description: 'Sales and readership for authors and publishers.',
    logo: litresLogo,
    image: { src: '/images/litres/case/home-cover.webp', width: 1080, height: 676 },
  },
  {
    id: 'libraries',
    title: 'Libraries Interface',
    description: 'Manage readers and borrowing rules.',
    logo: litresLogo,
    image: { src: '/images/litres/library-case/workspace.webp', width: 1440, height: 868 },
  },
  {
    id: 'metabox',
    title: '3D Source',
    description: 'Configure 3D products and render camera views.',
    logo: null,
    image: { src: '/images/metabox/products/porsche-current-delivery.webp', width: 1920, height: 1080 },
  },
] as const

function getEntry(target: EventTarget | null): Entry | null {
  if (!(target instanceof Element)) return null
  const anchor = target.closest<HTMLAnchorElement>('a[data-home-project-preview]')
  const project = anchor?.dataset.homeProjectPreview
  return anchor && project && Object.hasOwn(initialReady, project) ? { anchor, project: project as Project } : null
}

function contains(anchor: HTMLAnchorElement, target: EventTarget | null) {
  return target instanceof Node && anchor.contains(target)
}

/** One decorative portal and pointer controller for the published Home project links. */
export function HomeProjectPreviews({ children }: { children: ReactNode }) {
  const cover = useRef<HTMLDivElement>(null)
  const active = useRef<Entry | null>(null)
  const ready = useRef({ ...initialReady })
  const reduced = useRef(false)
  const point = useRef<Point | null>(null)
  const frame = useRef(0)
  const shown = useRef<{ project: Project; visible: boolean }>({ project: 'citymobil', visible: false })
  const [eligible, setEligible] = useState(false)
  const [view, setView] = useState(shown.current)

  const show = useCallback((project: Project | null) => {
    const next = { project: project ?? shown.current.project, visible: project !== null }
    if (shown.current.project !== next.project || shown.current.visible !== next.visible) {
      shown.current = next
      setView(next)
    }
  }, [])

  const dismiss = useCallback(() => {
    active.current = null
    cancelAnimationFrame(frame.current)
    frame.current = 0
    show(null)
  }, [show])

  const place = useCallback((cursor: Point) => {
    const node = cover.current, entry = active.current
    if (!node || !entry || !ready.current[entry.project]) return
    const width = node.offsetWidth, height = node.offsetHeight, inset = 24
    const viewportWidth = document.documentElement.clientWidth, viewportHeight = innerHeight
    if (width + inset * 2 > viewportWidth || height + inset * 2 > viewportHeight) { show(null); return }
    const title = entry.anchor.getBoundingClientRect()
    const positions = [
      { x: cursor.x + 24, y: cursor.y + 32 },
      { x: cursor.x + 24, y: cursor.y - height - 32 },
      { x: cursor.x - width - 24, y: cursor.y + 32 },
      { x: cursor.x - width - 24, y: cursor.y - height - 32 },
    ]
    const fits = ({ x, y }: Point) => x >= inset && y >= inset && x + width <= viewportWidth - inset && y + height <= viewportHeight - inset &&
      (x + width <= title.left || x >= title.right || y + height <= title.top || y >= title.bottom)
    // Prefer the exact pointer offsets, then fit inside the viewport if a
    // narrower desktop still has a complete slot that leaves the title clear.
    const position = positions.find(fits) ?? positions.map(({ x, y }) => ({
      x: Math.max(inset, Math.min(x, viewportWidth - width - inset)),
      y: Math.max(inset, Math.min(y, viewportHeight - height - inset)),
    })).find(fits)
    if (!position) { show(null); return }
    node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
    show(entry.project)
  }, [show])

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reduced.current = motion.matches
      setEligible(fine.matches)
      if (!fine.matches) ready.current = { ...initialReady }
      dismiss()
    }
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape' || event.key === 'Tab') dismiss() }
    update()
    fine.addEventListener('change', update); motion.addEventListener('change', update)
    window.addEventListener('scroll', dismiss, { passive: true, capture: true })
    window.addEventListener('resize', dismiss); window.addEventListener('blur', dismiss)
    document.addEventListener('keydown', key)
    return () => {
      cancelAnimationFrame(frame.current)
      fine.removeEventListener('change', update); motion.removeEventListener('change', update)
      window.removeEventListener('scroll', dismiss, true)
      window.removeEventListener('resize', dismiss); window.removeEventListener('blur', dismiss)
      document.removeEventListener('keydown', key)
    }
  }, [dismiss])

  function loaded(project: Project) {
    ready.current[project] = true
    if (active.current?.project === project && point.current) place(point.current)
  }

  function failed(project: Project) {
    ready.current[project] = false
    if (active.current?.project === project) show(null)
  }

  return <>
    <div className="editorial-projects"
      onPointerOver={event => {
        if (event.pointerType === 'touch') { dismiss(); return }
        const entry = getEntry(event.target)
        if (!eligible || !entry || contains(entry.anchor, event.relatedTarget)) return
        dismiss()
        active.current = entry
        point.current = { x: event.clientX, y: event.clientY }
        place(point.current)
      }}
      onPointerMove={event => {
        if (!active.current || reduced.current) return
        point.current = { x: event.clientX, y: event.clientY }
        if (!frame.current) frame.current = requestAnimationFrame(() => {
          frame.current = 0
          if (active.current && point.current) place(point.current)
        })
      }}
      onPointerOut={event => {
        const entry = active.current
        if (entry && contains(entry.anchor, event.target) && !contains(entry.anchor, event.relatedTarget)) dismiss()
      }}
      onClick={event => { if (getEntry(event.target)) dismiss() }}>
      {children}
    </div>
    {eligible && createPortal(<div ref={cover} className={styles.cover} data-project-cover={view.project} data-visible={view.visible} aria-hidden="true">
      <img className={styles.citymobil} hidden={view.project !== 'citymobil'} src="/images/citymobil/case/hero-desktop.webp"
        alt="" width={1536} height={1024} draggable={false} decoding="async"
        onLoad={() => loaded('citymobil')} onError={() => failed('citymobil')} />
      <img className={styles.hito} hidden={view.project !== 'hito'} src="/images/hito/case/home-cover.webp"
        alt="" width={960} height={512} draggable={false} decoding="async"
        onLoad={() => loaded('hito')} onError={() => failed('hito')} />
      {projectCovers.map(({ id, title, description, logo, image }) => (
        <div key={id} className={styles.projectFrame} hidden={view.project !== id}>
          <Image {...image} alt="" className={styles.projectArtwork} sizes="480px"
            draggable={false} loading="eager" onLoad={() => loaded(id)} onError={() => failed(id)} />
          <div className={styles.projectCopy}>
            {logo && <img {...logo} alt="" draggable={false} />}
            <p className={styles.projectTitle}>{title}</p>
            <p className={styles.projectDescription}>{description}</p>
          </div>
        </div>
      ))}
      {view.project === 'citymobil' && <div className={styles.copy}><p className={styles.title}>Citymobil</p><p>One workspace for support</p></div>}
    </div>, document.body)}
  </>
}
