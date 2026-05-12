'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function HitoLink() {
    const { theme } = useTheme()
    const [isHovered, setIsHovered] = React.useState(false)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
    const linkRef = React.useRef<HTMLAnchorElement>(null)
    const popupRef = React.useRef<HTMLDivElement>(null)
    const [popupPlacement, setPopupPlacement] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (linkRef.current) {
            const rect = linkRef.current.getBoundingClientRect()
            setTooltipPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    // Calculate popup position to keep it within viewport
    React.useEffect(() => {
        if (isHovered && linkRef.current && popupRef.current) {
            const linkRect = linkRef.current.getBoundingClientRect()
            const popupRect = popupRef.current.getBoundingClientRect()
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            // Default position (to the right of the link)
            let x = tooltipPosition.x + 20
            let y = tooltipPosition.y - 20

            // Check if popup would go off the right edge
            if (linkRect.right + popupRect.width > viewportWidth) {
                // Position to the left of the link
                x = -popupRect.width - 20
            }

            // Check if popup would go off the bottom edge
            if (linkRect.top + y + popupRect.height > viewportHeight) {
                // Adjust y to keep popup within viewport
                y = viewportHeight - linkRect.top - popupRect.height - 10
            }

            // Check if popup would go off the top edge
            if (linkRect.top + y < 0) {
                // Adjust y to keep popup within viewport
                y = 0
            }

            setPopupPlacement({ x, y })
        }
    }, [isHovered, tooltipPosition])

    const currentImage =
        theme === 'dark'
            ? '/ds-hito/project-1-dark.png'
            : '/ds-hito/project-1-light.png'

    return (
        <span className="relative inline-block">
            <Link
                ref={linkRef}
                href="/projects/ds-hito"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="inline-flex items-center gap-2 border-b border-border text-foreground transition-colors hover:text-accent"
            >
                [CASE] Hito Design System
                <ArrowUpRight className="w-4 h-4" />
            </Link>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: popupPlacement.x,
                            y: popupPlacement.y,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute z-[100] pointer-events-none"
                    >
                        <div
                            ref={popupRef}
                            className="w-[500px] overflow-hidden border border-border-strong bg-surface"
                        >
                            <div className="flex">
                                <div className="flex-1 p-6">
                                    <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                                        linked project
                                    </div>
                                    <h3 className="mb-3 mt-3 text-lg font-bold text-foreground">
                                        Hito Design System
                                    </h3>
                                    <p className="text-sm leading-7 text-muted">
                                        A design system built on semantic
                                        tokens, so teams can scale components
                                        without rewriting them.
                                    </p>
                                </div>
                                <div className="relative w-2/5 border-l border-border bg-surface-muted">
                                    <div className="relative flex h-full w-full items-center justify-center p-4">
                                        <Image
                                            src={currentImage}
                                            alt="Hito Design System"
                                            width={200}
                                            height={150}
                                            className="object-contain w-full h-full"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}
