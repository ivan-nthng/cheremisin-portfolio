'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface StatBlock {
    value: string
    label: string
}

interface ProjectOverviewProps {
    stats: StatBlock[]
    description: string
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
        <span ref={ref} className="font-poppins font-bold tracking-tight">
            {isVisible ? `${prefix}${number}${suffix}` : value}
        </span>
    )
}

export default function ProjectOverview({
    stats,
    description,
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

    const container = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 20,
                mass: 1,
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
            },
        },
    }

    return (
        <section className="w-full mb-16 sm:mb-24">
            <MotionDiv
                ref={ref}
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
                className="bg-blue-50/80 dark:bg-blue-950/20 backdrop-blur-sm rounded-[32px] overflow-hidden"
            >
                <div className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-12">
                    {/* Header */}
                    <MotionH2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold font-poppins text-blue-900 dark:text-blue-100"
                    >
                        Overview
                    </MotionH2>

                    {/* Stats Grid */}
                    <MotionDiv
                        variants={container}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
                    >
                        {stats.map((stat, index) => (
                            <MotionDiv
                                key={index}
                                variants={item}
                                className="flex flex-col items-center justify-center text-center space-y-3"
                            >
                                <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-blue-900 dark:text-blue-100">
                                    <AnimatedCounter value={stat.value} />
                                </h1>
                                <div className="text-sm sm:text-base text-blue-800/80 dark:text-blue-200/80 max-w-[200px] font-mono">
                                    {stat.label}
                                </div>
                            </MotionDiv>
                        ))}
                    </MotionDiv>

                    {/* Description */}
                    <MotionDiv
                        variants={item}
                        className="md:w-1/2 text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80 leading-relaxed"
                    >
                        {description}
                    </MotionDiv>
                </div>
            </MotionDiv>
        </section>
    )
}
