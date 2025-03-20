'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GridOverlayProps {
    show: boolean
}

export default function GridOverlay({ show }: GridOverlayProps) {
    return (
        <AnimatePresence>
            {show && (
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
                    <div className="relative w-full h-full max-w-7xl mx-auto px-6">
                        {/* Grid layout matching site's content grid */}
                        <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-full bg-primary-500/15 dark:bg-primary-400/15 backdrop-blur-[0.5px]"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
