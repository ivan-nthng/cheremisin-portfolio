'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import WideProjectCard from './WideProjectCard'
import NoResultsCard from './NoResultsCard'
import ComingSoonCard from './ComingSoonCard'

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
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-4 sm:gap-6 md:gap-8">
                    <AnimatePresence>
                        {mounted &&
                            projects.map((project, index) => (
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
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
