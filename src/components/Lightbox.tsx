'use client'

import { useEffect, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface LightboxProps {
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
}

/** Portal keeps fixed chrome outside any revealing/transformed media ancestor. */
export function Lightbox({ isOpen, onClose, image, video, alt, caption, onNext, onPrevious, hasNext, hasPrevious }: LightboxProps) {
    const dialog = useRef<HTMLDivElement>(null)
    const callbacks = useRef({ onClose, onNext, onPrevious, hasNext, hasPrevious })
    useEffect(() => { callbacks.current = { onClose, onNext, onPrevious, hasNext, hasPrevious } })
    useEffect(() => {
        if (!isOpen) return
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
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
        <div ref={dialog} className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox" data-lightbox-root="true" onClick={onClose}>
            <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close lightbox"><XMarkIcon width={24} height={24} /></button>
            {hasPrevious ? <button type="button" className="lightbox-previous" onClick={event => { stop(event); onPrevious?.() }} aria-label="Previous image"><ChevronLeftIcon width={28} height={28} /></button> : null}
            <figure className="lightbox-figure" onClick={stop}>
                {video ? <video src={video} controls autoPlay muted playsInline className="lightbox-media" aria-label={alt} /> : image ? <img src={image} alt={alt} className="lightbox-media" /> : <p>Preview unavailable</p>}
                {caption ? <figcaption>{caption}</figcaption> : null}
            </figure>
            {hasNext ? <button type="button" className="lightbox-next" onClick={event => { stop(event); onNext?.() }} aria-label="Next image"><ChevronRightIcon width={28} height={28} /></button> : null}
        </div>, document.body,
    )
}
