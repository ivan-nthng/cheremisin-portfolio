'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CustomCursor from './CustomCursor'

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    link: string
}

export default function ProjectCard({
    title,
    description,
    tags,
    image,
    link,
}: ProjectCardProps) {
    const router = useRouter()
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isImageHovered, setIsImageHovered] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })

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
                            src={image}
                            alt={title}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </motion.div>
            </motion.div>

            <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>
                <p className="text-primary-600 dark:text-primary-300">
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
        </motion.div>
    )
}
