'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TableRowProps {
    scenario: string
    frequency: string
}

const tableData: TableRowProps[] = [
    {
        scenario: 'Passenger disputes ride cost',
        frequency: '35%',
    },
    {
        scenario: 'Driver requests compensation for canceled trips',
        frequency: '25%',
    },
    {
        scenario: 'Issues with payment methods',
        frequency: '20%',
    },
    {
        scenario: 'Driver inquiries about Guaranteed Income',
        frequency: '10%',
    },
]

interface OptimizationSectionProps {
    className?: string
}

export default function OptimizationSection({
    className,
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
                        Support Request Analysis
                    </h2>
                    <p className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80">
                        The top 4 categories of scenarios account for 90% of all
                        requests. By reducing the processing time of these
                        requests, we can handle all incoming requests without
                        expanding the team.
                    </p>
                </motion.div>

                {/* Right Column - Table */}
                <motion.div
                    variants={item}
                    className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-7 flex items-center"
                >
                    <div className="w-full overflow-hidden rounded-2xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-sm">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-100/50 dark:bg-blue-900/50">
                                    <th className="px-6 py-4 text-left text-sm text-blue-900 dark:text-blue-100">
                                        Scenario
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm text-blue-900 dark:text-blue-100">
                                        Frequency
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={cn(
                                            'transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50',
                                            index !== tableData.length - 1 &&
                                                'border-b border-blue-200/20 dark:border-blue-800/20',
                                        )}
                                    >
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            {row.scenario}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            {row.frequency}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
