'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import { useTheme } from 'next-themes'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    link: string
    darkImage?: string
    companyName?: string
}

export default function ProjectCard({
    title,
    description,
    tags,
    image,
    darkImage,
    link,
    companyName,
}: ProjectCardProps) {
    const router = useRouter()
    const { theme } = useTheme()
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isImageHovered, setIsImageHovered] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(false)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })

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

    const handleMouseMove = (e: React.MouseEvent) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setCursorPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleTooltipMouseMove = (e: React.MouseEvent) => {
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

    const currentImage = theme === 'dark' && darkImage ? darkImage : image

    return (
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className="flex flex-col gap-4 cursor-none relative"
        >
            <CustomCursor isVisible={isHovered} position={cursorPosition} />

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
                    <div className="relative w-full h-full">
                        <Image
                            src={currentImage}
                            alt={title}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </motion.div>
            </motion.div>

            <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>
                {companyName && (
                    <div className="relative">
                        <Link
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 cursor-pointer mt-0.5"
                            onMouseEnter={() => {
                                setIsHovered(false)
                                setIsTooltipVisible(true)
                            }}
                            onMouseLeave={() => {
                                setIsHovered(true)
                                setIsTooltipVisible(false)
                            }}
                            onMouseMove={handleTooltipMouseMove}
                        >
                            <span className="text-sm sm:text-base">
                                {companyName}
                            </span>
                            <motion.div
                                whileHover={{ x: 4, y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </Link>
                        <AnimatePresence>
                            {isTooltipVisible && (
                                <div className="absolute z-[100] pointer-events-none">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: tooltipPosition.x + 20,
                                            y: tooltipPosition.y - 20,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'easeOut',
                                        }}
                                        className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono"
                                    >
                                        Website
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    <p className="text-base sm:text-lg text-primary-600 dark:text-primary-300">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-sm bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
