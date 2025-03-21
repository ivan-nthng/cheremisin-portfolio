'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import WideProjectCard from './WideProjectCard'

interface Project {
    title: string
    description: string
    image: string
    darkImage?: string
    technologies: string[]
    link: string
    isWide?: boolean
    companyName?: string
}

const projects: Project[] = [
    {
        title: 'Project 1',
        description:
            'A modern web application built with Next.js, TypeScript, and Tailwind CSS.',
        image: '/chat-light.png',
        darkImage: '/chat-dark.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        link: '#',
        companyName: 'Company 1',
    },
    {
        title: 'DS Hito',
        description:
            'A comprehensive data science platform that helps users analyze and visualize complex datasets with ease. Built with modern web technologies and a focus on user experience.',
        image: '/ds-hito-light.png',
        darkImage: '/ds-hito-dark.png',
        technologies: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
        link: '#',
        isWide: true,
        companyName: 'DS Hito',
    },
    {
        title: 'Project 2',
        description:
            'A responsive e-commerce platform with a focus on user experience.',
        image: '/message.png',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: '#',
        companyName: 'Company 2',
    },
    {
        title: 'Project 3',
        description: 'A real-time chat application with WebSocket integration.',
        image: '/message.png',
        technologies: ['Vue.js', 'Express', 'Socket.io'],
        link: '#',
        companyName: 'Company 3',
    },
]

export default function Projects() {
    return (
        <section
            id="projects"
            className="relative py-12 sm:py-16 md:py-24 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-8 sm:mb-12"
                >
                    Featured Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
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
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
