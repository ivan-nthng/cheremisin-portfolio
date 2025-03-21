'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
    isVisible: boolean
    position: { x: number; y: number }
}

export default function CustomCursor({
    isVisible,
    position,
}: CustomCursorProps) {
    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                opacity: isVisible ? 1 : 0,
                x: position.x - 40,
                y: position.y - 40,
            }}
            transition={{
                opacity: { duration: 0.2 },
                x: { duration: 0, ease: 'linear' },
                y: { duration: 0, ease: 'linear' },
            }}
        >
            <div className="relative w-[80px] h-[80px]">
                <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: isVisible ? 1 : 0.5 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <path
                            id="textPath"
                            d="M50,10 A40,40 0 1,1 49.9,10"
                            fill="none"
                            className="text-black"
                        />
                        <text className="text-[14px] font-medium tracking-wider">
                            <textPath href="#textPath" startOffset="0%">
                                Read More • Read More •
                            </textPath>
                        </text>
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}
