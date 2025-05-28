'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'

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

const MotionDiv = motion.div
const MotionH2 = motion.h2

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
    title = 'Problem',
    description = '',
    image,
    imageDark,
    stats = [],
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
            <motion.div
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
                    <motion.h2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold font-poppins"
                    >
                        {title}
                    </motion.h2>

                    {/* Image */}
                    {image && (
                        <motion.div variants={item} className="w-full">
                            <Image
                                src={
                                    theme === 'dark' && imageDark
                                        ? imageDark
                                        : image
                                }
                                alt={title}
                                width={1200}
                                height={675}
                                className="w-full h-auto rounded-lg"
                            />
                        </motion.div>
                    )}

                    {/* Stats Grid */}
                    {stats.length > 0 && (
                        <motion.div
                            variants={container}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className="flex flex-col items-center text-center space-y-2 w-full"
                                >
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none w-full">
                                        <AnimatedCounter value={stat.value} />
                                    </h1>
                                    <div
                                        className={`text-xs sm:text-sm font-mono w-full ${
                                            theme === 'dark'
                                                ? 'text-blue-800/80'
                                                : 'text-blue-200/80'
                                        }`}
                                    >
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Description */}
                    {description && (
                        <motion.div
                            variants={item}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs sm:text-sm leading-relaxed ${
                                theme === 'dark'
                                    ? 'text-blue-800/80'
                                    : 'text-blue-200/80'
                            }`}
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
                                <div>{description}</div>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </section>
    )
}
