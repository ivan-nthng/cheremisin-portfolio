'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import WideProjectCard from './WideProjectCard'
import NoResultsCard from './NoResultsCard'
import ComingSoonCard from './ComingSoonCard'
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
    companyUrl?: string
    isComingSoon?: boolean
}

export const projects: Project[] = [
    {
        title: 'Taxi Aggregator Support Workspace',
        description:
            'A modern web application built with Next.js, TypeScript, and Tailwind CSS.',
        image: '/chat-light.png',
        darkImage: '/chat-dark.png',
        technologies: [
            'Figma',
            'Design Systems',
            'User Testing',
            'User flows',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
        ],
        link: '/projects/taxi-aggregator-support-workspace',
        companyName: 'VK',
        companyUrl: 'https://vk.com',
    },
    {
        title: 'Hito DS',
        description:
            'A comprehensive data science platform that helps users analyze and visualize complex datasets with ease. Built with modern web technologies and a focus on user experience.',
        image: '/ds-hito-light.png',
        darkImage: '/ds-hito-dark.png',
        technologies: [
            'UI Design',
            'Figma',
            'Design Systems',
            'Next.js',
            'MVP',
            'Design Handoff',
            'Product Strategy',
        ],
        link: '/projects/ds-hito',
        isWide: true,
        companyName: 'DS Hito',
        companyUrl: 'https://hitocajon.com',
    },
    {
        title: 'LitRes.com',
        description: 'An e-commerce platform and digital publisher.',
        image: '/preview-light.png',
        darkImage: '/preview-dark.png',
        technologies: [
            'UI Design',
            'Figma',
            'Design Systems',
            'Quantitative Research',
            'User Interviews',
            'Design Handoff',
            'Product Strategy',
            'Mobile-first Design',
            'A/B Testing',
            'Collaboration',
        ],
        link: '/projects/litres',
        companyName: 'Litres.com',
        companyUrl: 'https://litres.com',
    },
    {
        title: 'Peruse.ml',
        description: 'AI-powered file search and organization tool.',
        image: '/files-light.png',
        darkImage: '/files-dark.png',
        technologies: ['Next.js', 'TypeScript', 'TensorFlow.js'],
        link: '/projects/peruse',
        companyName: 'Peruse.ml',
        companyUrl: 'https://peruse.ml',
    },
    {
        title: 'Coming Soon',
        description: '',
        image: '',
        technologies: [],
        link: '#',
        isComingSoon: true,
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
            if (!project.isComingSoon) {
                project.technologies.forEach((tag) => {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
                })
            }
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
            if (!project.isComingSoon) {
                project.technologies.forEach((tag) => {
                    counts.set(tag, (counts.get(tag) || 0) + 1)
                })
            }
        })
        return counts
    }, [])

    // Filter projects based on selected tags
    const filteredProjects = React.useMemo(() => {
        if (selectedTags.size === 0) return projects
        return projects.filter(
            (project) =>
                !project.isComingSoon &&
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
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="text-base sm:text-md font-mono text-primary-600 dark:text-primary-300 mb-4"
                    >
                        Something Specific?
                    </motion.h3>

                    <div className="flex flex-wrap gap-2">
                        {allTags.map(({ tag, count }) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                onMouseEnter={(e) => {
                                    setHoveredTag(tag)
                                    handleTagMouseMove(e)
                                    setIsHovered(true)
                                }}
                                onMouseLeave={() => {
                                    setHoveredTag(null)
                                    setIsHovered(false)
                                }}
                                onMouseMove={handleTagMouseMove}
                                className={`
                                    group relative px-3 py-1.5 text-sm rounded-lg
                                    transition-all duration-300
                                    ${
                                        selectedTags.has(tag)
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                                            : 'bg-blue-50 dark:bg-blue-950 text-blue-800/60 dark:text-blue-200/60 hover:text-blue-900 dark:hover:text-blue-100'
                                    }
                                `}
                            >
                                <span className="flex items-center gap-1.5">
                                    {tag}
                                    {selectedTags.has(tag) && (
                                        <X className="w-3 h-3" />
                                    )}
                                    <Star
                                        className={`w-3 h-3 transition-opacity duration-300 ${
                                            selectedTags.has(tag)
                                                ? 'opacity-0'
                                                : `opacity-${getStarOpacity(
                                                      count,
                                                  )}`
                                        }`}
                                    />
                                </span>
                            </button>
                        ))}

                        {selectedTags.size > 0 && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1.5 text-sm rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-4 sm:gap-6 md:gap-8">
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
                                    {project.isComingSoon ? (
                                        <ComingSoonCard />
                                    ) : project.isWide ? (
                                        <WideProjectCard
                                            title={project.title}
                                            description={project.description}
                                            image={project.image}
                                            darkImage={project.darkImage}
                                            tags={project.technologies}
                                            link={project.link}
                                            companyName={project.companyName}
                                            companyUrl={project.companyUrl}
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
                                            companyUrl={project.companyUrl}
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
