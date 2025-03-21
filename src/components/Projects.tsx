'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

interface Project {
    title: string
    description: string
    image: string
    technologies: string[]
    link: string
}

const projects: Project[] = [
    {
        title: 'Project 1',
        description:
            'A modern web application built with Next.js, TypeScript, and Tailwind CSS.',
        image: '/message.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        link: '#',
    },
    {
        title: 'Project 2',
        description:
            'A responsive e-commerce platform with a focus on user experience.',
        image: '/message.png',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: '#',
    },
    {
        title: 'Project 3',
        description: 'A real-time chat application with WebSocket integration.',
        image: '/message.png',
        technologies: ['Vue.js', 'Express', 'Socket.io'],
        link: '#',
    },
]

export default function Projects() {
    return (
        <section
            id="projects"
            className="relative py-24 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-12"
                >
                    Featured Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                            }}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                tags={project.technologies}
                                link={project.link}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
