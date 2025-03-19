'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
    theme?: string
    setTheme?: (theme: string) => void
}

export default function MobileMenu({ theme, setTheme }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                            isOpen
                                ? 'M6 18L18 6M6 6l12 12'
                                : 'M4 6h16M4 12h16M4 18h16'
                        }
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg"
                    >
                        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
                            <a
                                href="#about"
                                onClick={() => setIsOpen(false)}
                                className="font-mono hover:text-blue-500 transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="#projects"
                                onClick={() => setIsOpen(false)}
                                className="font-mono hover:text-blue-500 transition-colors"
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="font-mono hover:text-blue-500 transition-colors"
                            >
                                Contact
                            </a>
                            <button
                                onClick={() => {
                                    setTheme?.(
                                        theme === 'dark' ? 'light' : 'dark',
                                    )
                                }}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-10 text-center"
                            >
                                {theme === 'dark' ? '🌞' : '🌙'}
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
