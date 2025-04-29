'use client'

// ===================================
// Imports and Dependencies
// ===================================
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

// ===================================
// Types and Interfaces
// ===================================
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
    noimg?: boolean
}

// ===================================
// Main Component
// ===================================
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
    noimg = false,
}: ProjectCardProps) {
    // ===================================
    // Hooks and State Management
    // ===================================
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

    // ===================================
    // Intersection Observer Setup
    // ===================================
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

    // ===================================
    // Event Handlers
    // ===================================
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

    // ===================================
    // Animation Variants
    // ===================================
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

    // ===================================
    // Component Render
    // ===================================
    return (
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className={`flex flex-col gap-4 cursor-none relative ${
                noimg ? 'p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
        >
            {/* Custom Cursor */}
            <CustomCursor
                isVisible={isHovered}
                position={cursorPosition}
                text={isCompanyHovered ? 'Website' : 'Read More'}
                isHighlighted={isCompanyHovered}
            />

            {/* Project Image Section */}
            {!noimg && (
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
                        style={{
                            paddingTop: '4%',
                            paddingRight: '4%',
                            paddingBottom: '4%',
                            paddingLeft: '4%',
                        }}
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
            )}

            {/* Project Content Section */}
            <div className="flex-1">
                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>

                {/* Company Link */}
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

                {/* Project Description and Tags */}
                <div className="mt-2 sm:mt-3 space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-md text-primary-600 dark:text-primary-300">
                        {description}
                    </p>
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                onMouseEnter={(e) => {
                                    setIsTooltipVisible(true)
                                    handleTooltipMouseMove(e)
                                }}
                                onMouseLeave={() => {
                                    setIsTooltipVisible(false)
                                }}
                                onMouseMove={handleTooltipMouseMove}
                                className="px-2 py-1 text-sm bg-blue-100/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                            >
                                {/* Tag Usage Indicator */}
                                {tagCounts && tagCounts.get(tag)! > 1 && (
                                    <Star
                                        className="w-3 h-3"
                                        style={{
                                            opacity:
                                                tagCounts.get(tag)! >= 5
                                                    ? 1
                                                    : tagCounts.get(tag)! === 4
                                                    ? 0.8
                                                    : tagCounts.get(tag)! === 3
                                                    ? 0.6
                                                    : tagCounts.get(tag)! === 2
                                                    ? 0.4
                                                    : 0,
                                        }}
                                    />
                                )}
                                {tag}
                            </span>
                        ))}

                        {/* Tag Usage Tooltip */}
                        <AnimatePresence>
                            {isTooltipVisible && (
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
                                        Used in multiple projects
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
