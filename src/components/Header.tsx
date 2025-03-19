'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import MobileMenu from './MobileMenu'

interface HeaderProps {
    isGridVisible: boolean
    onToggleGrid: () => void
}

const Header = ({ isGridVisible, onToggleGrid }: HeaderProps) => {
    const [isDark, setIsDark] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'Projects', href: '#projects' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-shrink-0"
                        >
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                Portfolio
                            </Link>
                        </motion.div>

                        <nav className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={onToggleGrid}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 active:scale-90 transition-transform"
                                    title="Toggle grid guides"
                                >
                                    <ViewColumnsIcon
                                        className={`h-5 w-5 ${
                                            isGridVisible
                                                ? 'text-red-500'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDark(!isDark)}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 active:scale-90 transition-transform"
                                >
                                    {isDark ? (
                                        <SunIcon className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                    )}
                                </button>
                            </div>

                            <div className="relative md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 active:scale-90 transition-transform"
                                >
                                    <Bars3Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navItems={navItems}
            />
        </>
    )
}

export default Header
