'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import ProjectHero from '@/components/ProjectHero'
import ProjectHeader from '@/components/ProjectHeader'
import ProjectOverview from '@/components/ProjectOverview'
import ProblemSection from '@/components/ProblemSection'
import DemoSection from '@/components/DemoSection'
import GridOverlay from '@/components/GridOverlay'
import TabSection from '@/components/TabSection'
import OptimizationSection from '@/components/OptimizationSection'
import { GallerySection } from '@/components/GallerySection'
import ProjectNavigation from '@/components/ProjectNavigation'
import { projects } from '@/components/Projects'
import UIDemo from '@/components/UIDemo'
import ProjectBento from '@/components/ProjectBento'
import { ContextImageSection } from '@/components/ContextImageSection'
import { ProjectFooter } from '@/components/ProjectFooter'

export default function PerusePage() {
    const { theme } = useTheme()
    const [isGridVisible, setIsGridVisible] = useState(false)

    // Find current project index for navigation
    const currentProjectIndex = projects.findIndex(
        (p) => p.link === '/projects/peruse',
    )

    // TODO: Update these with actual content
    const demoTitle = 'Intelligent File Organization'
    const demoDescription =
        'Peruse.ml uses AI to automatically organize and tag your files, making them instantly searchable and accessible.'

    // TODO: Update with actual gallery items
    const galleryItems = [
        {
            imageLight: '/peruse/feature1-light.png',
            imageDark: '/peruse/feature1-dark.png',
            alt: 'Smart File Organization',
            title: 'Smart Organization',
            description:
                'Files are automatically categorized and tagged based on their content.',
            neutral: true,
        },
        {
            imageLight: '/peruse/feature2-light.png',
            imageDark: '/peruse/feature2-dark.png',
            alt: 'Natural Language Search',
            title: 'Natural Search',
            description:
                'Find files using natural language - just describe what you are looking for.',
        },
        {
            imageLight: '/peruse/feature3-light.png',
            imageDark: '/peruse/feature3-dark.png',
            alt: 'File Analytics',
            title: 'Smart Analytics',
            description:
                'Get insights about your file usage and organization patterns.',
        },
    ]

    const processContent = (
        <div className="space-y-8">
            {/* TODO: Replace with actual process content */}
            <ProjectOverview
                problem="Managing large collections of files is time-consuming and error-prone."
                solution="AI-powered file organization that understands file content and context."
                impact="50% reduction in time spent searching for files, improved team collaboration."
            />
            <ProblemSection
                title="The Challenge"
                description="Traditional file systems rely on manual organization, leading to inconsistent structures and difficulty finding files."
                image="/peruse/problem-light.png"
                imageDark="/peruse/problem-dark.png"
            />
            <OptimizationSection
                items={[
                    {
                        title: 'Smart Categorization',
                        description:
                            'Files are automatically analyzed and categorized based on their content.',
                    },
                    {
                        title: 'Natural Language Search',
                        description:
                            'Find files by describing what you are looking for in plain English.',
                    },
                    {
                        title: 'Usage Analytics',
                        description:
                            'Understand how your files are used and optimize your workflow.',
                    },
                ]}
            />
            <ProjectFooter
                team={[
                    { role: 'Design' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'ML Engineer' },
                ]}
                technologies={[
                    { name: 'Next.js' },
                    { name: 'TypeScript' },
                    { name: 'TensorFlow.js' },
                    { name: 'Tailwind CSS' },
                    { name: 'Framer Motion' },
                    { name: 'Node.js' },
                    { name: 'PostgreSQL' },
                ]}
                email="ivan@cheremisin.co.uk"
                linkedin="https://www.linkedin.com/in/icheremisin/"
                github="https://github.com/ivan-nthng"
                instagram="https://www.instagram.com/cheremisin.co.uk/"
                bookingLink="https://calendly.com/icheremisin/30min"
            />
        </div>
    )

    const resultContent = (
        <div className="space-y-8">
            <DemoSection
                title={demoTitle}
                description={demoDescription}
                image="peruse/demo"
                caption="AI-powered file organization that makes finding files effortless."
            />
            <GallerySection items={galleryItems} />
            <ContextImageSection
                lightImage="/peruse/context-light.png"
                darkImage="/peruse/context-dark.png"
                header="Context-Aware Organization"
                description="The system understands file relationships and automatically creates meaningful connections between related files."
                alt="Context-Aware File Organization Interface"
            />
            <ProjectFooter
                team={[
                    { role: 'Design' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'ML Engineer' },
                ]}
                technologies={[
                    { name: 'Next.js' },
                    { name: 'TypeScript' },
                    { name: 'TensorFlow.js' },
                    { name: 'Tailwind CSS' },
                    { name: 'Framer Motion' },
                    { name: 'Node.js' },
                    { name: 'PostgreSQL' },
                ]}
                email="ivan@cheremisin.co.uk"
                linkedin="https://www.linkedin.com/in/icheremisin/"
                github="https://github.com/ivan-nthng"
                instagram="https://www.instagram.com/cheremisin.co.uk/"
                bookingLink="https://calendly.com/icheremisin/30min"
            />
        </div>
    )

    const devContent = (
        <div className="space-y-8">
            {/* TODO: Replace with actual development content */}
            <ProjectBento
                items={[
                    {
                        title: 'Machine Learning Pipeline',
                        description:
                            'Built with TensorFlow.js for client-side file analysis and categorization.',
                        image: '/peruse/ml-light.png',
                        imageDark: '/peruse/ml-dark.png',
                    },
                    {
                        title: 'Search Engine',
                        description:
                            'Natural language processing for intuitive file search.',
                        image: '/peruse/search-light.png',
                        imageDark: '/peruse/search-dark.png',
                    },
                    {
                        title: 'Analytics Dashboard',
                        description:
                            'Real-time insights into file organization and usage patterns.',
                        image: '/peruse/analytics-light.png',
                        imageDark: '/peruse/analytics-dark.png',
                    },
                ]}
            />
            <ProjectFooter
                team={[
                    { role: 'Design' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'ML Engineer' },
                ]}
                technologies={[
                    { name: 'Next.js' },
                    { name: 'TypeScript' },
                    { name: 'TensorFlow.js' },
                    { name: 'Tailwind CSS' },
                    { name: 'Framer Motion' },
                    { name: 'Node.js' },
                    { name: 'PostgreSQL' },
                ]}
                email="ivan@cheremisin.co.uk"
                linkedin="https://www.linkedin.com/in/icheremisin/"
                github="https://github.com/ivan-nthng"
                instagram="https://www.instagram.com/cheremisin.co.uk/"
                bookingLink="https://calendly.com/icheremisin/30min"
            />
        </div>
    )

    return (
        <>
            <GridOverlay show={isGridVisible} />
            <main className="relative">
                <ProjectHeader
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            {/* TODO: Update with actual hero content */}
                            <ProjectHero
                                title="Peruse.ml"
                                description="AI-powered file organization that understands your content and makes finding files effortless."
                                mainImage="/peruse/hero-light.png"
                                mainImageDark="/peruse/hero-dark.png"
                                forwardImage="/peruse/forward-light.png"
                                forwardImageDark="/peruse/forward-dark.png"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <TabSection
                                processContent={processContent}
                                resultContent={resultContent}
                                devContent={devContent}
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <ProjectNavigation
                                projects={projects}
                                currentProjectIndex={currentProjectIndex}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
