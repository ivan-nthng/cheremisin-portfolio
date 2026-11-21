'use client'

import { useLayoutEffect, useRef, type RefObject } from 'react'
import { X } from 'lucide-react'
import { flushSync } from 'react-dom'
import { ContactLinks } from '@/components/portfolio/ContactLinks'
import { cssNumber } from '@/lib/utils'

interface ContactSheetProps {
  onClose: () => void
  returnFocus: RefObject<HTMLButtonElement | null>
  animateEntry: boolean
}

/** Native modal top layer supplies background isolation and keyboard containment.
 * Reuses the portfolio's existing contact data and modal scroll/focus contract. */
export function ContactSheet({ onClose, returnFocus, animateEntry }: ContactSheetProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const animation = useRef<Animation | null>(null)
  const mounted = useRef(false)

  useLayoutEffect(() => {
    const node = dialog.current
    if (!node) return
    mounted.current = true
    const route = window.location.pathname
    const scroll = { x: window.scrollX, y: window.scrollY }
    const body = document.body
    const properties = ['position', 'top', 'left', 'width', 'padding-right', 'overflow'] as const
    const before = properties.map(property => ({
      property,
      value: body.style.getPropertyValue(property),
      priority: body.style.getPropertyPriority(property),
    }))
    const htmlOverflow = document.documentElement.style.overflow
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.position = 'fixed'
    body.style.top = `${-scroll.y}px`
    body.style.left = `${-scroll.x}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    document.documentElement.style.overflow = 'hidden'
    node.showModal()
    node.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
    // Release fixed-body lock during the native navigation event, before the
    // browser restores the destination history entry's persisted scroll state.
    const closeBeforeNavigation = () => flushSync(() => onClose())
    window.addEventListener('popstate', closeBeforeNavigation)
    window.addEventListener('pagehide', closeBeforeNavigation)

    if (animateEntry && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animation.current = node.animate(
        [{ opacity: 0, transform: `translateY(${cssNumber('--motion-contact-distance', 12, node)}px)` }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: cssNumber('--motion-contact-enter', 180, node), easing: getComputedStyle(node).getPropertyValue('--motion-ease-out').trim() || 'cubic-bezier(.23,1,.32,1)' },
      )
    }
    return () => {
      window.removeEventListener('popstate', closeBeforeNavigation)
      window.removeEventListener('pagehide', closeBeforeNavigation)
      mounted.current = false
      animation.current?.cancel()
      node.close()
      for (const { property, value, priority } of before) {
        if (value) body.style.setProperty(property, value, priority)
        else body.style.removeProperty(property)
      }
      document.documentElement.style.overflow = htmlOverflow
      if (window.location.pathname === route) {
        window.scrollTo({ left: scroll.x, top: scroll.y, behavior: 'instant' })
      }
      const trigger = returnFocus.current
      const target = trigger && trigger.getClientRects().length
        ? trigger
        : document.querySelector<HTMLAnchorElement>('.context-contacts a')
      target?.focus({ preventScroll: true })
    }
  }, [animateEntry, returnFocus])

  function dismiss(pointer: boolean) {
    const node = dialog.current
    if (!node || !pointer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose()
      return
    }
    const current = getComputedStyle(node)
    const start = { opacity: current.opacity, transform: current.transform }
    animation.current?.cancel()
    animation.current = node.animate(
      [start, { opacity: 0, transform: `translateY(${cssNumber('--motion-contact-distance', 12, node)}px)` }],
      { duration: cssNumber('--motion-contact-exit', 140, node), easing: current.getPropertyValue('--motion-ease-out').trim() || 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' },
    )
    animation.current.finished.then(() => { if (mounted.current) onClose() }).catch(() => {})
  }

  return (
    <dialog ref={dialog} id="mobile-contact-sheet" className="contact-sheet" aria-labelledby="contact-sheet-title"
      onCancel={event => { event.preventDefault(); dismiss(false) }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const controls = [...(dialog.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? [])]
        const index = controls.indexOf(document.activeElement as HTMLElement)
        if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)?.focus() }
        else if (!event.shiftKey && (index === controls.length - 1 || index === -1)) { event.preventDefault(); controls[0]?.focus() }
      }}>
      <div className="contact-sheet-heading">
        <h2 id="contact-sheet-title">Contact Ivan</h2>
        <button type="button" className="editorial-link contact-sheet-close" onClick={event => dismiss(event.detail > 0)}>
          Close <X size={16} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Contact Ivan" className="contact-sheet-links">
        <ContactLinks />
      </nav>
    </dialog>
  )
}
