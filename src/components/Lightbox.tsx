'use client'

import { useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from './lightbox.module.css'

interface LightboxProps {
    preventMediaSelection?: boolean
    isOpen: boolean
    onClose: () => void
    image?: string
    video?: string
    alt: string
    caption?: string
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
    gallery?: { index: number; count: number }
    returnFocus?: RefObject<HTMLElement | null>
}

function GalleryMedia({ image, alt, caption, index, count }: { image: string; alt: string; caption?: string; index: number; count: number }) {
    const [displayed, setDisplayed] = useState({ image, alt, caption, index, count, failed: false })
    useEffect(() => {
        let active = true
        const next = new Image(); next.src = image
        // Keep the previous bitmap and its caption until the next frame can paint.
        next.decode().then(() => { if (active) setDisplayed({ image, alt, caption, index, count, failed: false }) }).catch(() => { if (active) setDisplayed({ image, alt, caption, index, count, failed: true }) })
        return () => { active = false }
    }, [image, alt, caption, index, count])
    return <>
        <div className={styles.stage} aria-busy={displayed.image !== image}>{displayed.failed ? <p>Preview unavailable</p> : <img key={displayed.image} src={displayed.image} alt={displayed.alt} className={styles.slide} draggable={false}/>}</div>
        <figcaption role="status">{displayed.index + 1} / {displayed.count}{displayed.caption ? ` · ${displayed.caption}` : ''}</figcaption>
    </>
}

/** Portal keeps fixed chrome outside any revealing/transformed media ancestor. */
export function Lightbox({ preventMediaSelection = false, isOpen, onClose, image, video, alt, caption, onNext, onPrevious, hasNext, hasPrevious, gallery, returnFocus }: LightboxProps) {
    const dialog = useRef<HTMLDivElement>(null)
    const swipe = useRef<{ x: number; y: number } | null>(null)
    const opener = useRef(returnFocus)
    opener.current = returnFocus
    const callbacks = useRef({ onClose, onNext, onPrevious, hasNext, hasPrevious })
    useEffect(() => { callbacks.current = { onClose, onNext, onPrevious, hasNext, hasPrevious } })
    useEffect(() => {
        if (!isOpen) return
        const previousFocus = opener.current?.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
        const htmlOverflow = document.documentElement.style.overflow
        const bodyOverflow = document.body.style.overflow
        const padding = document.body.style.paddingRight
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
        dialog.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
        const keydown = (event: KeyboardEvent) => {
            const current = callbacks.current
            if (event.key === 'Escape') { event.preventDefault(); current.onClose() }
            if (event.key === 'ArrowRight' && current.hasNext) { event.preventDefault(); current.onNext?.() }
            if (event.key === 'ArrowLeft' && current.hasPrevious) { event.preventDefault(); current.onPrevious?.() }
            if (event.key === 'Tab') {
                const controls = [...(dialog.current?.querySelectorAll<HTMLElement>('button, video[controls]') ?? [])]
                const index = controls.indexOf(document.activeElement as HTMLElement)
                if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)?.focus() }
                else if (!event.shiftKey && (index === controls.length - 1 || index === -1)) { event.preventDefault(); controls[0]?.focus() }
            }
        }
        window.addEventListener('keydown', keydown)
        return () => {
            document.documentElement.style.overflow = htmlOverflow
            document.body.style.overflow = bodyOverflow
            document.body.style.paddingRight = padding
            window.removeEventListener('keydown', keydown)
            previousFocus?.focus({ preventScroll: true })
        }
    }, [isOpen])
    if (!isOpen || typeof document === 'undefined') return null
    const stop = (event: MouseEvent) => event.stopPropagation()
    return createPortal(
        <div ref={dialog} className={`portfolio-lightbox${gallery ? ` ${styles.gallery}` : ''}`} role="dialog" aria-modal="true" aria-label="Image lightbox" data-lightbox-root="true" data-lightbox-gallery={gallery ? true : undefined} onClick={onClose} onTouchStartCapture={gallery ? event => { if (event.touches.length !== 1) swipe.current = null } : undefined}>
            <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close lightbox"><XMarkIcon width={24} height={24} /></button>
            {hasPrevious || gallery ? <button type="button" className="lightbox-previous" aria-disabled={gallery ? !hasPrevious : undefined} onClick={event => { stop(event); if (hasPrevious) onPrevious?.() }} aria-label="Previous image"><ChevronLeftIcon width={28} height={28} /></button> : null}
            <figure className="lightbox-figure" onClick={stop} onTouchStart={gallery ? event => {
                // A second finger cancels slide navigation for the entire gesture.
                swipe.current = event.touches.length === 1 && (window.visualViewport?.scale ?? 1) <= 1.01 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null
            } : undefined} onTouchMove={gallery ? event => {
                if (event.touches.length !== 1 || (window.visualViewport?.scale ?? 1) > 1.01) swipe.current = null
            } : undefined} onTouchCancel={gallery ? () => { swipe.current = null } : undefined} onTouchEnd={gallery ? event => {
                const start = swipe.current; swipe.current = null
                if (!start || event.touches.length || !event.changedTouches[0] || (window.visualViewport?.scale ?? 1) > 1.01) return
                const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y
                if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return
                if (dx < 0 && hasNext) onNext?.()
                if (dx > 0 && hasPrevious) onPrevious?.()
            } : undefined}>
                {video ? <video src={video} controls autoPlay muted playsInline className="lightbox-media" aria-label={alt} /> : image ? gallery ? <GalleryMedia image={image} alt={alt} caption={caption} index={gallery.index} count={gallery.count}/> : <img src={image} alt={alt} className="lightbox-media" draggable={preventMediaSelection ? false : undefined} style={preventMediaSelection ? { userSelect: 'none', WebkitUserSelect: 'none' } : undefined} /> : <p>Preview unavailable</p>}
                {caption && !gallery ? <figcaption>{caption}</figcaption> : null}
            </figure>
            {hasNext || gallery ? <button type="button" className="lightbox-next" aria-disabled={gallery ? !hasNext : undefined} onClick={event => { stop(event); if (hasNext) onNext?.() }} aria-label="Next image"><ChevronRightIcon width={28} height={28} /></button> : null}
        </div>, document.body,
    )
}
