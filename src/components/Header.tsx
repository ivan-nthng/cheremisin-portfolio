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

const MotionButton = motion.button

const Logo = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <path
            d="M64 0C28.656 0 0 28.656 0 64C0 99.344 28.656 128 64 128C99.344 128 128 99.344 128 64C128 28.656 99.344 0 64 0ZM97.248 68.464H73.024L90.144 85.584L83.728 92L66.608 74.88V99.104H57.52V74.88L40.4 92L33.984 85.584L55.648 63.92L33.984 42.256L40.4 35.84L57.52 52.96V28.736H66.608V59.376H97.248V68.464Z"
            fill="currentColor"
        />
    </svg>
)

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                    <motion.div
                        animate={{ rotate: isSpinning ? 360 : 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-8 h-8 text-primary-800 dark:text-primary-100 transition-colors duration-300"
                    >
                        <Logo />
                    </motion.div>
                    <AnimatePresence>
                        {showText && (
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-xl font-heading font-bold text-primary-800 dark:text-primary-100 cursor-pointer"
                            >
                                Ivan Cheremisin
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Projects', 'About', 'Contact'].map((item) => (
                            <motion.div
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
                            </motion.div>
                        ))}
                    </div>

                    {/* Theme, Grid Controls, and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Theme and Grid Controls - Always visible */}
                        <motion.button
                            onClick={() => setShowGrid(!showGrid)}
                            className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
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
                            </motion.div>
                        </motion.button>
                        <motion.button
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
                        </motion.button>

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
