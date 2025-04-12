'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import WideProjectCard from './WideProjectCard'
import NoResultsCard from './NoResultsCard'
import { X, Star } from 'lucide-react'

export interface Project {
    title: string
    description: string
    image: string
    darkImage?: string
    technologies: string[]
    link: string
    isWide?: boolean
    companyName?: string
}

export const projects: Project[] = [
    {
        title: 'Taxi Aggregator Support Workspace',
        description:
            'A modern web application built with Next.js, TypeScript, and Tailwind CSS.',
        image: '/chat-light.png',
        darkImage: '/chat-dark.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        link: '/projects/taxi-aggregator-support-workspace',
        companyName: 'VK',
    },
    {
        title: 'Hito DS',
        description:
            'A comprehensive data science platform that helps users analyze and visualize complex datasets with ease. Built with modern web technologies and a focus on user experience.',
        image: '/ds-hito-light.png',
        darkImage: '/ds-hito-dark.png',
        technologies: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
        link: '/projects/ds-hito',
        isWide: true,
        companyName: 'DS Hito',
    },
    {
        title: 'Project 2',
        description:
            'A responsive e-commerce platform with a focus on user experience.',
        image: '/message-light.png',
        darkImage: '/message-dark.png',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: '/projects/placeholder-project-2',
        companyName: 'Company 2',
    },
    {
        title: 'Project 3',
        description: 'A real-time chat application with WebSocket integration.',
        image: '/message-light.png',
        darkImage: '/message-dark.png',
        technologies: ['Vue.js', 'Express', 'Socket.io'],
        link: '/projects/placeholder-project-3',
        companyName: 'Company 3',
    },
]

export default function Projects() {
    const [selectedTags, setSelectedTags] = React.useState<Set<string>>(
        new Set(),
    )
    const [isHovered, setIsHovered] = React.useState(false)
    const [hoveredTag, setHoveredTag] = React.useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Get unique tags from all projects with their counts
    const allTags = React.useMemo(() => {
        const tagCounts = new Map<string, number>()
        projects.forEach((project) => {
            project.technologies.forEach((tag) => {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
            })
        })
        return Array.from(tagCounts.entries())
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => {
                // First sort by count (descending)
                if (b.count !== a.count) {
                    return b.count - a.count
                }
                // Then alphabetically
                return a.tag.localeCompare(b.tag)
            })
    }, [])

    // Get star opacity based on usage count
    const getStarOpacity = (count: number) => {
        if (count >= 5) return 1
        if (count === 4) return 0.8
        if (count === 3) return 0.6
        if (count === 2) return 0.4
        return 0
    }

    // Get tag counts map for passing to cards
    const tagCountsMap = React.useMemo(() => {
        const counts = new Map<string, number>()
        projects.forEach((project) => {
            project.technologies.forEach((tag) => {
                counts.set(tag, (counts.get(tag) || 0) + 1)
            })
        })
        return counts
    }, [])

    // Filter projects based on selected tags
    const filteredProjects = React.useMemo(() => {
        if (selectedTags.size === 0) return projects
        return projects.filter((project) =>
            Array.from(selectedTags).every((tag) =>
                project.technologies.includes(tag),
            ),
        )
    }, [selectedTags])

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => {
            const next = new Set(prev)
            if (next.has(tag)) {
                next.delete(tag)
            } else {
                next.add(tag)
            }
            return next
        })
    }

    const clearFilters = () => {
        setSelectedTags(new Set())
    }

    const handleTagMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <section
            id="projects"
            className="relative py-12 sm:py-16 md:py-24 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-8 sm:mb-12"
                >
                    Featured Projects
                </motion.h2>

                {/* Tags Filter */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {allTags.map(({ tag, count }, index) => (
                            <div key={tag} className="relative">
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                    onClick={() => toggleTag(tag)}
                                    onMouseEnter={(e) => {
                                        setIsHovered(true)
                                        setHoveredTag(tag)
                                        handleTagMouseMove(e)
                                    }}
                                    onMouseLeave={() => {
                                        setIsHovered(false)
                                        setHoveredTag(null)
                                    }}
                                    onMouseMove={handleTagMouseMove}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                                        selectedTags.has(tag)
                                            ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-white'
                                            : 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-700'
                                    }`}
                                >
                                    {count > 1 && (
                                        <Star
                                            className="w-3 h-3"
                                            style={{
                                                opacity: getStarOpacity(count),
                                            }}
                                        />
                                    )}
                                    {tag}
                                </motion.button>
                                <AnimatePresence>
                                    {hoveredTag === tag && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                x: tooltipPosition.x + 20,
                                                y: tooltipPosition.y - 20,
                                            }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{
                                                duration: 0.2,
                                                ease: 'easeOut',
                                            }}
                                            className="absolute z-[100] pointer-events-none"
                                        >
                                            <div className="bg-primary-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap font-mono">
                                                {selectedTags.has(tag)
                                                    ? 'Remove Filter'
                                                    : 'Add Filter'}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        {selectedTags.size > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                onClick={clearFilters}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-primary-500 text-primary-500 hover:bg-primary-500/10 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/10 transition-all duration-200 flex items-center gap-1"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                Clear Filters
                                <X className="w-4 h-4" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <AnimatePresence>
                        {mounted && filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                    className={`
                                        min-w-[280px] max-w-full
                                        ${
                                            project.isWide
                                                ? 'md:col-span-2 lg:col-span-2'
                                                : ''
                                        }
                                    `}
                                >
                                    {project.isWide ? (
                                        <WideProjectCard
                                            title={project.title}
                                            description={project.description}
                                            image={project.image}
                                            darkImage={project.darkImage}
                                            tags={project.technologies}
                                            link={project.link}
                                            companyName={project.companyName}
                                            tagCounts={tagCountsMap}
                                        />
                                    ) : (
                                        <ProjectCard
                                            title={project.title}
                                            description={project.description}
                                            image={project.image}
                                            darkImage={project.darkImage}
                                            tags={project.technologies}
                                            link={project.link}
                                            companyName={project.companyName}
                                            tagCounts={tagCountsMap}
                                        />
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="min-w-[280px] max-w-full"
                            >
                                <NoResultsCard />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
