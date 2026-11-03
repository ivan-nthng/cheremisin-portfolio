'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierMetaStrip,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface StatBlock {
    value: string
    label: string
}

interface ProblemSectionProps {
    title?: string
    description?: string
    image?: string
    imageDark?: string
    stats?: StatBlock[]
}

function AnimatedCounter({ value }: { value: string }) { return <span>{value}</span> }

export default function ProblemSection({
    title = 'Problem',
    description = '',
    image,
    imageDark,
    stats = [],
}: ProblemSectionProps) {
    const [mounted, setMounted] = React.useState(false)
    const { theme, resolvedTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const effectiveTheme = mounted ? resolvedTheme || theme : 'light'
    const currentImage =
        effectiveTheme === 'dark' && imageDark ? imageDark : image

    return (
        <section className="mb-16 w-full sm:mb-24">
            <div>
                <DossierFrame>
                    <DossierBar label="Section" index="03" state={title} />
                    <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                        <div>
                            <DossierSectionHeading
                                label={`Story / ${title.toLowerCase()}`}
                                title={title}
                            />
                        </div>

                        {image ? (
                            <div>
                                <DossierMediaViewport
                                    label="img 01"
                                    title={title}
                                    note={
                                        imageDark
                                            ? 'light + dark'
                                            : 'single image'
                                    }
                                >
                                    <Image
                                        src={currentImage as string}
                                        alt={title}
                                        width={1200}
                                        height={675}
                                        className="h-auto w-full border-[length:var(--stroke-thin)] border-border bg-background object-contain"
                                    />
                                </DossierMediaViewport>
                            </div>
                        ) : null}

                        {stats.length > 0 ? (
                            <div>
                                <DossierMetaStrip
                                    items={stats.map((stat) => ({
                                        label: stat.label,
                                        value: (
                                            <span className="text-3xl font-bold text-foreground sm:text-4xl">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                />
                                            </span>
                                        ),
                                    }))}
                                />
                            </div>
                        ) : null}

                        {description ? (
                            <div

                                className="grid gap-6 text-sm leading-7 text-muted md:grid-cols-2"
                            >
                                {description.split('\n').length > 5 ? (
                                    <>
                                        <div>
                                            {description
                                                .split('\n')
                                                .slice(
                                                    0,
                                                    Math.ceil(
                                                        description.split('\n')
                                                            .length / 2,
                                                    ),
                                                )
                                                .join('\n')}
                                        </div>
                                        <div>
                                            {description
                                                .split('\n')
                                                .slice(
                                                    Math.ceil(
                                                        description.split('\n')
                                                            .length / 2,
                                                    ),
                                                )
                                                .join('\n')}
                                        </div>
                                    </>
                                ) : (
                                    <div className="md:max-w-xl">{description}</div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </DossierFrame>
            </div>
        </section>
    )
}
