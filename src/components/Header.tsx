'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import MobileMenu from './MobileMenu'
import LogoHolder from './LogoHolder'

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)

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
        <header
            className={`sticky top-0 z-50 transition-colors duration-200 ${
                isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <LogoHolder />
                        <a
                            href="/"
                            className="text-lg font-heading hover:text-blue-500 transition-colors"
                        >
                            Portfolio
                        </a>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="#about"
                            className="font-mono hover:text-blue-500 transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#projects"
                            className="font-mono hover:text-blue-500 transition-colors"
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="font-mono hover:text-blue-500 transition-colors"
                        >
                            Contact
                        </a>
                        <button
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                    </nav>

                    <MobileMenu theme={theme} setTheme={setTheme} />
                </div>
            </div>
        </header>
    )
}
