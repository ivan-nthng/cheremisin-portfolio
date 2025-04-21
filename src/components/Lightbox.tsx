'use client'

import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline'

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    image?: string
    video?: string
    alt: string
    caption?: string
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
}

export function Lightbox({
    isOpen,
    onClose,
    image,
    video,
    alt,
    caption,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
}: LightboxProps) {
    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return

            switch (e.key) {
                case 'Escape':
                    onClose()
                    break
                case 'ArrowRight':
                    if (hasNext && onNext) onNext()
                    break
                case 'ArrowLeft':
                    if (hasPrevious && onPrevious) onPrevious()
                    break
            }
        },
        [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious],
    )

    useEffect(() => {
        if (isOpen) {
            // Hide both body and html scrollbars
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
            // Add padding to prevent layout shift
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth
            document.body.style.paddingRight = `${scrollbarWidth}px`
            // Hide any visible tabs
            const tabsElement = document.querySelector(
                '[role="tablist"]',
            ) as HTMLElement
            if (tabsElement) {
                tabsElement.dataset.visibility =
                    tabsElement.style.visibility || 'visible'
                tabsElement.style.visibility = 'hidden'
            }

            window.addEventListener('keydown', handleKeyDown)
        } else {
            // Restore scrolling and padding
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            // Restore tabs visibility
            const tabsElement = document.querySelector(
                '[role="tablist"]',
            ) as HTMLElement
            if (tabsElement) {
                const visibility = tabsElement.dataset.visibility || 'visible'
                tabsElement.style.visibility = visibility
                delete tabsElement.dataset.visibility
            }

            window.removeEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            const tabsElement = document.querySelector(
                '[role="tablist"]',
            ) as HTMLElement
            if (tabsElement) {
                const visibility = tabsElement.dataset.visibility || 'visible'
                tabsElement.style.visibility = visibility
                delete tabsElement.dataset.visibility
            }
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100]"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-[#1a1a1a]/95 backdrop-blur-sm"
                    >
                        {/* Main container with padding */}
                        <div className="relative w-full h-full pt-6">
                            {/* Close button */}
                            <div className="absolute top-6 right-6 z-20">
                                <button
                                    onClick={(
                                        e: React.MouseEvent<HTMLButtonElement>,
                                    ) => {
                                        e.stopPropagation()
                                        onClose()
                                    }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    aria-label="Close lightbox"
                                >
                                    <XMarkIcon className="w-6 h-6 text-white" />
                                </button>
                            </div>

                            {/* Navigation arrows */}
                            {hasPrevious && (
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<HTMLButtonElement>,
                                        ) => {
                                            e.stopPropagation()
                                            if (onPrevious) onPrevious()
                                        }}
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        aria-label="Previous image"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: 0.1,
                                            }}
                                        >
                                            <ChevronLeftIcon className="w-8 h-8 text-white" />
                                        </motion.div>
                                    </button>
                                </div>
                            )}

                            {hasNext && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<HTMLButtonElement>,
                                        ) => {
                                            e.stopPropagation()
                                            if (onNext) onNext()
                                        }}
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        aria-label="Next image"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{
                                                duration: 0.7,
                                                delay: 0.1,
                                            }}
                                        >
                                            <ChevronRightIcon className="w-8 h-8 text-white" />
                                        </motion.div>
                                    </button>
                                </div>
                            )}

                            {/* Flex container for image and description */}
                            <div className="h-full flex flex-col">
                                {/* Image container */}
                                <div
                                    className="flex-1 flex items-center justify-center px-6 pb-6 z-10"
                                    onClick={(
                                        e: React.MouseEvent<HTMLDivElement>,
                                    ) => e.stopPropagation()}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        transition={{
                                            duration: 0.7,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
                                    >
                                        {video ? (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                            >
                                                <source
                                                    src={video}
                                                    type="video/quicktime"
                                                />
                                                <source
                                                    src={video}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                the video tag.
                                            </video>
                                        ) : (
                                            <img
                                                src={image}
                                                alt={alt}
                                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Description area - fixed height */}
                                <div className="h-[15vh] px-6 pb-6">
                                    {caption && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: 0.1 }}
                                            className="max-w-[50%] text-left"
                                        >
                                            <p className="text-sm text-white/90">
                                                {caption}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
