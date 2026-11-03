'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'
import { ImageContainer } from './ImageContainer'
import { Lightbox } from './Lightbox'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface DemoSectionProps {
    title: string
    description: string
    image?: string
    video?: string
    lightVideo?: string
    darkVideo?: string
    caption?: string
}


export default function DemoSection({
    title,
    description,
    image,
    video,
    lightVideo,
    darkVideo,
    caption,
}: DemoSectionProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [mediaError, setMediaError] = useState(false)
    const { theme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const effectiveTheme = mounted ? resolvedTheme || theme : 'light'
    const imagePath = image
        ? `/${image}${effectiveTheme === 'dark' ? '-dark' : '-light'}.png`
        : undefined
    const videoPath =
        lightVideo || darkVideo
            ? effectiveTheme === 'dark'
                ? darkVideo || lightVideo
                : lightVideo || darkVideo
            : video

    useEffect(() => {
        setMediaError(false)
    }, [imagePath, videoPath])



    return (
        <section className="py-12 sm:py-16">
            <DossierFrame>
                <DossierBar label="Section" index="04" state="Demo" />
                <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                    <div
                    >
                        <DossierSectionHeading
                            label="Story / demo"
                            title={title}
                            description={description}
                        />
                    </div>

                    <div
                    >
                        <DossierMediaViewport
                            label={videoPath ? 'vid 01' : 'img 01'}
                            title={title}
                            note={videoPath ? 'autoplay loop' : 'open for closer inspection'}
                        >
                            {videoPath && !mediaError ? (
                                <div className="relative aspect-video w-full overflow-hidden border-[length:var(--stroke-thin)] border-border bg-background">
                                    <video
                                        src={videoPath}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                        onClick={() => setIsLightboxOpen(true)}
                                        onError={() => setMediaError(true)}
                                    />
                                </div>
                            ) : imagePath ? (
                                <ImageContainer
                                    key={imagePath}
                                    image={imagePath}
                                    alt={title}
                                    onImageClick={() => setIsLightboxOpen(true)}
                                />
                            ) : (
                                <AsciiAssetFallback
                                    title="Preview unavailable"
                                    label={title}
                                    kind={videoPath ? 'vid' : 'img'}
                                    compact
                                    className="aspect-video min-h-0"
                                />
                            )}
                        </DossierMediaViewport>
                    </div>
                </div>
            </DossierFrame>

            {imagePath ? (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                    image={imagePath}
                    alt={title}
                    caption={caption}
                />
            ) : null}
        </section>
    )
}
