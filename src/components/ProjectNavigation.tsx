'use client'

import React from 'react'
import { motion } from 'framer-motion'
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
    isComingSoon?: boolean
}

interface ProjectNavigationProps {
    projects: Project[]
    currentProjectIndex: number
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
}

export default function ProjectNavigation({
    projects,
    currentProjectIndex,
}: ProjectNavigationProps) {
    // Filter out ComingSoon projects for navigation only
    const navigableProjects = projects.filter((p) => !p.isComingSoon)
    // Find the current project's index in the filtered array
    const currentNavIndex = navigableProjects.findIndex(
        (p) => p.link === projects[currentProjectIndex].link,
    )
    // Calculate previous and next indices with circular navigation
    const prevIndex =
        (currentNavIndex - 1 + navigableProjects.length) %
        navigableProjects.length
    const nextIndex = (currentNavIndex + 1) % navigableProjects.length

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="w-full space-y-8 py-16"
        >
            <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-8"
            >
                More Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Previous Project */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <h3 className="text-lg font-medium text-primary-600 dark:text-primary-300 mb-4">
                        Previous Project
                    </h3>
                    <div className="group cursor-pointer">
                        <div className="transition-all duration-300 group-hover:brightness-90">
                            <WideProjectCard
                                {...navigableProjects[prevIndex]}
                                tags={[]}
                                companyName=""
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Next Project */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <h3 className="text-lg font-medium text-primary-600 dark:text-primary-300 mb-4">
                        Next Project
                    </h3>
                    <div className="group cursor-pointer">
                        <div className="transition-all duration-300 group-hover:brightness-90">
                            <WideProjectCard
                                {...navigableProjects[nextIndex]}
                                tags={[]}
                                companyName=""
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
