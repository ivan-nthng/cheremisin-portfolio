'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import CustomCursor from './CustomCursor'
import React from 'react'

/**
 * Props interface for the SingleColumnProjectCard component
 * @property {string} header - The main title/header of the card
 * @property {string} [companyLink] - Optional URL for the company link
 * @property {string} description - The main description text
 * @property {string[]} tags - Array of technology tags to display
 * @property {React.ReactNode | null} [logo] - Optional logo component to display at the bottom
 * @property {string} [companyName] - Optional company name to display instead of the URL
 * @property {string} link - The URL for the project page
 */
interface SingleColumnProjectCardProps {
    header: string
    companyLink?: string
    description: string
    tags: string[]
    logo?: React.ReactNode | null
    companyName?: string
    link: string
}

/**
 * SingleColumnProjectCard Component
 *
 * A reusable card component that displays content in a single column layout.
 * Features include:
 * - Custom cursor interaction
 * - Theme-aware styling
 * - Optional company link
 * - Technology tags display
 * - Optional logo at the bottom
 *
 * @param {SingleColumnProjectCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export default function SingleColumnProjectCard({
    header,
    companyLink,
    description,
    tags,
    logo,
    companyName,
    link,
}: SingleColumnProjectCardProps) {
    // Router for navigation
    const router = useRouter()
    // Theme context for dark/light mode
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Refs and state for cursor and hover effects
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })
    const [isCompanyHovered, setIsCompanyHovered] = React.useState(false)
    const [companyTooltipPosition, setCompanyTooltipPosition] = React.useState({
        x: 0,
        y: 0,
    })

    /**
     * Updates cursor position based on mouse movement within the card
     * @param {React.MouseEvent} e - The mouse event
     */
    const handleMouseMove = (e: React.MouseEvent) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setCursorPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    /**
     * Updates company tooltip position based on mouse movement
     * @param {React.MouseEvent} e - The mouse event
     */
    const handleCompanyMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCompanyTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className="w-full cursor-none relative"
        >
            {/* Custom cursor component that changes based on hover state */}
            <CustomCursor
                isVisible={isHovered}
                position={cursorPosition}
                text={isCompanyHovered ? 'Website' : 'Read More'}
                isHighlighted={isCompanyHovered}
            />

            {/* Main card container with theme-aware background */}
            <div
                className={`relative overflow-hidden rounded-2xl p-6 ${
                    isDark ? 'bg-blue-900/80' : 'bg-blue-100/80'
                }`}
            >
                <div className="flex flex-col gap-4">
                    {/* Project header section */}
                    <div>
                        {/* Main header/title */}
                        <h3 className="text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-100">
                            {header}
                        </h3>
                        {/* Company link with external icon */}
                        {companyLink && (
                            <Link
                                href={companyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={(e) => {
                                    setIsCompanyHovered(true)
                                    handleCompanyMouseMove(e)
                                }}
                                onMouseLeave={() => {
                                    setIsCompanyHovered(false)
                                }}
                                onMouseMove={handleCompanyMouseMove}
                                className="inline-flex mt-2 items-center gap-1 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors cursor-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {companyName || companyLink}
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        )}
                        {/* Project description */}
                        <p className="mt-4 text-sm text-primary-600 dark:text-primary-300">
                            {description}
                        </p>
                        {/* Technology tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-sm bg-blue-200/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Logo section with consistent spacing */}
                    {logo && (
                        <div className="relative mt-auto pt-12">{logo}</div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
