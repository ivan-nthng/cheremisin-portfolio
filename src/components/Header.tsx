'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { Sun, Moon, Grid } from 'lucide-react'
import MobileMenu from './MobileMenu'
import GridOverlay from './GridOverlay'

type MotionButtonProps = React.ComponentProps<'button'> & MotionProps
type MotionDivProps = React.ComponentProps<'div'> & MotionProps

const MotionButton = motion.button as React.FC<MotionButtonProps>
const MotionDiv = motion.div as React.FC<MotionDivProps>

const Logo = () => {
    const { theme } = useTheme()
    return (
        <div className="relative w-full h-full">
            <svg
                width="32"
                height="32"
                viewBox="0 0 97 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <g clipPath="url(#clip0_920_900)">
                    <path
                        d="M0 32.36C0 48.36 32 64.36 48 64.36C64 64.36 96.24 48.36 96.24 32.36C96.24 16.36 64.24 0 48.12 0C32 0 0 16.36 0 32.36Z"
                        className="text-primary-800 dark:text-primary-100"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_920_900">
                        <rect width="96.24" height="64.36" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <MotionDiv
                className="absolute inset-0 pointer-events-none"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 97 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <g
                        className={
                            theme === 'dark' ? 'text-primary-800' : 'text-white'
                        }
                    >
                        <path
                            d="M52.7995 30.1799L63.5495 19.4299L60.7195 16.5999L49.9695 27.3499V12.1499H45.9695V27.3499L35.2195 16.5999L32.3995 19.4299L43.1395 30.1799H27.9395V34.1799H43.1395H45.9695H47.1395H48.7995H49.9695H52.7995H67.9995V30.1799H52.7995Z"
                            fill="currentColor"
                        />
                        <path
                            d="M32.4004 44.9299L35.2204 47.7499L44.8004 38.1799H39.1404L32.4004 44.9299Z"
                            fill="currentColor"
                        />
                        <path
                            d="M49.9688 38.1799H45.9688V52.2099H49.9688V38.1799Z"
                            fill="currentColor"
                        />
                        <path
                            d="M51.1387 38.1799L60.7187 47.7499L63.5487 44.9299L56.7987 38.1799H51.1387Z"
                            fill="currentColor"
                        />
                    </g>
                </svg>
            </MotionDiv>
        </div>
    )
}

export default function Header() {
    const [mounted, setMounted] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [showGrid, setShowGrid] = React.useState(false)
    const [showText, setShowText] = React.useState(false)
    const [isSpinning, setIsSpinning] = React.useState(false)
    const { theme, setTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            const projectsSection = document.getElementById('projects')
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect()
                setShowText(rect.top <= 100) // Show text when projects section is near the top
            }
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsSpinning(true)
        setTimeout(() => setIsSpinning(false), 1000)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    if (!mounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-8 h-8 text-primary-800 dark:text-primary-100">
                            <Logo />
                        </div>
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
            className={`fixed sm:top-0 left-0 right-0 z-50 transition-all duration-300 bottom-0 sm:bottom-auto ${
                isScrolled
                    ? 'bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={handleLogoClick}
                >
                    <div className="relative w-8 h-8 text-primary-800 dark:text-primary-100 transition-colors duration-300 hover:scale-105 active:scale-95">
                        <Logo />
                    </div>
                    <AnimatePresence>
                        {false && showText && (
                            <MotionDiv
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-xl font-heading font-bold text-primary-800 dark:text-primary-100 cursor-pointer"
                            >
                                Ivan Cheremisin
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Projects', 'About', 'Contact'].map((item) => (
                            <MotionDiv
                                key={item}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className="text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-primary-50 transition-colors"
                                >
                                    {item}
                                </Link>
                            </MotionDiv>
                        ))}
                    </div>

                    {/* Theme, Grid Controls, and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Theme and Grid Controls - Always visible */}
                        <MotionButton
                            onClick={() => setShowGrid(!showGrid)}
                            className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MotionDiv
                                key={showGrid ? 'grid-on' : 'grid-off'}
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
                                        showGrid
                                            ? 'text-primary-200'
                                            : 'text-primary-700'
                                    }`}
                                />
                            </MotionDiv>
                        </MotionButton>
                        <MotionButton
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                            className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MotionDiv
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
                            </MotionDiv>
                        </MotionButton>

                        {/* Mobile Menu Button */}
                        <MotionButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden p-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </MotionButton>
                    </div>
                </div>

                {/* Mobile Menu */}
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    theme={theme}
                    setTheme={setTheme}
                    showGrid={showGrid}
                    setShowGrid={setShowGrid}
                />
            </nav>

            {/* Grid Overlay */}
            <GridOverlay show={showGrid} />
        </motion.header>
    )
}
