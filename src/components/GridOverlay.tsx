'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GridOverlayProps {
    show?: boolean
    isVisible?: boolean // For backward compatibility
}

export default function GridOverlay({ show, isVisible }: GridOverlayProps) {
    const isShown = show ?? isVisible ?? false

    return (
        <AnimatePresence>
            {isShown && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1], // Custom easing for smooth slide
                    }}
                    className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen pointer-events-none [z-index:2147483647]"
                >
                    {/* Site-width container */}
                    <div className="relative mx-auto h-full w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
                        {/* Grid layout matching site's content grid */}
                        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                            {/* First 2 columns - always visible */}
                            <div className="h-full bg-accent/12" />
                            <div className="h-full bg-accent/12" />

                            {/* Next 2 columns - visible from sm up */}
                            <div className="hidden h-full bg-accent/12 sm:block" />
                            <div className="hidden h-full bg-accent/12 sm:block" />

                            {/* Next 4 columns - visible from md up */}
                            <div className="hidden h-full bg-accent/12 md:block" />
                            <div className="hidden h-full bg-accent/12 md:block" />
                            <div className="hidden h-full bg-accent/12 md:block" />
                            <div className="hidden h-full bg-accent/12 md:block" />

                            {/* Last 4 columns - visible from lg up */}
                            <div className="hidden h-full bg-accent/12 lg:block" />
                            <div className="hidden h-full bg-accent/12 lg:block" />
                            <div className="hidden h-full bg-accent/12 lg:block" />
                            <div className="hidden h-full bg-accent/12 lg:block" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
