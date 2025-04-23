'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Lightbox } from './Lightbox'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface GalleryItemProps {
    imageLight?: string
    imageDark?: string
    videoLight?: string
    videoDark?: string
    alt: string
    title: string
    description: string
    isReversed?: boolean
    neutral?: boolean
    smallImage?: boolean
    noDecor?: boolean
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
    isLightboxOpen?: boolean
    onOpenLightbox?: () => void
    onCloseLightbox?: () => void
    isVisible?: boolean
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
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

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20,
        },
    },
}

export function GalleryItem({
    imageLight,
    imageDark,
    videoLight,
    videoDark,
    alt,
    title,
    description,
    isReversed = false,
    neutral = false,
    smallImage = false,
    noDecor = false,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    isLightboxOpen = false,
    onOpenLightbox,
    onCloseLightbox,
    isVisible = false,
}: GalleryItemProps) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle mounting state
    useEffect(() => {
        setMounted(true)
    }, [])

    // Use resolvedTheme to handle system preference
    const effectiveTheme = resolvedTheme || theme
    const currentImage = effectiveTheme === 'dark' ? imageDark : imageLight
    const currentVideo = effectiveTheme === 'dark' ? videoDark : videoLight

    const motionProps = {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 },
    }

    // Handle click to open lightbox
    const handleClick = () => {
        if (onOpenLightbox) {
            onOpenLightbox()
        }
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <>
            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start ${
                    isReversed ? 'md:[&>*:first-child]:order-last' : ''
                }`}
            >
                {/* Media Container */}
                <motion.div
                    variants={itemVariants}
                    className={cn(
                        'md:col-span-9 relative w-full rounded-2xl overflow-hidden p-6',
                        neutral
                            ? 'bg-blue-50/50 dark:bg-blue-950/50'
                            : 'bg-gradient-to-br from-orange-400/80 via-pink-500/50 to-blue-500/80 dark:from-blue-900/80 dark:via-purple-900/50 dark:to-blue-800/80',
                        smallImage ? 'max-w-60% mx-auto' : '',
                    )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="relative w-full">
                        <motion.div
                            className={cn(
                                'relative w-full flex items-center justify-center',
                                smallImage ? 'aspect-[16/9]' : 'aspect-[16/9]',
                            )}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentVideo ? (
                                <video
                                    key={currentVideo} // Force remount when video source changes
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className={cn(
                                        'w-auto h-auto object-contain transition-all duration-300',
                                        !noDecor && 'rounded-lg shadow-lg',
                                        smallImage
                                            ? 'max-h-[50%]'
                                            : 'max-h-[90%]',
                                    )}
                                    style={{
                                        filter: isHovered
                                            ? 'brightness(0.9)'
                                            : 'none',
                                    }}
                                >
                                    <source
                                        src={currentVideo}
                                        type="video/quicktime"
                                    />
                                    <source
                                        src={currentVideo}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                currentImage && (
                                    <img
                                        key={currentImage} // Force remount when image source changes
                                        src={currentImage}
                                        alt={alt}
                                        className={cn(
                                            'w-auto h-auto object-contain transition-all duration-300',
                                            !noDecor && 'rounded-xl shadow-lg',
                                            smallImage
                                                ? 'max-h-[60%]'
                                                : 'h-full',
                                        )}
                                        style={{
                                            filter: isHovered
                                                ? 'brightness(0.9)'
                                                : 'none',
                                        }}
                                    />
                                )
                            )}
                        </motion.div>

                        {/* Move Closer Badge */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeOut',
                                    }}
                                    className="absolute bottom-1 left-1 bg-blue-950/50 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm"
                                >
                                    Move Closer
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-3 flex flex-col gap-3 md:pt-6 sticky top-14"
                >
                    <motion.h3
                        variants={itemVariants}
                        className="text-xl font-semibold font-poppins text-blue-900 dark:text-blue-100"
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        variants={itemVariants}
                        className="text-sm font-mono text-blue-800/80 dark:text-blue-200/80 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Lightbox */}
            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => onCloseLightbox?.()}
                image={currentImage}
                video={currentVideo}
                alt={title}
                caption={description}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onNext={hasNext && onNext ? () => onNext() : undefined}
                onPrevious={
                    hasPrevious && onPrevious ? () => onPrevious() : undefined
                }
            />
        </>
    )
}
