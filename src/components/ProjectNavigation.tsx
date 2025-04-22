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
    // Calculate previous and next indices with circular navigation
    const prevIndex =
        (currentProjectIndex - 1 + projects.length) % projects.length
    const nextIndex = (currentProjectIndex + 1) % projects.length

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="w-full space-y-8 py-16"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
                {/* Previous Project */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <h3 className="text-lg font-medium text-primary-600 dark:text-primary-300 mb-4">
                        Previous Project
                    </h3>
                    <div className="group cursor-pointer">
                        <div className="transition-all duration-300 group-hover:brightness-90">
                            <WideProjectCard
                                {...projects[prevIndex]}
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
                                {...projects[nextIndex]}
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
