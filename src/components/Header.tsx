'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import MobileMenu from './MobileMenu'
import LogoHolder from './LogoHolder'
import GridOverlay from './GridOverlay'

const MotionHeader = motion.header
const MotionLink = motion.a as React.FC<React.ComponentProps<'a'> & MotionProps>
const MotionButton = motion.button as React.FC<
    React.ComponentProps<'button'> & MotionProps
>

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
            <div className="fixed top-0 left-0 right-0 z-50">
                <MotionHeader
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 50,
                        damping: 20,
                        duration: 0.6,
                    }}
                    className={`transition-colors duration-200 ${
                        isScrolled
                            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
                            : 'bg-transparent'
                    }`}
                >
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo and Title */}
                            <div className="flex items-center gap-3">
                                <LogoHolder />
                                <MotionLink
                                    href="/"
                                    className="text-xl font-heading font-bold hover:text-blue-500 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Portfolio
                                </MotionLink>
                            </div>

                            {/* Centered Navigation */}
                            <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
                                <div className="flex items-center gap-8">
                                    {['About', 'Projects', 'Contact'].map(
                                        (item) => (
                                            <MotionLink
                                                key={item}
                                                href={`#${item.toLowerCase()}`}
                                                className="font-mono hover:text-blue-500 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {item}
                                            </MotionLink>
                                        ),
                                    )}
                                </div>
                            </nav>

                            {/* Controls Group */}
                            <div className="flex items-center gap-3">
                                <MotionButton
                                    onClick={() =>
                                        setIsGridVisible(!isGridVisible)
                                    }
                                    className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                                    className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {theme === 'dark' ? (
                                        <SunIcon className="w-5 h-5 text-yellow-500" />
                                    ) : (
                                        <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    )}
                                </MotionButton>
                                {/* Mobile Menu Button */}
                                <div className="md:hidden">
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
                        </div>
                    </div>
                </MotionHeader>
            </div>
        </>
    )
}
