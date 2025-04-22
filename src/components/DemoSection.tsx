'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { ImageContainer } from './ImageContainer'
import { Lightbox } from './Lightbox'

interface DemoSectionProps {
    title: string
    description: string
    image?: string
    video?: string
    caption?: string
}

const moveInAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
}

export default function DemoSection({
    title,
    description,
    image,
    video,
    caption,
}: DemoSectionProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, resolvedTheme } = useTheme()

    // Handle mounting state
    useEffect(() => {
        setMounted(true)
    }, [])

    // Use resolvedTheme to handle system preference
    const effectiveTheme = resolvedTheme || theme
    const imagePath = image
        ? `/${image}${effectiveTheme === 'dark' ? '-dark' : '-light'}.png`
        : undefined

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null
    }

    const motionProps = {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: moveInAnimation,
    }

    return (
        <section className="relative py-24 sm:py-32">
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 to-transparent dark:from-blue-950/50" />

            <div className="relative container mx-auto px-0">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header and Description */}
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

                    {/* Media Container */}
                    <motion.div
                        {...motionProps}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {video ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-blue-100 dark:bg-blue-900/50">
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

            {/* Lightbox */}
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
