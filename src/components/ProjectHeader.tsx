'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { Sun, Moon, Grid, ArrowLeft } from 'lucide-react'

const MotionButton = motion.button as React.ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps
>

interface ProjectHeaderProps {
    isGridVisible?: boolean
    onToggleGrid?: () => void
}

export default function ProjectHeader({
    isGridVisible = false,
    onToggleGrid,
}: ProjectHeaderProps) {
    const [mounted, setMounted] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { theme, setTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!mounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-primary-50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Home</span>
                    </Link>
                </nav>
            </header>
        )
    }

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.6,
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-primary-50 transition-colors"
                >
                    <motion.div
                        whileHover={{ x: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </motion.div>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Home
                    </motion.span>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center space-x-4">
                    {/* Grid Controls */}
                    {onToggleGrid && (
                        <MotionButton
                            onClick={onToggleGrid}
                            className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                key={isGridVisible ? 'grid-on' : 'grid-off'}
                                initial={{
                                    opacity: 0,
                                    rotate: -180,
                                    scale: 0.5,
                                }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1],
                                    scale: { duration: 0.2 },
                                }}
                            >
                                <Grid
                                    className={`w-5 h-5 ${
                                        isGridVisible
                                            ? 'text-primary-200'
                                            : 'text-primary-700'
                                    }`}
                                />
                            </motion.div>
                        </MotionButton>
                    )}

                    {/* Theme Toggle */}
                    <MotionButton
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                        className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            key={theme}
                            initial={{
                                opacity: 0,
                                rotate: -180,
                                scale: 0.5,
                            }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                                scale: { duration: 0.2 },
                            }}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-primary-200" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary-700" />
                            )}
                        </motion.div>
                    </MotionButton>
                </div>
            </nav>
        </motion.header>
    )
}
