'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import CustomCursor from './CustomCursor'

interface WideProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    darkImage?: string
    link: string
}

export default function WideProjectCard({
    title,
    description,
    tags,
    image,
    darkImage,
    link,
}: WideProjectCardProps) {
    const router = useRouter()
    const { theme } = useTheme()
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })

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
            transition: { duration: 0.8, ease: 'easeOut' },
        },
        hover: {
            x: '100%',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
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
            <CustomCursor isVisible={isHovered} position={cursorPosition} />

            <div className="flex-1 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>
                <p className="text-base sm:text-lg text-primary-600 dark:text-primary-300">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <motion.div
                className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                <motion.div
                    className="relative w-full h-full"
                    variants={imageVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    whileHover="hover"
                >
                    <Image
                        src={currentImage}
                        alt={title}
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
