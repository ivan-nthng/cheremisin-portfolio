'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

interface WideProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    darkImage?: string
    link: string
    companyName?: string
    companyUrl?: string
}

export default function WideProjectCard({
    title,
    description,
    tags,
    image,
    darkImage,
    link,
    companyName,
    companyUrl,
}: WideProjectCardProps) {
    const router = useRouter()
    const { theme } = useTheme()
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isImageHovered, setIsImageHovered] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })
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
            { threshold: 0.08 },
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

    const handleCompanyMouseMove = (e: React.MouseEvent) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setCompanyTooltipPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
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
        // =============================
        // Root Card Container
        // =============================
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className="flex flex-col md:flex-row w-full h-full cursor-none relative bg-blue-100/80 dark:bg-blue-900/80 rounded-2xl overflow-hidden transition-colors duration-300"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
        >
            {/* =============================
                Left: Text Content Section
            ============================= */}
            <div className="flex-1 flex flex-col justify-top p-4 sm:p-6 md:p-6 lg:p-8">
                {/* Custom Cursor */}
                <CustomCursor
                    isVisible={isHovered}
                    position={cursorPosition}
                    text={isCompanyHovered ? 'Website' : 'Read More'}
                    isHighlighted={isCompanyHovered}
                />
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>
                {/* Company Link */}
                {companyName && (
                    <div className="relative mt-1">
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
                {/* Description */}
                <p className="mt-2 text-sm sm:text-md text-primary-600 dark:text-primary-300">
                    {description}
                </p>
                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-sm bg-blue-200/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            {/* =============================
                Right: Image Section
            ============================= */}
            <motion.div
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
                className="relative w-full md:w-1/2 flex items-stretch justify-stretch bg-transparent py-2"
                style={{ minHeight: 0 }}
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                {/* Project Image */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ padding: '4%', minHeight: 0, minWidth: 0 }}
                    initial="hidden"
                    animate={
                        isVisible && !isImageHovered ? 'visible' : 'hidden'
                    }
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <Image
                        src={currentImage}
                        alt={title}
                        fill
                        className="object-contain rounded-xl w-full h-full"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
