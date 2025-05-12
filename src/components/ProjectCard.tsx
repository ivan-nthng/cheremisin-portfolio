'use client'

// ===================================
// Imports and Dependencies
// ===================================
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

// ===================================
// Types and Interfaces
// ===================================
/**
 * ProjectCardProps interface defines the properties for the ProjectCard component
 * @property {string} title - The title of the project
 * @property {string} description - A brief description of the project
 * @property {string[]} tags - Array of technology tags used in the project
 * @property {string} image - Path to the project's main image
 * @property {string} link - URL to the project's page or external link
 * @property {string} [darkImage] - Optional alternative image for dark mode
 * @property {string} [companyName] - Optional name of the company associated with the project
 * @property {string} [companyUrl] - Optional URL to the company's website
 * @property {Map<string, number>} [tagCounts] - Optional map tracking tag usage across projects
 * @property {boolean} [noimg] - Optional flag to render the card without an image
 */
interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    link: string
    darkImage?: string
    companyName?: string
    companyUrl?: string
    tagCounts?: Map<string, number>
    noimg?: boolean
}

// ===================================
// Main Component
// ===================================
/**
 * ProjectCard Component
 *
 * A responsive card component that displays project information including:
 * - Project image with hover animations
 * - Project title and description
 * - Company link (if provided)
 * - Technology tags with usage indicators
 * - Interactive elements with custom cursor
 *
 * Features:
 * - Intersection Observer for scroll-based animations
 * - Theme-aware image selection (light/dark mode)
 * - Hover animations for images and interactive elements
 * - Tag usage indicators showing how frequently a technology is used
 * - Custom cursor that changes based on interactive elements
 *
 * @param {ProjectCardProps} props - Component properties
 * @returns {JSX.Element} Rendered ProjectCard component
 */
export default function ProjectCard({
    title,
    description,
    tags,
    image,
    darkImage,
    link,
    companyName,
    companyUrl,
    tagCounts,
    noimg = false,
}: ProjectCardProps) {
    // ===================================
    // Hooks and State Management
    // ===================================
    // Router for navigation
    const router = useRouter()
    // Theme context for light/dark mode detection
    const { theme } = useTheme()
    // Ref for the card element (used for intersection observer)
    const cardRef = React.useRef<HTMLDivElement>(null)
    // State for tracking card visibility in viewport
    const [isVisible, setIsVisible] = React.useState(false)
    // State for tracking card hover
    const [isHovered, setIsHovered] = React.useState(false)
    // State for tracking image hover
    const [isImageHovered, setIsImageHovered] = React.useState(false)
    // State for tracking cursor position relative to card
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })
    // State for tracking company link hover
    const [isCompanyHovered, setIsCompanyHovered] = React.useState(false)
    // State for tracking company tooltip position
    const [companyTooltipPosition, setCompanyTooltipPosition] = React.useState({
        x: 0,
        y: 0,
    })

    // ===================================
    // Intersection Observer Setup
    // ===================================
    /**
     * Sets up an Intersection Observer to detect when the card enters the viewport
     * This enables scroll-based animations and optimizes performance
     */
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.3 }, // Trigger when 30% of the element is visible
        )

        if (cardRef.current) {
            observer.observe(cardRef.current)
        }

        // Cleanup function to disconnect the observer when component unmounts
        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current)
            }
        }
    }, [])

    // ===================================
    // Event Handlers
    // ===================================
    /**
     * Updates cursor position relative to the card element
     * Used for positioning the custom cursor
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
     * Updates tooltip position for company link
     * Ensures tooltip follows the cursor when hovering over company name
     */
    const handleCompanyMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCompanyTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    // ===================================
    // Animation Variants
    // ===================================
    /**
     * Animation variants for the card container
     * Controls fade-in animation when card enters viewport
     */
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    }

    /**
     * Animation variants for the project image
     * Controls slide-in animation from right when card enters viewport
     */
    const imageVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
        exit: { x: '100%', opacity: 0 },
    }

    /**
     * Determines which image to display based on current theme
     * Uses darkImage if available and theme is dark, otherwise uses default image
     */
    const currentImage = theme === 'dark' && darkImage ? darkImage : image

    // ===================================
    // Component Render
    // ===================================
    return (
        <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => router.push(link)}
            className={`flex flex-col gap-4 cursor-none relative ${
                noimg ? 'p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
        >
            {/* Custom Cursor - Changes appearance based on interactive elements */}
            <CustomCursor
                isVisible={isHovered}
                position={cursorPosition}
                text={isCompanyHovered ? 'Website' : 'Read More'}
                isHighlighted={isCompanyHovered}
            />

            {/* Project Image Section - Only rendered if noimg prop is false */}
            {!noimg && (
                <motion.div
                    onHoverStart={() => setIsImageHovered(true)}
                    onHoverEnd={() => setIsImageHovered(false)}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-blue-100/80 dark:bg-blue-900/80 transition-colors duration-300"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            paddingTop: '4%',
                            paddingRight: '4%',
                            paddingBottom: '4%',
                            paddingLeft: '4%',
                        }}
                        initial="hidden"
                        animate={
                            isVisible && !isImageHovered ? 'visible' : 'hidden'
                        }
                        variants={imageVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={currentImage}
                                alt={title}
                                width={800}
                                height={450}
                                className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Project Content Section - Contains title, company link, description, and tags */}
            <div className="flex-1">
                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-100">
                    {title}
                </h3>

                {/* Company Link - Only rendered if companyName prop is provided */}
                {companyName && (
                    <div className="relative">
                        <Link
                            href={companyUrl || link}
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
                            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors cursor-pointer"
                        >
                            {companyName}
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Project Description and Tags */}
                <div className="mt-2 sm:mt-3 space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-md text-primary-600 dark:text-primary-300">
                        {description}
                    </p>
                    {/* Technology Tags - Displays all tags with usage indicators if tagCounts is provided */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-sm bg-blue-100/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                            >
                                {/* Tag Usage Indicator - Star icon with opacity based on usage count */}
                                {tagCounts && tagCounts.get(tag)! > 1 && (
                                    <Star
                                        className="w-3 h-3"
                                        style={{
                                            opacity:
                                                tagCounts.get(tag)! >= 5
                                                    ? 1
                                                    : tagCounts.get(tag)! === 4
                                                    ? 0.8
                                                    : tagCounts.get(tag)! === 3
                                                    ? 0.6
                                                    : tagCounts.get(tag)! === 2
                                                    ? 0.4
                                                    : 0,
                                        }}
                                    />
                                )}
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
