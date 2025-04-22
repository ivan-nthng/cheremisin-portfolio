'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    link: string
    darkImage?: string
    companyName?: string
    companyUrl?: string
    tagCounts?: Map<string, number>
}

export default function ProjectCard({
    title,
    description,
    tags,
    image,
    darkImage,
    link,
    companyName,
    companyUrl,
    tagCounts,
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
    const [isCompanyHovered, setIsCompanyHovered] = React.useState(false)
    const [companyTooltipPosition, setCompanyTooltipPosition] = React.useState({
        x: 0,
        y: 0,
    })

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

    const handleCompanyMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCompanyTooltipPosition({
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
            <CustomCursor
                isVisible={isHovered}
                position={cursorPosition}
                text={isCompanyHovered ? 'Website' : 'Read More'}
                isHighlighted={isCompanyHovered}
            />

            <motion.div
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-blue-100/80 dark:bg-blue-900/80 transition-colors duration-300"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ padding: '4%' }}
                    initial="hidden"
                    animate={
                        isVisible && !isImageHovered ? 'visible' : 'hidden'
                    }
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={currentImage}
                            alt={title}
                            width={800}
                            height={450}
                            className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl"
                            priority
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
                            href={companyUrl || link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => {
                                setIsCompanyHovered(true)
                                handleCompanyMouseMove(e)
                            }}
                            onMouseLeave={() => {
                                setIsCompanyHovered(false)
                            }}
                            onMouseMove={handleCompanyMouseMove}
                            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors cursor-pointer"
                        >
                            {companyName}
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
                <div className="mt-2 sm:mt-3 space-y-3 sm:space-y-4">
                    <p className="text-md sm:text-md text-primary-600 dark:text-primary-300">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-sm  bg-blue-100/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                            >
                                {tagCounts?.get(tag) &&
                                    tagCounts.get(tag)! > 1 && (
                                        <Star className="w-3 h-3 opacity-50" />
                                    )}
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
