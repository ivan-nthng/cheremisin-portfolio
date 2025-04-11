'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Lightbox } from './Lightbox'
import { useTheme } from 'next-themes'

interface GalleryItemProps {
    imageLight?: string
    imageDark?: string
    videoLight?: string
    videoDark?: string
    alt: string
    title: string
    description: string
    isReversed?: boolean
}

// Animation variants
const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const moveInAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
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
}: GalleryItemProps) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    // Handle mounting state
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    // Use resolvedTheme to handle system preference
    const effectiveTheme = resolvedTheme || theme
    const currentImage = effectiveTheme === 'dark' ? imageDark : imageLight
    const currentVideo = effectiveTheme === 'dark' ? videoDark : videoLight

    const motionProps = {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 },
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <>
            <div
                ref={containerRef}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start ${
                    isReversed ? 'md:[&>*:first-child]:order-last' : ''
                }`}
            >
                {/* Media Container */}
                <motion.div
                    className="md:col-span-9 relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400/80 via-pink-500/50 to-blue-500/80 dark:from-blue-900/80 dark:via-purple-900/50 dark:to-blue-800/80 p-6"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsLightboxOpen(true)}
                    style={{ cursor: 'pointer' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={moveInAnimation}
                >
                    <motion.div
                        className="relative w-full aspect-[16/9] flex items-center justify-center"
                        {...motionProps}
                    >
                        {currentVideo ? (
                            <video
                                key={currentVideo} // Force remount when video source changes
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-auto h-auto max-h-[90%] object-contain rounded-lg shadow-lg transition-all duration-300"
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
                                <source src={currentVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            currentImage && (
                                <img
                                    key={currentImage} // Force remount when image source changes
                                    src={currentImage}
                                    alt={alt}
                                    className="w-auto h-full object-contain rounded-xl shadow-lg transition-all duration-300"
                                    style={{
                                        filter: isHovered
                                            ? 'brightness(0.9)'
                                            : 'none',
                                    }}
                                />
                            )
                        )}

                        {/* Tooltip */}
                        <AnimatePresence>
                            {isHovered && (currentImage || currentVideo) && (
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
                                    <div className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono flex items-center gap-2">
                                        <MagnifyingGlassIcon className="w-4 h-4 flex-shrink-0" />
                                        <span>Zoom in</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="md:col-span-3 flex flex-col gap-3 md:pt-6 sticky top-14"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={moveInAnimation}
                >
                    <h3 className="text-xl font-semibold font-poppins text-blue-900 dark:text-blue-100">
                        {title}
                    </h3>
                    <p className="text-sm font-mono text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                        {description}
                    </p>
                </motion.div>
            </div>

            {/* Lightbox */}
            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                image={currentImage}
                video={currentVideo}
                alt={alt}
                caption={description}
            />
        </>
    )
}
