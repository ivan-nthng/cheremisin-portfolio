'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    DossierBar,
    DossierFrame,
    DossierMetaStrip,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface StatBlock {
    value: string
    label: string
}

interface ProjectOverviewProps {
    stats?: StatBlock[]
    description?: string
    problem?: string
    solution?: string
    impact?: string
}

const MotionDiv = motion.div as React.ComponentType<
    React.HTMLAttributes<HTMLDivElement> & {
        variants?: any
        initial?: any
        animate?: any
        transition?: any
        style?: any
        ref?: any
    }
>

const MotionH2 = motion.h2 as React.ComponentType<
    React.HTMLAttributes<HTMLHeadingElement> & {
        variants?: any
        initial?: any
        animate?: any
        transition?: any
    }
>

function AnimatedCounter({ value }: { value: string }) {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [number, setNumber] = React.useState(0)
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

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
        if (isVisible) {
            const duration = 1500 // Animation duration in milliseconds
            const startTime = Date.now()
            const endValue = numericValue

            const updateCounter = () => {
                const currentTime = Date.now()
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1,
                )

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4)
                setNumber(Math.floor(endValue * easeOutQuart))

                if (progress < 1) {
                    requestAnimationFrame(updateCounter)
                }
            }

            requestAnimationFrame(updateCounter)
        }
    }, [isVisible, numericValue])

    // Format the number with the same prefix/suffix as the original value
    const prefix = value.match(/^[^0-9]*/)?.[0] || ''
    const suffix = value.match(/[^0-9]*$/)?.[0] || ''

    return (
        <span ref={ref} className="font-bold tracking-tight">
            {isVisible ? `${prefix}${number}${suffix}` : value}
        </span>
    )
}

export default function ProjectOverview({
    stats,
    description,
    problem,
    solution,
    impact,
}: ProjectOverviewProps) {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)

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
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 40,
                damping: 20,
                mass: 1,
                staggerChildren: 0.15,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
            },
        },
    }

    return (
        <section className="w-full">
            <MotionDiv
                ref={ref}
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
            >
                <DossierFrame>
                    <DossierBar label="Section" index="02" state="Overview" />
                    <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                        <MotionDiv variants={item}>
                            <DossierSectionHeading
                                label="Story / overview"
                                title="Overview"
                                description={description}
                            />
                        </MotionDiv>

                        {stats?.length ? (
                            <MotionDiv variants={container}>
                                <DossierMetaStrip
                                    items={stats.map((stat) => ({
                                        label: stat.label,
                                        value: (
                                            <span className="text-3xl font-bold leading-none text-foreground sm:text-4xl">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                />
                                            </span>
                                        ),
                                    }))}
                                />
                            </MotionDiv>
                        ) : null}
                    </div>
                </DossierFrame>
            </MotionDiv>
        </section>
    )
}
