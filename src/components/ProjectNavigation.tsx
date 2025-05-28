'use client'

import React from 'react'
import { motion } from 'framer-motion'
import WideProjectCard from './WideProjectCard'
import { type Project } from './Projects'

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

    // Get previous and next projects
    const prevProject = navigableProjects[prevIndex]
    const nextProject = navigableProjects[nextIndex]

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="w-full space-y-4 py-8"
        >
            <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4"
            >
                More Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Previous Project */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-medium text-primary-600 dark:text-primary-300 mb-2">
                        Previous Project
                    </h3>
                    <div className="group cursor-pointer">
                        <div className="transition-all duration-300 group-hover:brightness-90">
                            <WideProjectCard
                                title={prevProject.title}
                                description={prevProject.description}
                                image={prevProject.image || ''}
                                darkImage={prevProject.darkImage}
                                tags={[]}
                                link={prevProject.link}
                                companyName=""
                                companyUrl=""
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Next Project */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-medium text-primary-600 dark:text-primary-300 mb-2">
                        Next Project
                    </h3>
                    <div className="group cursor-pointer">
                        <div className="transition-all duration-300 group-hover:brightness-90">
                            <WideProjectCard
                                title={nextProject.title}
                                description={nextProject.description}
                                image={nextProject.image || ''}
                                darkImage={nextProject.darkImage}
                                tags={[]}
                                link={nextProject.link}
                                companyName=""
                                companyUrl=""
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
