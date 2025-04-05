'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface StatBlock {
    value: string
    label: string
}

interface ProblemSectionProps {
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
    const [isAnimationComplete, setIsAnimationComplete] = React.useState(false)

    // Split value into main number and percentage if exists
    const [mainValue, percentage] = value.split(' ')

    // Extract numeric parts before and after decimal point if exists
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
        if (isVisible) {
            const duration = 1500
            const startTime = Date.now()
            const endValue = numericValue

            const updateCounter = () => {
                const currentTime = Date.now()
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1,
                )

                const easeOutQuart = 1 - Math.pow(1 - progress, 4)
                const currentValue = endValue * easeOutQuart

                // Always show integers during animation
                setNumber(Math.floor(currentValue))

                if (progress < 1) {
                    requestAnimationFrame(updateCounter)
                } else {
                    setIsAnimationComplete(true)
                }
            }

            requestAnimationFrame(updateCounter)
        }
    }, [isVisible, numericValue])

    // Format the number with the same prefix/suffix as the original value
    const prefix = mainValue.match(/^[^0-9]*/)?.[0] || ''
    const suffix = mainValue.match(/[^0-9]*$/)?.[0] || ''

    // Construct the formatted value
    const formattedValue = isAnimationComplete
        ? afterDecimal
            ? `${prefix}${number}.${afterDecimal}`
            : `${prefix}${number}${suffix}`
        : `${prefix}${number}${suffix}`

    return (
        <span ref={ref} className="font-poppins font-bold tracking-tight">
            {isVisible ? (
                <>
                    {formattedValue}
                    {percentage && (
                        <span className="text-[0.5em] opacity-60 ml-1">
                            {percentage}
                        </span>
                    )}
                </>
            ) : (
                value
            )}
        </span>
    )
}

export default function ProblemSection({
    stats,
    description,
}: ProblemSectionProps) {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const { theme } = useTheme()

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
        <section className="w-full mb-16 sm:mb-24">
            <MotionDiv
                ref={ref}
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
                className={`backdrop-blur-sm rounded-[32px] overflow-hidden ${
                    theme === 'dark'
                        ? 'bg-blue-50/80 text-blue-900'
                        : 'bg-blue-950 text-blue-100'
                }`}
            >
                <div className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-12">
                    {/* Header */}
                    <MotionH2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold font-poppins"
                    >
                        Problem
                    </MotionH2>

                    {/* Stats Grid */}
                    <MotionDiv
                        variants={container}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12"
                    >
                        {stats.map((stat, index) => (
                            <MotionDiv
                                key={index}
                                variants={item}
                                className="flex flex-col items-center text-center space-y-2"
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
                                    <AnimatedCounter value={stat.value} />
                                </h1>
                                <div
                                    className={`text-xs sm:text-sm max-w-[200px] font-mono ${
                                        theme === 'dark'
                                            ? 'text-blue-800/80'
                                            : 'text-blue-200/80'
                                    }`}
                                >
                                    {stat.label}
                                </div>
                            </MotionDiv>
                        ))}
                    </MotionDiv>

                    {/* Description */}
                    <MotionDiv
                        variants={item}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs sm:text-sm leading-relaxed ${
                            theme === 'dark'
                                ? 'text-blue-800/80'
                                : 'text-blue-200/80'
                        }`}
                    >
                        <div>
                            The company was operating in an extremely
                            competitive market, where both drivers and
                            passengers could easily switch to another platform.
                            Since the number of drivers in the city was limited,
                            losing them meant losing real revenue - and this
                            often happened due to delayed or missing support
                            responses.
                        </div>
                        <div>
                            The support team was simply overwhelmed. There were
                            only two options: scale the team massively - or
                            rethink the entire system. To meet peak volume, the
                            company would have needed nearly 200 operators - 4x
                            the existing team.
                        </div>
                    </MotionDiv>
                </div>
            </MotionDiv>
        </section>
    )
}
