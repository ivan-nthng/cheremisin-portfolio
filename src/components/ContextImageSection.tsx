import { useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Lightbox } from './Lightbox'

interface ContextImageSectionProps {
    lightImage?: string
    darkImage?: string
    lightVideo?: string
    darkVideo?: string
    header: string
    description: string
    alt: string
}

export function ContextImageSection({
    lightImage,
    darkImage,
    lightVideo,
    darkVideo,
    header,
    description,
    alt,
}: ContextImageSectionProps) {
    const { theme } = useTheme()
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const isVideo = Boolean(lightVideo || darkVideo)
    const source =
        theme === 'dark'
            ? darkVideo || darkImage || ''
            : lightVideo || lightImage || ''

    return (
        <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Media Column (8/12 width on large screens, full width on small) */}
                <div className="lg:col-span-9">
                    <div
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm transition-all duration-300"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => !isVideo && setIsLightboxOpen(true)}
                        style={{ cursor: isVideo ? 'default' : 'pointer' }}
                    >
                        <motion.div
                            whileHover={{ scale: isVideo ? 1 : 1.02 }}
                            whileTap={{ scale: isVideo ? 1 : 0.98 }}
                            className="relative h-full w-full"
                        >
                            {isVideo ? (
                                <video
                                    src={source}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={source}
                                    alt={alt}
                                    fill
                                    className="object-cover transition-all duration-300"
                                    style={{
                                        filter: isHovered
                                            ? 'brightness(0.9)'
                                            : 'none',
                                    }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                    priority
                                />
                            )}
                        </motion.div>

                        {/* Zoom Badge */}
                        <AnimatePresence>
                            {isHovered && !isVideo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeOut',
                                    }}
                                    className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm"
                                >
                                    Move Closer
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Content Column (4/12 width on large screens, full width on small) */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                    <h3 className="mb-4 text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100">
                        {header}
                    </h3>
                    <p className="text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/80">
                        {description}
                    </p>
                </div>
            </div>

            {/* Lightbox */}
            {!isVideo && (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                    image={source}
                    alt={alt}
                />
            )}
        </div>
    )
}
