'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Calendar } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Hero() {
    const [isHovered, setIsHovered] = React.useState(false)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(false)
    const [isProjectsTooltipVisible, setIsProjectsTooltipVisible] =
        React.useState(false)
    const [projectsButtonPosition, setProjectsButtonPosition] = React.useState({
        x: 0,
        y: 0,
    })
    const [calendlyButtonPosition, setCalendlyButtonPosition] = React.useState({
        x: 0,
        y: 0,
    })
    const [avatarPosition, setAvatarPosition] = React.useState({ x: 0, y: 0 })

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const avatarImage =
        mounted &&
        (resolvedTheme === 'dark'
            ? '/ivan-avatar-dark.png'
            : '/ivan-avatar-light.png')

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleAvatarMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setAvatarPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleProjectsMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setProjectsButtonPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleCalendlyMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCalendlyButtonPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleProjectsClick = (e: React.MouseEvent) => {
        e.preventDefault()
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center py-20 md:py-0 bg-primary-50 dark:bg-primary-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold mb-8 font-heading leading-[1.4] text-primary-800 dark:text-primary-100 xl:w-1/2 2xl:w-1/2 lg:w-2/3"
                        >
                            <span className="inline-flex flex-col items-start gap-2">
                                <span className="inline-flex items-center gap-2">
                                    Hi 👋! I'm Ivan{' '}
                                    <div className="relative inline-flex">
                                        <Link
                                            href="https://calendly.com/icheremisin/30min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex relative group items-center"
                                            onMouseEnter={() =>
                                                setIsHovered(true)
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered(false)
                                            }
                                            onMouseMove={handleAvatarMouseMove}
                                        >
                                            {mounted && avatarImage && (
                                                <motion.span
                                                    className="inline-flex w-10 h-10 md:w-12 md:h-12 relative items-center"
                                                    animate={{
                                                        rotate: isHovered
                                                            ? 360
                                                            : 0,
                                                        scale: isHovered
                                                            ? 1.1
                                                            : 1,
                                                    }}
                                                    transition={{
                                                        rotate: {
                                                            duration: 0.6,
                                                            ease: 'easeInOut',
                                                        },
                                                        scale: {
                                                            duration: 0.2,
                                                        },
                                                    }}
                                                >
                                                    <Image
                                                        src={avatarImage}
                                                        alt="Ivan's avatar"
                                                        fill
                                                        className={`object-contain transition-all duration-300 ${
                                                            isHovered
                                                                ? 'brightness-120'
                                                                : ''
                                                        }`}
                                                        priority
                                                    />
                                                </motion.span>
                                            )}
                                        </Link>
                                        <AnimatePresence>
                                            {isHovered && (
                                                <div className="absolute z-[100] pointer-events-none">
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            x:
                                                                avatarPosition.x +
                                                                20,
                                                            y:
                                                                avatarPosition.y -
                                                                20,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: 'easeOut',
                                                        }}
                                                        className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono"
                                                    >
                                                        Book a 15-minute call
                                                    </motion.div>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </span>
                                <motion.span
                                    className="inline-block bg-clip-text text-transparent pb-1 text-5xl pt-2"
                                    animate={{
                                        backgroundImage: [
                                            'radial-gradient(circle at 0% 0%, #274284, #FF4E51)',
                                            'radial-gradient(circle at 100% 100%, #274284, #FF4E51)',
                                            'radial-gradient(circle at 100% 0%, #274284, #FF4E51)',
                                            'radial-gradient(circle at 0% 100%, #274284, #FF4E51)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                >
                                    Product Designer
                                </motion.span>
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-primary-600 dark:text-primary-300 mb-12 max-w-2xl"
                        >
                            I make digital things better — whether building from
                            scratch or refining what’s already there. Always
                            with clarity, always with care.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col md:flex-row gap-4 w-full md:w-auto max-w-[420px] md:max-w-none items-start"
                        >
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="https://calendly.com/icheremisin/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() =>
                                            setIsTooltipVisible(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsTooltipVisible(false)
                                        }
                                        onMouseMove={handleCalendlyMouseMove}
                                        className="inline-flex w-full md:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-md transition-colors duration-300 items-center justify-center gap-3"
                                    >
                                        <Calendar className="w-5 h-5 flex-shrink-0 -mt-0.5" />
                                        Book a Call
                                    </Link>
                                </motion.div>
                                <AnimatePresence>
                                    {isTooltipVisible && (
                                        <div className="absolute z-[100] pointer-events-none">
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    x:
                                                        calendlyButtonPosition.x +
                                                        20,
                                                    y:
                                                        calendlyButtonPosition.y -
                                                        20,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: 'easeOut',
                                                }}
                                                className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono"
                                            >
                                                Move to Calendly
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="#projects"
                                        onClick={handleProjectsClick}
                                        onMouseEnter={() =>
                                            setIsProjectsTooltipVisible(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsProjectsTooltipVisible(false)
                                        }
                                        onMouseMove={handleProjectsMouseMove}
                                        className="inline-flex w-full md:w-auto px-6 py-3 bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700 text-primary-900 dark:text-primary-100 rounded-md transition-colors duration-300 items-center justify-center gap-2"
                                    >
                                        View Projects
                                        <ArrowDown className="w-5 h-5 flex-shrink-0" />
                                    </Link>
                                </motion.div>
                                <AnimatePresence>
                                    {isProjectsTooltipVisible && (
                                        <div className="absolute z-[100] pointer-events-none">
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    x:
                                                        projectsButtonPosition.x +
                                                        20,
                                                    y:
                                                        projectsButtonPosition.y -
                                                        20,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: 'easeOut',
                                                }}
                                                className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono"
                                            >
                                                Scroll to projects
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
