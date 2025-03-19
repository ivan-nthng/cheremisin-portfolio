'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Project {
    id: string
    title: string
    description: string
    image: string
    technologies: string[]
    features: string[]
    challenges: string[]
    solutions: string[]
    liveUrl?: string
    githubUrl?: string
}

const projects: Project[] = [
    {
        id: 'project-1',
        title: 'E-commerce Platform',
        description:
            'A modern e-commerce platform built with Next.js and TypeScript.',
        image: '/images/project1.jpg',
        technologies: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'MongoDB',
            'Stripe',
        ],
        features: [
            'User authentication',
            'Product catalog',
            'Shopping cart',
            'Secure payments',
            'Order tracking',
        ],
        challenges: [
            'Implementing real-time inventory updates',
            'Optimizing performance for large product catalogs',
            'Ensuring secure payment processing',
        ],
        solutions: [
            'Used WebSocket for real-time updates',
            'Implemented pagination and lazy loading',
            'Integrated Stripe payment gateway with security best practices',
        ],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/project',
    },
    // Add more projects as needed
]

const ProjectPage = () => {
    const params = useParams()
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-heading text-gray-900 dark:text-white">
                    Project not found
                </h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <Link
                href="/"
                className="inline-flex items-center font-mono text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Projects
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-heading mb-4 text-gray-900 dark:text-white">
                        {project.title}
                    </h1>
                    <p className="text-lg font-mono mb-8 text-gray-600 dark:text-gray-400">
                        {project.description}
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-heading mb-4 text-gray-900 dark:text-white">
                                Technologies Used
                            </h2>
                            <ul className="list-disc list-inside font-mono text-gray-600 dark:text-gray-400">
                                {project.technologies.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading mb-4 text-gray-900 dark:text-white">
                                Key Features
                            </h2>
                            <ul className="list-disc list-inside font-mono text-gray-600 dark:text-gray-400">
                                {project.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading mb-4 text-gray-900 dark:text-white">
                                Challenges & Solutions
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl font-heading mb-2 text-gray-900 dark:text-white">
                                        Challenges
                                    </h3>
                                    <ul className="list-disc list-inside font-mono text-gray-600 dark:text-gray-400">
                                        {project.challenges.map((challenge) => (
                                            <li key={challenge}>{challenge}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-heading mb-2 text-gray-900 dark:text-white">
                                        Solutions
                                    </h3>
                                    <ul className="list-disc list-inside font-mono text-gray-600 dark:text-gray-400">
                                        {project.solutions.map((solution) => (
                                            <li key={solution}>{solution}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {(project.liveUrl || project.githubUrl) && (
                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 font-mono bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View Live
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 font-mono border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
