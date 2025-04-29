'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { ImageContainer } from './ImageContainer'
import { Lightbox } from './Lightbox'

/**
 * Props interface for the DemoSection component
 * @property {string} title - The title of the demo section
 * @property {string} description - A detailed description of the demo
 * @property {string} [image] - Optional path to the demo image (without extension)
 * @property {string} [video] - Optional path to the demo video
 * @property {string} [caption] - Optional caption for the image in lightbox view
 */
interface DemoSectionProps {
    title: string
    description: string
    image?: string
    video?: string
    caption?: string
}

/**
 * Animation configuration for the move-in effect
 * Elements start slightly offset and fade in when they enter the viewport
 */
const moveInAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
}

/**
 * DemoSection Component
 *
 * A responsive section that displays a project demo with either an image or video.
 * Features include:
 * - Theme-aware image loading (light/dark mode support)
 * - Lightbox functionality for image viewing
 * - Animated entrance effects
 * - Responsive layout with gradient background
 *
 * @param {DemoSectionProps} props - Component properties
 * @returns {JSX.Element | null} The rendered demo section or null during SSR
 */
export default function DemoSection({
    title,
    description,
    image,
    video,
    caption,
}: DemoSectionProps) {
    // State for lightbox visibility and component mounting
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, resolvedTheme } = useTheme()

    // Handle mounting state to prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Determine the effective theme and construct the appropriate image path
    const effectiveTheme = resolvedTheme || theme
    const imagePath = image
        ? `/${image}${effectiveTheme === 'dark' ? '-dark' : '-light'}.png`
        : undefined

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null
    }

    // Animation configuration for motion components
    const motionProps = {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: moveInAnimation,
    }

    return (
        <section className="relative py-24 sm:py-32">
            {/* Radial gradient background for visual depth */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 to-transparent dark:from-blue-950/50" />

            <div className="relative container mx-auto px-0">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header section with animated title and description */}
                    <div className="text-center space-y-4">
                        <motion.h2
                            {...motionProps}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-3xl sm:text-4xl font-bold font-poppins text-blue-900 dark:text-blue-100"
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            {...motionProps}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-lg text-blue-800/80 dark:text-blue-200/80 max-w-3xl mx-auto"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {/* Media container with conditional rendering for video or image */}
                    <motion.div
                        {...motionProps}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {video ? (
                            // Video player with autoplay and loop
                            <div className="relative aspect-video w-full h- overflow-hidden rounded-2xl bg-blue-100 dark:bg-blue-900/50">
                                <video
                                    src={video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    onClick={() => setIsLightboxOpen(true)}
                                />
                            </div>
                        ) : imagePath ? (
                            // Image container with lightbox functionality
                            <ImageContainer
                                key={imagePath}
                                image={imagePath}
                                alt={title}
                                onImageClick={() => setIsLightboxOpen(true)}
                            />
                        ) : null}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox modal for expanded image view with caption */}
            {imagePath && (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                    image={imagePath}
                    alt={title}
                    caption={caption}
                />
            )}
        </section>
    )
}
