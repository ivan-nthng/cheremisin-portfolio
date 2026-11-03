'use client'

import { useState, useEffect } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { Lightbox } from './Lightbox'
import { useTheme } from 'next-themes'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'
import { DossierMediaViewport } from '@/components/ascii/Dossier'

interface GalleryItemProps {
    imageLight?: string
    imageDark?: string
    videoLight?: string
    videoDark?: string
    alt: string
    title: string
    description: string
    isReversed?: boolean
    neutral?: boolean
    smallImage?: boolean
    noDecor?: boolean
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
    isLightboxOpen?: boolean
    onOpenLightbox?: () => void
    onCloseLightbox?: () => void
    isVisible?: boolean
}

export function GalleryItem({
    imageLight,
    imageDark,
    videoLight,
    videoDark,
    alt,
    title,
    description,
    isReversed = false,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    isLightboxOpen = false,
    onOpenLightbox,
    onCloseLightbox,
}: GalleryItemProps) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [mediaError, setMediaError] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const effectiveTheme = mounted ? resolvedTheme || theme : 'light'
    const currentImage = effectiveTheme === 'dark' ? imageDark : imageLight
    const currentVideo = effectiveTheme === 'dark' ? videoDark : videoLight

    useEffect(() => {
        setMediaError(false)
    }, [currentImage, currentVideo])


    return (
        <>
            <RepeatReveal
                className={`grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_var(--case-media-aside)] ${
                    isReversed ? 'lg:[&>*:first-child]:order-last' : ''
                }`}
            >
                <DossierMediaViewport
                    label={currentVideo ? 'vid' : 'img'}
                    title={title}
                    note={currentVideo ? 'autoplay loop' : 'click to inspect'}
                >
                    <button
                        type="button"
                        aria-label={`Open ${title} in lightbox`}
                        className="relative block w-full text-left"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => onOpenLightbox?.()}
                    >
                        <div className="relative aspect-[16/9] border-[length:var(--stroke-thin)] border-border bg-background">
                            {currentVideo && !mediaError ? (
                                <video
                                    key={currentVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="h-full w-full object-contain"
                                    onError={() => setMediaError(true)}
                                >
                                    <source src={currentVideo} type="video/mp4" />
                                </video>
                            ) : currentImage && !mediaError ? (
                                <img
                                    key={currentImage}
                                    src={currentImage}
                                    alt={alt}
                                    className="h-full w-full object-contain p-4"
                                    onError={() => setMediaError(true)}
                                />
                            ) : (
                                <AsciiAssetFallback
                                    title="Preview unavailable"
                                    label={title}
                                    kind={currentVideo ? 'vid' : 'img'}
                                    compact
                                    className="min-h-0"
                                />
                            )}
                        </div>
                        {!currentVideo && isHovered ? (
                            <div className="absolute bottom-3 left-3 border-[length:var(--stroke-thin)] border-border-strong bg-foreground px-3 py-1 text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-media-note)] text-background">
                                Open viewport
                            </div>
                        ) : null}
                    </button>
                </DossierMediaViewport>

                <div
                    className="border-[length:var(--stroke-thin)] border-border px-4 py-4"
                >
                    <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                        Note
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">
                        {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                        {description}
                    </p>
                </div>
            </RepeatReveal>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => onCloseLightbox?.()}
                image={currentImage}
                video={currentVideo}
                alt={title}
                caption={description}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onNext={hasNext && onNext ? () => onNext() : undefined}
                onPrevious={
                    hasPrevious && onPrevious ? () => onPrevious() : undefined
                }
            />
        </>
    )
}
