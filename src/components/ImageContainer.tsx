'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

/**
 * Props interface for the ImageContainer component
 * @property {string} image - The URL path to the image to display
 * @property {string} alt - Alt text for accessibility
 * @property {() => void} onImageClick - Callback function triggered when the image is clicked
 */
interface ImageContainerProps {
    image: string
    alt: string
    onImageClick: () => void
}

/**
 * ImageContainer Component
 *
 * A responsive container for displaying images with interactive features:
 * - Hover effects with scaling and brightness adjustment
 * - Interactive tooltip that follows the cursor
 * - Click handler for opening a lightbox or modal
 * - Responsive design with aspect ratio preservation
 * - Theme-aware styling with light/dark mode support
 *
 * @param {ImageContainerProps} props - Component properties
 * @returns {JSX.Element} The rendered image container
 */
export function ImageContainer({
    image,
    alt,
    onImageClick,
}: ImageContainerProps) {
    // State for tracking hover status and tooltip positioning
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    /**
     * Updates the tooltip position based on mouse movement
     * Calculates relative position within the container
     *
     * @param {React.MouseEvent<HTMLDivElement>} e - Mouse event
     */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] max-w-[1380px] max-h-[860px] mx-auto group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onImageClick}
            style={{ cursor: 'pointer' }}
        >
            {/* Container with border and shadow for visual depth */}
            <div className="absolute inset-0 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-200">
                {/* Radial gradient background for visual interest */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 to-transparent dark:from-blue-900/50" />

                {/* Image wrapper with hover animation */}
                <motion.div
                    className="relative w-auto h-auto"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* The actual image with hover effect */}
                    <img
                        src={image}
                        alt={alt}
                        className="w-full h-full object-cover transition-[filter] duration-200"
                        style={{
                            filter: isHovered ? 'brightness(0.7)' : 'none',
                        }}
                    />
                </motion.div>
            </div>

            {/* Interactive tooltip that follows the cursor */}
            <AnimatePresence>
                {isHovered && (
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
                        {/* Tooltip content with icon and text */}
                        <div className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono flex items-center gap-2">
                            <MagnifyingGlassIcon className="w-4 h-4 flex-shrink-0" />
                            <span>Zoom in</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
