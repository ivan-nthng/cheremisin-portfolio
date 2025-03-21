'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Mail } from 'lucide-react'

export default function NoResultsCard() {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isImageHovered, setIsImageHovered] = React.useState(false)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
    const [isCalendarHovered, setIsCalendarHovered] = React.useState(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.3 },
        )

        if (cardRef.current) {
            observer.observe(cardRef.current)
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current)
            }
        }
    }, [])

    const handleCalendarMouseMove = (
        e: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    }

    const imageVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
        exit: { x: '100%', opacity: 0 },
    }

    return (
        <motion.div ref={cardRef} className="flex flex-col gap-4 relative">
            <motion.div
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-blue-100/80 dark:bg-blue-900/80"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ padding: '6%' }}
                    initial="hidden"
                    animate={
                        isVisible && !isImageHovered ? 'visible' : 'hidden'
                    }
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <div className="text-8xl">😜</div>
                </motion.div>
            </motion.div>

            <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-800 dark:text-primary-100">
                    There is no such project yet
                </h3>
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    <p className="text-base sm:text-lg text-primary-600 dark:text-primary-300">
                        But you can be the first to order it.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Link
                                href="https://calendly.com/your-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setIsCalendarHovered(true)}
                                onMouseLeave={() => setIsCalendarHovered(false)}
                                onMouseMove={handleCalendarMouseMove}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors cursor-pointer"
                            >
                                <Calendar className="w-4 h-4" />
                                Book 15 Minutes Call
                            </Link>
                            <AnimatePresence>
                                {isCalendarHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: tooltipPosition.x + 20,
                                            y: tooltipPosition.y - 20,
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'easeOut',
                                        }}
                                        className="absolute z-[100] pointer-events-none"
                                    >
                                        <div className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono">
                                            Move to Calendly
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <Link
                            href="mailto:ivan.cheremisin@gmail.com"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors cursor-pointer"
                        >
                            <Mail className="w-4 h-4" />
                            Email me
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
