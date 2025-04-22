'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import CustomCursor from './CustomCursor'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

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

    const currentImage = theme === 'dark' && darkImage ? darkImage : image

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

    return (
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 cursor-none relative bg-blue-100/80 dark:bg-blue-900/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-blue-200/80 dark:hover:bg-blue-800/80 transition-colors duration-300"
        >
            <CustomCursor
                isVisible={isHovered}
                position={cursorPosition}
                text={isCompanyHovered ? 'Website' : 'Read More'}
                isHighlighted={isCompanyHovered}
            />

            <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-100">
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
                </div>
                <div className="mt-1 sm:mt-2 space-y-2 sm:space-y-3">
                    <p className="text-sm font-mono text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
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

            <motion.div
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
                className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden"
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
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
