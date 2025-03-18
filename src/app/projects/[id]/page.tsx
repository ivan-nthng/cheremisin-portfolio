'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const projects = [
    {
        id: 1,
        title: 'Project One',
        description:
            'A beautiful web application built with Next.js and Tailwind CSS',
        longDescription: `This project showcases the power of modern web technologies. Built with Next.js and Tailwind CSS, it demonstrates best practices in web development and responsive design.

Key features:
• Responsive design that works on all devices
• Optimized performance with Next.js
• Beautiful animations with Framer Motion
• Dark mode support
• SEO optimized

The project was developed with a focus on user experience and performance, resulting in a fast and engaging web application.`,
        image: 'https://source.unsplash.com/random/1920x1080?website',
        technologies: [
            'Next.js',
            'Tailwind CSS',
            'Framer Motion',
            'TypeScript',
        ],
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'An innovative mobile app with a modern design',
        longDescription: `This mobile application represents the future of user interface design. With its modern and intuitive interface, it provides a seamless user experience.

Key features:
• Native-like performance
• Offline support
• Push notifications
• Biometric authentication
• Real-time updates

The app was designed with a focus on accessibility and user engagement, making it easy to use for everyone.`,
        image: 'https://source.unsplash.com/random/1920x1080?mobile',
        technologies: ['React Native', 'Redux', 'Firebase', 'TypeScript'],
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'A responsive e-commerce platform',
        longDescription: `This e-commerce platform combines powerful features with an elegant design to create a seamless shopping experience.

Key features:
• Secure payment processing
• Real-time inventory management
• Advanced search and filtering
• User reviews and ratings
• Order tracking

The platform was built with scalability in mind, ensuring it can handle high traffic and large product catalogs.`,
        image: 'https://source.unsplash.com/random/1920x1080?shop',
        technologies: ['Next.js', 'Stripe', 'MongoDB', 'Node.js'],
    },
]

const ProjectPage = () => {
    const params = useParams()
    const projectId = parseInt(params.id as string)
    const project = projects.find((p) => p.id === projectId)
    const currentIndex = projects.findIndex((p) => p.id === projectId)
    const nextProject = projects[(currentIndex + 1) % projects.length]

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                            Portfolio
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-16 h-screen overflow-y-auto p-8 bg-gray-50 dark:bg-gray-800"
                    >
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {project.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 whitespace-pre-line">
                                {project.longDescription}
                            </p>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Technologies Used
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link
                                href={`/projects/${nextProject.id}`}
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Next Project: {nextProject.title}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-screen"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
