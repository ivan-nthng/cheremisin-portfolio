'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Check, Download, Image } from 'lucide-react'
import controls from '../metabox-controls.module.css'
import styles from './render-history-menu.module.css'

type Props = {
  name: string
  url: string
  file: string
  isThumbnail: boolean
  onThumbnail: () => void
}

export default function RenderHistoryMenu({ name, url, file, isThumbnail, onThumbnail }: Props) {
  const id = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const focusLast = useRef(false)
  const [host, setHost] = useState<HTMLElement | null>(null)

  function open(last = false) {
    focusLast.current = last
    setHost(trigger.current?.closest<HTMLElement>('main[data-theme]') ?? document.body)
  }

  function close(restoreFocus = false) {
    setHost(null)
    if (restoreFocus) trigger.current?.focus({ preventScroll: true })
  }

  useLayoutEffect(() => {
    const popup = menu.current
    const anchor = trigger.current
    if (!host || !popup || !anchor) return

    const bounds = anchor.getBoundingClientRect()
    const left = Math.max(8, Math.min(bounds.right - popup.offsetWidth, window.innerWidth - popup.offsetWidth - 8))
    const below = bounds.bottom + 4
    const top = below + popup.offsetHeight + 8 <= window.innerHeight ? below : Math.max(8, bounds.top - popup.offsetHeight - 4)
    popup.style.left = `${left}px`
    popup.style.top = `${top}px`
    const items = popup.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)')
    items[focusLast.current ? items.length - 1 : 0]?.focus({ preventScroll: true })
  }, [host])

  useEffect(() => {
    if (!host) return
    const dismiss = () => setHost(null)
    function onOutside(event: PointerEvent) {
      const target = event.target
      if (target instanceof Node && !menu.current?.contains(target) && !trigger.current?.contains(target)) dismiss()
    }

    document.addEventListener('pointerdown', onOutside)
    window.addEventListener('resize', dismiss)
    window.addEventListener('scroll', dismiss, true)
    return () => {
      document.removeEventListener('pointerdown', onOutside)
      window.removeEventListener('resize', dismiss)
      window.removeEventListener('scroll', dismiss, true)
    }
  }, [host])

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close(true)
      return
    }
    if (event.key === 'Tab') {
      close(true)
      return
    }

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'))
    const index = items.indexOf(document.activeElement as HTMLElement)
    const next = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    items[next]?.focus({ preventScroll: true })
  }

  return <>
    <button type="button" ref={trigger} aria-label={`Render actions for ${name}`} aria-haspopup="menu"
      aria-expanded={Boolean(host)} aria-controls={host ? id : undefined}
      className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.trigger}`}
      onClick={() => host ? close() : open()} onKeyDown={event => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
        event.preventDefault()
        open(event.key === 'ArrowUp')
      }}>
      <img src="/images/metabox/catalog/more.svg" width={16} height={16} alt="" />
    </button>
    {host && createPortal(<div ref={menu} id={id} role="menu" aria-label={`Render actions for ${name}`}
      className={styles.menu} onKeyDown={onMenuKeyDown} onBlur={event => {
        const target = event.relatedTarget
        if (target instanceof Node && !event.currentTarget.contains(target) && !trigger.current?.contains(target)) close()
      }}>
      <button type="button" role="menuitem" tabIndex={-1} disabled={isThumbnail} onClick={() => {
        onThumbnail()
        close(true)
      }}>
        {isThumbnail ? <Check size={14} aria-hidden="true" /> : <Image size={14} aria-hidden="true" />}
        Set as thumbnail
      </button>
      <a role="menuitem" tabIndex={-1} href={url} download={file} onClick={() => close(true)}>
        <Download size={14} aria-hidden="true" />
        Download
      </a>
    </div>, host)}
  </>
}
