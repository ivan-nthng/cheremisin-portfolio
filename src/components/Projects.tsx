'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
    title: string
    description: string
    image: string
    technologies: string[]
    github?: string
    live?: string
}

const projects: Project[] = [
    {
        title: 'Project 1',
        description:
            'A modern web application built with Next.js, TypeScript, and Tailwind CSS.',
        image: '/project1.jpg',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/username/project1',
        live: 'https://project1.com',
    },
    {
        title: 'Project 2',
        description:
            'A responsive e-commerce platform with a focus on user experience.',
        image: '/project2.jpg',
        technologies: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com/username/project2',
    },
    {
        title: 'Project 3',
        description: 'A real-time chat application with WebSocket integration.',
        image: '/project3.jpg',
        technologies: ['Vue.js', 'Express', 'Socket.io'],
        live: 'https://project3.com',
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
                            className="group relative bg-primary-100 dark:bg-primary-800 rounded-xl overflow-hidden"
                        >
                            <div className="aspect-video relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary-800 dark:text-primary-100 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-primary-600 dark:text-primary-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-sm bg-primary-200 dark:bg-primary-700 text-primary-700 dark:text-primary-200 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors"
                                        >
                                            <Github className="w-5 h-5" />
                                            <span>Code</span>
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            <span>Live</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
