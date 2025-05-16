'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Calendar } from 'lucide-react'
import { useTheme } from 'next-themes'
import TypewriterTagBuilder from './TypewriterTagBuilder'
import AnimatedGradientBackground from './AnimatedGradientBackground'

export default function Hero() {
    // =============================
    // State and Theme
    // =============================
    // Handles hover, theme, tooltip, and animation state for the Hero section.
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
    const [gradientVisible, setGradientVisible] = React.useState(true)
    const [isAtTop, setIsAtTop] = React.useState(true)

    // Add interactive blob mouse tracking
    const interactiveRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const interBubble = interactiveRef.current
        if (!interBubble) return
        let curX = 0
        let curY = 0
        let tgX = 0
        let tgY = 0
        let running = true
        function move() {
            if (!interBubble) return
            curX += (tgX - curX) / 20
            curY += (tgY - curY) / 20
            interBubble.style.transform = `translate(${Math.round(
                curX,
            )}px, ${Math.round(curY)}px)`
            if (running) requestAnimationFrame(move)
        }
        function onMouseMove(event: MouseEvent) {
            tgX = event.clientX
            tgY = event.clientY
        }
        window.addEventListener('mousemove', onMouseMove)
        move()
        return () => {
            running = false
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    // =============================
    // Mount and Scroll Effect
    // =============================
    // Sets up mount state and fades out the gradient on scroll.
    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setGradientVisible(false)
            } else {
                setGradientVisible(true)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // =============================
    // Avatar Image (theme-aware)
    // =============================
    const avatarImage =
        resolvedTheme === 'dark' || theme === 'dark'
            ? '/ivan-avatar-dark.png'
            : '/ivan-avatar-light.png'

    // =============================
    // Mouse and Button Position Handlers
    // =============================
    // Used for animated tooltips and cursor effects.
    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
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
    // Scroll to Projects Section
    const handleProjectsClick = (e: React.MouseEvent) => {
        e.preventDefault()
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        // Hero Section: two-column responsive layout with animated background
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
            {/* Animated interactive gradient background (always behind content) */}
            <AnimatedGradientBackground />
            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-6">
                {/* Responsive flex layout for mobile, grid for md+ */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-24 min-h-screen md:min-h-0 justify-between items-start">
                    {/*
                      Top section: Typewriter (right on desktop, top on mobile)
                      - Hugs content, does not push or overlap bottom section
                      - Grows only downward
                    */}
                    <div className="order-1 md:order-2 flex flex-col items-start w-full max-w-md mx-auto md:mx-0 pt-8 md:pt-0 pb-4 md:pb-0">
                        <div className="w-full bg-blue-50/80 dark:bg-blue-900/80 rounded-2xl sm:rounded-3xl shadow-md  p-3 xs:p-4 md:p-8 mt-8 md:mt-0 flex flex-col items-start max-w-md mx-auto md:mx-0">
                            <TypewriterTagBuilder />
                        </div>
                    </div>
                    {/*
                      Bottom section: Main content (left on desktop, bottom on mobile)
                      - Always sticks to the bottom on mobile
                      - Balanced internal padding and spacing
                    */}
                    <div className="order-2 md:order-1 flex flex-col items-start justify-end w-full max-w-xl mx-auto md:mx-0 pb-8 pb-safe pt-4 md:pt-0 min-h-[50vh] md:min-h-0">
                        {/* Main header */}
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 dark:text-primary-100 leading-tight text-left">
                            Ivan Cheremisin
                        </h1>
                        {/* Subheader */}
                        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-primary-700 dark:text-primary-100 mt-4 sm:mt-2 text-left">
                            Product Designer
                        </h2>
                        {/* Description */}
                        <p className="mt-4 sm:mt-8 text-md sm:text-md md:text-lg xl:text-xl text-primary-600 dark:text-primary-100 font-mono text-left max-w-lg">
                            I build SaaS, AI-powered, and B2B collaborative
                            tools from the ground up — clear for users, scalable
                            for teams.
                        </p>
                        {/* Buttons block: unchanged styles */}
                        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md mb-4">
                            <Link
                                href="https://calendly.com/icheremisin/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn gap-2 justify-center items-center px-6 py-3 text-base w-full sm:w-auto"
                                onMouseEnter={() => setIsTooltipVisible(true)}
                                onMouseLeave={() => setIsTooltipVisible(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <Calendar className="w-5 h-5 flex-shrink-0 -mt-0.5" />
                                Book a Call
                            </Link>
                            <Link
                                href="#projects"
                                onClick={handleProjectsClick}
                                className="btn-secondary gap-2 justify-center items-center px-6 py-3 text-base w-full sm:w-auto"
                                onMouseEnter={() =>
                                    setIsProjectsTooltipVisible(true)
                                }
                                onMouseLeave={() =>
                                    setIsProjectsTooltipVisible(false)
                                }
                                onMouseMove={handleMouseMove}
                            >
                                View Projects
                                <ArrowDown className="w-5 h-5 flex-shrink-0" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tooltips for the two buttons (Book a Call, View Projects) */}
            {isTooltipVisible && (
                <div
                    className="fixed z-[100] pointer-events-none"
                    style={{
                        left: mousePosition.x + 15,
                        top: mousePosition.y - 30,
                    }}
                >
                    <div className="bg-primary-800 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap font-mono shadow-lg backdrop-blur-sm">
                        Move to Calendly
                    </div>
                </div>
            )}
            {isProjectsTooltipVisible && (
                <div
                    className="fixed z-[100] pointer-events-none"
                    style={{
                        left: mousePosition.x + 15,
                        top: mousePosition.y - 30,
                    }}
                >
                    <div className="bg-primary-800 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap font-mono shadow-lg backdrop-blur-sm">
                        Scroll to projects
                    </div>
                </div>
            )}
        </section>
    )
}
