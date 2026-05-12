'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Lightbox } from './Lightbox'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface ContextImageSectionProps {
    lightImage?: string
    darkImage?: string
    lightVideo?: string
    darkVideo?: string
    header: string
    description: string
    alt: string
}

export function ContextImageSection({
    lightImage,
    darkImage,
    lightVideo,
    darkVideo,
    header,
    description,
    alt,
}: ContextImageSectionProps) {
    const { theme, resolvedTheme } = useTheme()
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [mediaError, setMediaError] = useState(false)

    const isVideo = Boolean(lightVideo || darkVideo)
    const effectiveTheme = mounted ? resolvedTheme || theme : 'light'
    const source =
        effectiveTheme === 'dark'
            ? darkVideo || darkImage || ''
            : lightVideo || lightImage || ''

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setMediaError(false)
    }, [source])

    return (
        <section className="py-12 sm:py-16">
            <DossierFrame>
                <DossierBar label="Section" index="06" state={header} />
                <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <DossierMediaViewport
                        label={isVideo ? 'vid 01' : 'img 01'}
                        title={header}
                        note={isVideo ? 'autoplay loop' : 'click to inspect'}
                    >
                        <div
                            className="relative aspect-[4/3] overflow-hidden border border-border bg-background"
                            onClick={() =>
                                !isVideo && source && !mediaError
                                    ? setIsLightboxOpen(true)
                                    : undefined
                            }
                            style={{ cursor: isVideo ? 'default' : 'pointer' }}
                        >
                            {!source || mediaError ? (
                                <AsciiAssetFallback
                                    title="Preview unavailable"
                                    label={header}
                                    kind={isVideo ? 'vid' : 'img'}
                                    compact
                                    className="min-h-0"
                                />
                            ) : isVideo ? (
                                <video
                                    src={source}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="h-full w-full object-contain"
                                    onError={() => setMediaError(true)}
                                />
                            ) : (
                                <Image
                                    src={source}
                                    alt={alt}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    priority
                                    onError={() => setMediaError(true)}
                                />
                            )}
                        </div>
                    </DossierMediaViewport>

                    <div className="border border-border px-4 py-4">
                        <DossierSectionHeading
                            label="Context / note"
                            title={header}
                            description={description}
                        />
                    </div>
                </div>
            </DossierFrame>

            {!isVideo && source && !mediaError ? (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                    image={source}
                    alt={alt}
                />
            ) : null}
        </section>
    )
}
