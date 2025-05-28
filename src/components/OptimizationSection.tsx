'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizationItem {
    title: string
    description: string
}

interface OptimizationSectionProps {
    className?: string
    items: OptimizationItem[]
}

export default function OptimizationSection({
    className,
    items,
}: OptimizationSectionProps) {
    const [isVisible, setIsVisible] = React.useState(false)
    const sectionRef = React.useRef<HTMLDivElement>(null)

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

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
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
        <section
            className={cn('w-full py-16 sm:py-24', className)}
            ref={sectionRef}
        >
            <motion.div
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8"
            >
                {/* Left Column - Content */}
                <motion.div
                    variants={item}
                    className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-center space-y-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-blue-900 dark:text-blue-100">
                        Optimizations
                    </h2>
                    <p className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80">
                        Key improvements and optimizations made to enhance the
                        user experience and system performance.
                    </p>
                </motion.div>

                {/* Right Column - Items */}
                <motion.div
                    variants={item}
                    className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-7 flex items-center"
                >
                    <div className="w-full overflow-hidden rounded-2xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-sm">
                        <div className="divide-y divide-blue-200/20 dark:divide-blue-800/20">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50"
                                >
                                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
