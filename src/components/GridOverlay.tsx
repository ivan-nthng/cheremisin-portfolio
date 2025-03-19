'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface GridOverlayProps {
    isVisible: boolean
}

export default function GridOverlay({ isVisible }: GridOverlayProps) {
    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
        >
            <motion.div
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto h-full px-6">
                    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-full gap-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-full">
                                <div className="h-full bg-red-500/20 border border-red-500/40" />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
