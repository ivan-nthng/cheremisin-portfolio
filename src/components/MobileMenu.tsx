'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Grid, X } from 'lucide-react'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    theme: string | undefined
    setTheme: (theme: string) => void
    showGrid: boolean
    setShowGrid: (show: boolean) => void
}

export default function MobileMenu({
    isOpen,
    onClose,
    theme,
    setTheme,
    showGrid,
    setShowGrid,
}: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-primary-900/50 backdrop-blur-sm z-40"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed right-0 top-0 h-full w-64 bg-primary-50 dark:bg-primary-900 shadow-xl z-50"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Links */}
                        <nav className="pt-16 px-6">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="#about"
                                        onClick={onClose}
                                        className="block text-lg text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-primary-50"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#projects"
                                        onClick={onClose}
                                        className="block text-lg text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-primary-50"
                                    >
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#contact"
                                        onClick={onClose}
                                        className="block text-lg text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-primary-50"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Controls */}
                        <div className="absolute bottom-8 left-6 right-6">
                            <div className="flex items-center justify-around">
                                <button
                                    onClick={() => setShowGrid(!showGrid)}
                                    className="p-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100"
                                    aria-label="Toggle grid overlay"
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() =>
                                        setTheme(
                                            theme === 'dark' ? 'light' : 'dark',
                                        )
                                    }
                                    className="p-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
