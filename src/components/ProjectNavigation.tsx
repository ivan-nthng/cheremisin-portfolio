'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { type Project } from './Projects'

interface ProjectNavigationProps {
    projects: Project[]
    currentProjectIndex: number
}

export default function ProjectNavigation({
    projects,
    currentProjectIndex,
}: ProjectNavigationProps) {
    const prevProject = projects[currentProjectIndex - 1]
    const nextProject = projects[currentProjectIndex + 1]

    return (
        <nav className="flex justify-between items-center py-8">
            {prevProject ? (
                <Link
                    href={prevProject.link}
                    className="group flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                >
                    <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        ←
                    </motion.span>
                    <span className="text-sm font-medium">
                        {prevProject.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}
            {nextProject ? (
                <Link
                    href={nextProject.link}
                    className="group flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                >
                    <span className="text-sm font-medium">
                        {nextProject.title}
                    </span>
                    <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                    >
                        →
                    </motion.span>
                </Link>
            ) : (
                <div />
            )}
        </nav>
    )
}
