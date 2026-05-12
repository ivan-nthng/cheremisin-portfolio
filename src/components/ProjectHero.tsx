'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierMetaStrip,
} from '@/components/ascii/Dossier'

interface ProjectHeroProps {
    title: string
    description: string
    mainImage: string
    mainImageDark?: string
    forwardImage: string
    forwardImageDark?: string
    clientLogo?: {
        href: string
        svg: ReactNode
    }
    clientName?: string
    role?: string
}

function ThemePreview({
    lightSrc,
    darkSrc,
    alt,
    priority = false,
}: {
    lightSrc: string
    darkSrc?: string
    alt: string
    priority?: boolean
}) {
    const [lightError, setLightError] = useState(false)
    const [darkError, setDarkError] = useState(false)

    useEffect(() => {
        setLightError(false)
        setDarkError(false)
    }, [lightSrc, darkSrc])

    const hasLight = Boolean(lightSrc) && !lightError
    const hasDark = Boolean(darkSrc) && !darkError

    if (!hasLight && !hasDark) {
        return (
            <AsciiAssetFallback
                title="Preview unavailable"
                label={alt}
                kind="img"
                compact
            />
        )
    }

    return (
        <div className="relative aspect-[4/3] bg-background">
            {hasLight ? (
                <Image
                    src={lightSrc}
                    alt={alt}
                    fill
                    className={
                        hasDark
                            ? 'object-contain p-3 dark:hidden'
                            : 'object-contain p-3'
                    }
                    priority={priority}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    onError={() => setLightError(true)}
                />
            ) : null}
            {hasDark ? (
                <Image
                    src={darkSrc as string}
                    alt={alt}
                    fill
                    className="hidden object-contain p-3 dark:block"
                    priority={priority}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    onError={() => setDarkError(true)}
                />
            ) : null}
        </div>
    )
}

export default function ProjectHero({
    title,
    description,
    mainImage,
    mainImageDark,
    forwardImage,
    forwardImageDark,
    clientLogo,
    clientName = 'Made for',
    role = 'Lead Product Designer',
}: ProjectHeroProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
        >
            <DossierFrame>
                <DossierBar label="Intro" index="01" state="Project" />
                <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    <div className="px-4 py-6 sm:px-6 sm:py-8">
                        <div className="space-y-6">
                            <div className="terminal-divider">Project</div>
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                                    {title}
                                </h1>
                                <p className="max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
                                    {description}
                                </p>
                            </div>

                            <DossierMetaStrip
                                items={[
                                    { label: 'Role', value: role },
                                    {
                                        label: 'Client',
                                        value: clientLogo ? (
                                            <Link
                                                href={clientLogo.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-3 hover:text-accent"
                                            >
                                                <span>{clientName}</span>
                                                <span className="inline-flex max-h-8 items-center opacity-60 grayscale dark:invert">
                                                    {clientLogo.svg}
                                                </span>
                                            </Link>
                                        ) : (
                                            clientName
                                        ),
                                    },
                                ]}
                                className="lg:grid-cols-2"
                            />
                        </div>
                    </div>

                    <div className="border-t border-dashed border-border pt-4 lg:border-l lg:border-dashed lg:border-t-0 lg:pl-6">
                        <div className="grid gap-4">
                            <DossierMediaViewport
                                label="img 01"
                                title="Main screen"
                                note="preview"
                            >
                                <ThemePreview
                                    lightSrc={mainImage}
                                    darkSrc={mainImageDark}
                                    alt={`${title} primary view`}
                                    priority
                                />
                            </DossierMediaViewport>
                            <DossierMediaViewport
                                label="img 02"
                                title="Second screen"
                                note="preview"
                            >
                                <ThemePreview
                                    lightSrc={forwardImage}
                                    darkSrc={forwardImageDark}
                                    alt={`${title} secondary view`}
                                />
                            </DossierMediaViewport>
                        </div>
                    </div>
                </div>
            </DossierFrame>
        </motion.div>
    )
}
