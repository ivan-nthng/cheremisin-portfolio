'use client'

import React from 'react'
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
import { projects, type Project } from '@/components/Projects'

export default function HitoDSPage() {
    const { theme } = useTheme()
    const [isGridVisible, setIsGridVisible] = React.useState(false)

    // Find the current project index
    const currentProjectIndex = projects.findIndex(
        (project: Project) => project.link === '/projects/ds-hito',
    )

    const mainImage =
        theme === 'dark' ? '/hito/main-dark.png' : '/hito/main-light.png'
    const forwardImage =
        theme === 'dark' ? '/hito/forward-dark.png' : '/hito/forward-light.png'

    const clientLogo = {
        href: 'https://example.com',
        svg: (
            <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-900 dark:text-blue-100 opacity-40 hover:opacity-60 transition-opacity duration-300"
            >
                {/* Placeholder SVG - replace with actual logo */}
                <rect width="52" height="52" rx="8" fill="currentColor" />
            </svg>
        ),
    }

    const stats = [
        {
            value: '0',
            label: 'Placeholder Stat 1',
        },
        {
            value: '0',
            label: 'Placeholder Stat 2',
        },
        {
            value: '0',
            label: 'Placeholder Stat 3',
        },
        {
            value: '0',
            label: 'Placeholder Stat 4',
        },
    ]

    const problemStats = [
        {
            value: '0',
            label: 'Placeholder Problem Stat 1',
        },
        {
            value: '0',
            label: 'Placeholder Problem Stat 2',
        },
        {
            value: '0',
            label: 'Placeholder Problem Stat 3',
        },
        {
            value: '0',
            label: 'Placeholder Problem Stat 4',
        },
        {
            value: '0',
            label: 'Placeholder Problem Stat 5',
        },
    ]

    const description =
        'Placeholder description for the Hito DS project. Replace with actual project description.'

    const problemDescription =
        'Placeholder problem description for the Hito DS project. Replace with actual problem description.'

    const demoTitle = 'Placeholder Demo Title'
    const demoDescription =
        'Placeholder demo description for the Hito DS project. Replace with actual demo description.'

    const galleryItems = [
        {
            imageLight: '/hito/gallery1-light.png',
            imageDark: '/hito/gallery1-dark.png',
            alt: 'Placeholder Gallery Item 1',
            title: 'Placeholder Title 1',
            description:
                'Placeholder description for gallery item 1. Replace with actual description.',
        },
        {
            imageLight: '/hito/gallery2-light.png',
            imageDark: '/hito/gallery2-dark.png',
            alt: 'Placeholder Gallery Item 2',
            title: 'Placeholder Title 2',
            description:
                'Placeholder description for gallery item 2. Replace with actual description.',
        },
        {
            imageLight: '/hito/gallery3-light.png',
            imageDark: '/hito/gallery3-dark.png',
            alt: 'Placeholder Gallery Item 3',
            title: 'Placeholder Title 3',
            description:
                'Placeholder description for gallery item 3. Replace with actual description.',
        },
    ]

    const processContent = (
        <div className="space-y-8">
            <ProjectOverview stats={stats} description={description} />
            <ProblemSection
                stats={problemStats}
                description={problemDescription}
            />
            <OptimizationSection />
        </div>
    )

    const resultContent = (
        <div className="space-y-8">
            <DemoSection
                title={demoTitle}
                description={demoDescription}
                image="demo"
                caption="Placeholder caption for the demo section. Replace with actual caption."
            />
            <GallerySection items={galleryItems} />
        </div>
    )

    const devContent = (
        <div className="space-y-8">
            <GallerySection
                items={[
                    {
                        imageLight: '',
                        imageDark: '',
                        alt: 'Placeholder 1',
                        title: 'Placeholder 1',
                        description: 'Content coming soon',
                        neutral: true,
                    },
                    {
                        imageLight: '',
                        imageDark: '',
                        alt: 'Placeholder 2',
                        title: 'Placeholder 2',
                        description: 'Content coming soon',
                        neutral: true,
                    },
                ]}
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
                            <ProjectHero
                                title="Hito DS"
                                description="Placeholder description for the Hito DS project. Replace with actual project description."
                                mainImage="/hito/main-light.png"
                                mainImageDark="/hito/main-dark.png"
                                forwardImage="/hito/forward-light.png"
                                forwardImageDark="/hito/forward-dark.png"
                                clientLogo={clientLogo}
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
