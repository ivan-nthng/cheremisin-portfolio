'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Calendar } from 'lucide-react'
import { useTheme } from 'next-themes'

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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Advanced Animated SVG/CSS Gradient Background */}
            <motion.div
                className="gradient-bg"
                aria-hidden="true"
                initial={{ opacity: 1 }}
                animate={{ opacity: isAtTop ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
                <svg
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0,
                    }}
                >
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="20"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </svg>
                <div className="gradients-container">
                    <div className="g1" />
                    <div className="g2" />
                    <div className="g3" />
                    <div className="g4" />
                    <div className="g5" />
                    <div className="interactive" ref={interactiveRef} />
                </div>
            </motion.div>
            {/* Centered Content Block */}
            <motion.div
                className="flex-1 flex flex-col items-center justify-center w-full px-4 relative z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: isAtTop ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
                <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-32 mb-16">
                    {/* Avatar above header */}
                    <img
                        src={avatarImage}
                        alt="Ivan Cheremisin avatar"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-6"
                        style={{ border: 'none' }}
                    />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-50 text-center leading-tight">
                        Ivan Cheremisin
                        <br />
                        <span className="block">Product Designer</span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-blue-50  text-center max-w-xl font-mono">
                        I build SaaS, AI-powered, and B2B collaborative tools
                        from the ground up — clear for users, scalable for
                        teams.
                    </p>
                </div>
                {/* Buttons Block */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg items-center justify-center mb-16">
                    <Link
                        href="https://calendly.com/icheremisin/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn w-full sm:w-auto gap-2 justify-center items-center rounded-lg px-7 py-5 sm:py-3 bg-blue-100 text-blue-900 font-mono text-base font-semibold shadow-md transition-colors duration-200 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        className="btn-secondary w-full sm:w-auto gap-2 justify-center items-center rounded-lg px-7 py-5 sm:py-3 bg-white/20 text-white font-mono text-base font-semibold shadow-md transition-colors duration-200 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                        onMouseEnter={() => setIsProjectsTooltipVisible(true)}
                        onMouseLeave={() => setIsProjectsTooltipVisible(false)}
                        onMouseMove={handleMouseMove}
                    >
                        View Projects
                        <ArrowDown className="w-5 h-5 flex-shrink-0" />
                    </Link>
                </div>
                {/* Calendly Button Tooltip */}
                {isTooltipVisible && (
                    <div
                        className="fixed z-[100] pointer-events-none"
                        style={{
                            left: mousePosition.x + 15,
                            top: mousePosition.y - 30,
                        }}
                    >
                        <div className="bg-blue-900/90 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap font-mono shadow-lg backdrop-blur-sm">
                            Move to Calendly
                        </div>
                    </div>
                )}
                {/* Projects Button Tooltip */}
                {isProjectsTooltipVisible && (
                    <div
                        className="fixed z-[100] pointer-events-none"
                        style={{
                            left: mousePosition.x + 15,
                            top: mousePosition.y - 30,
                        }}
                    >
                        <div className="bg-blue-900/90 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap font-mono shadow-lg backdrop-blur-sm">
                            Scroll to projects
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    )
}
