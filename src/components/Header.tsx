'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import MobileMenu from './MobileMenu'
import LogoHolder from './LogoHolder'
import GridOverlay from './GridOverlay'

const MotionLink = motion.a
const MotionButton = motion.button

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isGridVisible, setIsGridVisible] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <>
            <GridOverlay isVisible={isGridVisible} />
            <header
                className={`sticky top-0 z-50 transition-colors duration-200 ${
                    isScrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <LogoHolder />
                            <MotionLink
                                href="/"
                                className="text-lg font-heading hover:text-blue-500 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Portfolio
                            </MotionLink>
                        </motion.div>

                        {/* Centered Navigation */}
                        <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
                            <div className="flex items-center gap-8">
                                <MotionLink
                                    href="#about"
                                    className="font-mono hover:text-blue-500 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    About
                                </MotionLink>
                                <MotionLink
                                    href="#projects"
                                    className="font-mono hover:text-blue-500 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Projects
                                </MotionLink>
                                <MotionLink
                                    href="#contact"
                                    className="font-mono hover:text-blue-500 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Contact
                                </MotionLink>
                            </div>
                        </nav>

                        {/* Controls Group */}
                        <div className="hidden md:flex items-center gap-2">
                            <MotionButton
                                onClick={() => setIsGridVisible(!isGridVisible)}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Toggle grid overlay"
                            >
                                <ViewColumnsIcon
                                    className={`w-5 h-5 ${
                                        isGridVisible
                                            ? 'text-blue-500'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                />
                            </MotionButton>
                            <MotionButton
                                onClick={() =>
                                    setTheme(
                                        theme === 'dark' ? 'light' : 'dark',
                                    )
                                }
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {theme === 'dark' ? (
                                    <SunIcon className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                )}
                            </MotionButton>
                        </div>

                        {/* Mobile Menu */}
                        <MobileMenu
                            theme={theme}
                            setTheme={setTheme}
                            isGridVisible={isGridVisible}
                            onToggleGrid={() =>
                                setIsGridVisible(!isGridVisible)
                            }
                        />
                    </div>
                </div>
            </header>
        </>
    )
}
