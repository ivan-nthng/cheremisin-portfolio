'use client'

import React from 'react'
import { motion } from 'framer-motion'
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

function AnimatedCounter({ value }: { value: string }) {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [number, setNumber] = React.useState(0)
    const [isAnimationComplete, setIsAnimationComplete] = React.useState(false)
    const [mainValue, percentage] = value.split(' ')
    const [beforeDecimal, afterDecimal] = mainValue.split('.')
    const numericValue = parseInt(beforeDecimal.replace(/[^0-9]/g, ''))

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    React.useEffect(() => {
        if (!isVisible) return

        const duration = 1200
        const startTime = Date.now()

        const updateCounter = () => {
            const currentTime = Date.now()
            const progress = Math.min((currentTime - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)

            setNumber(Math.floor(numericValue * eased))

            if (progress < 1) {
                requestAnimationFrame(updateCounter)
            } else {
                setIsAnimationComplete(true)
            }
        }

        requestAnimationFrame(updateCounter)
    }, [isVisible, numericValue])

    const prefix = mainValue.match(/^[^0-9]*/)?.[0] || ''
    const suffix = mainValue.match(/[^0-9]*$/)?.[0] || ''
    const formattedValue = isAnimationComplete
        ? afterDecimal
            ? `${prefix}${number}.${afterDecimal}`
            : `${prefix}${number}${suffix}`
        : `${prefix}${number}${suffix}`

    return (
        <span ref={ref} className="font-bold tracking-tight">
            {isVisible ? (
                <>
                    {formattedValue}
                    {percentage ? (
                        <span className="ml-1 text-[0.5em] opacity-60">
                            {percentage}
                        </span>
                    ) : null}
                </>
            ) : (
                value
            )}
        </span>
    )
}

export default function ProblemSection({
    title = 'Problem',
    description = '',
    image,
    imageDark,
    stats = [],
}: ProblemSectionProps) {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const { theme, resolvedTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const effectiveTheme = mounted ? resolvedTheme || theme : 'light'
    const currentImage =
        effectiveTheme === 'dark' && imageDark ? imageDark : image

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.25,
                rootMargin: '-50px 0px',
            },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    const container = {
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.24,
                ease: 'easeOut',
                staggerChildren: 0.08,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    }

    return (
        <section className="mb-16 w-full sm:mb-24">
            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
            >
                <DossierFrame>
                    <DossierBar label="Section" index="03" state={title} />
                    <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                        <motion.div variants={item}>
                            <DossierSectionHeading
                                label={`Story / ${title.toLowerCase()}`}
                                title={title}
                            />
                        </motion.div>

                        {image ? (
                            <motion.div variants={item}>
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
                                        className="h-auto w-full border border-border bg-background object-contain"
                                    />
                                </DossierMediaViewport>
                            </motion.div>
                        ) : null}

                        {stats.length > 0 ? (
                            <motion.div variants={item}>
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
                            </motion.div>
                        ) : null}

                        {description ? (
                            <motion.div
                                variants={item}
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
                            </motion.div>
                        ) : null}
                    </div>
                </DossierFrame>
            </motion.div>
        </section>
    )
}
