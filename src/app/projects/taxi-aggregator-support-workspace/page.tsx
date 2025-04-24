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
import UIDemo from '@/components/UIDemo'
import ProjectBento from '@/components/ProjectBento'
import HitoLink from '@/components/HitoLink'
import { ContextImageSection } from '@/components/ContextImageSection'
import { ProjectFooter } from '@/components/ProjectFooter'
import { FigmaPreview } from '@/components/FigmaPreview'

export default function TaxiAggregatorSupportWorkspacePage() {
    const { theme } = useTheme()
    const [isGridVisible, setIsGridVisible] = React.useState(false)

    // Project navigation setup
    const currentProjectIndex = projects.findIndex(
        (project: Project) =>
            project.link === '/projects/taxi-aggregator-support-workspace',
    )
    const currentProject = projects[currentProjectIndex]

    // Dynamic image paths based on theme
    const mainImage =
        theme === 'dark' ? '/actions-dark.png' : '/actions-light.png'
    const forwardImage =
        theme === 'dark' ? '/forward-dark.png' : '/forward-light.png'

    // Client logo component - customize SVG and link here
    const clientLogo = {
        href: 'https://vk.com',
        svg: (
            <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-900 dark:text-blue-100 opacity-40 hover:opacity-60 transition-opacity duration-300"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.9817 0H18.0183C3.44954 0 0 3.44954 0 18.0183V33.9817C0 48.5505 3.44954 52 18.0183 52H33.9817C48.5505 52 52 48.5505 52 33.9817V18.0183C52 3.44954 48.5505 0 33.9817 0ZM41.3639 15.2034C42.5015 15.2034 42.7584 15.7906 42.5015 16.5979C42.1006 18.4485 38.7703 23.358 37.7398 24.8773C37.5442 25.1656 37.4314 25.3318 37.4373 25.3318C37.0336 25.9924 36.8868 26.286 37.4373 27.0198C37.6363 27.2913 38.0585 27.7056 38.5409 28.179C39.0368 28.6656 39.5964 29.2147 40.0428 29.7354C41.6575 31.5704 42.9052 33.1117 43.2355 34.1758C43.5291 35.2401 43.0153 35.7905 41.9144 35.7905H38.1345C37.1328 35.7905 36.6165 35.2153 35.5161 33.9893C35.0443 33.4636 34.4651 32.8183 33.6941 32.0474C31.4557 29.8822 30.4648 29.5888 29.9144 29.5888C29.1437 29.5888 28.9236 29.7722 28.9236 30.8732V34.286C28.9236 35.2034 28.63 35.7538 26.208 35.7538C22.208 35.7538 17.7676 33.3318 14.6483 28.8181C9.95106 22.2126 8.66667 17.2218 8.66667 16.2309C8.66667 15.6805 8.85016 15.1667 9.95106 15.1667H13.7676C14.7217 15.1667 15.0887 15.5703 15.4557 16.6346C17.3273 22.029 20.4465 26.763 21.7309 26.763C22.208 26.763 22.4281 26.5429 22.4281 25.3318V19.7538C22.3375 18.1684 21.7856 17.4776 21.3764 16.9654C21.1226 16.6477 20.9236 16.3986 20.9236 16.0474C20.9236 15.607 21.2905 15.1667 21.8777 15.1667H27.8226C28.63 15.1667 28.9236 15.607 28.9236 16.5611V24.0841C28.9236 24.8914 29.2538 25.185 29.5108 25.185C29.9877 25.185 30.3914 24.8914 31.2721 24.0107C33.9877 20.9649 35.9328 16.2677 35.9328 16.2677C36.1896 15.7171 36.63 15.2034 37.5841 15.2034H41.3639Z"
                    fill="currentColor"
                />
            </svg>
        ),
    }

    // Project statistics - customize metrics here
    const stats = [
        {
            value: '14m',
            label: 'Potential user base',
        },
        {
            value: '80k',
            label: 'Registered drivers',
        },
        {
            value: '16k',
            label: 'Daily drivers',
        },
        {
            value: '220k',
            label: 'Total daily rides',
        },
    ]

    // Problem section statistics - customize metrics here
    const problemStats = [
        {
            value: '220k',
            label: 'Registered drivers',
        },
        {
            value: '15k 7%',
            label: 'Support Inquiries',
        },
        {
            value: '50',
            label: 'Operators',
        },
        {
            value: '3.6k',
            label: 'Operators Daily Capacity',
        },
        {
            value: '11.4k',
            label: 'Unanswered Requests',
        },
    ]

    // Project descriptions - customize text here
    const description =
        'In a city where drivers can easily switch to another aggregator, losing a driver means losing money. And the only way to compete was through superior service. The company needed to scale without growing the team — and that meant completely rethinking the tools.'

    const problemDescription =
        'The company was operating in an extremely competitive market, where both drivers and passengers could easily switch to another platform. Since the number of drivers in the city was limited, losing them meant losing real revenue - and this often happened due to delayed or missing support responses. The support team was simply overwhelmed. There were only two options: scale the team massively - or rethink the entire system. To meet peak volume, the company would have needed nearly 200 operators - 4x the existing team.'

    const demoTitle = 'City-Wide Support System'
    const demoDescription =
        'A comprehensive support system that helps operators handle thousands of requests efficiently. The interface provides real-time insights, automated responses, and smart routing to ensure no request goes unanswered.'

    // Gallery items configuration - customize content here
    const galleryItems = [
        {
            imageLight: '/vk/initiation-light.png',
            imageDark: '/vk/initiation-dark.png',
            alt: 'Support Dashboard Overview',
            title: 'Omni-Channel Communication',
            description:
                'Support agents handle messages from all platforms — app, web, and social — in one unified workspace.',
        },
        {
            videoLight: '/vk/info-script-light.mov',
            videoDark: '/vk/info-script-dark.mov',
            alt: 'Automated Response System',
            title: 'Clarity',
            description:
                'Operators see all essential trip details upfront, with clear, AI-suggested next steps tailored to each request.',
        },
        {
            videoLight: '/vk/actions-light.mov',
            videoDark: '/vk/actions-dark.mov',
            alt: 'Automated Response System',
            title: 'AI-Powered Decision Support',
            description:
                'The only variable left is human speed — the interface surfaces all relevant data and suggestions instantly, so operators can act with confidence.',
        },
        {
            videoLight: '/vk/forward-light.mov',
            videoDark: '/vk/forward-dark.mov',
            alt: 'Automated Response System',
            title: 'Seamless Internal Collaboration',
            description:
                'Operators can quickly reassign, escalate, or annotate tickets — all within the same interface, without losing context.',
        },
        {
            videoLight: '/vk/send-light.mov',
            videoDark: '/vk/send-dark.mov',
            alt: 'Automated Response System',
            title: 'Fast, Personalized Responses',
            description:
                "AI-generated replies adapt to each operator's tone and style, enabling clear, human-like communication with customers in seconds. No attitional spredsheets.",
        },
        {
            videoLight: '/vk/call-light.mov',
            videoDark: '/vk/call-dark.mov',
            alt: 'Automated Response System',
            title: 'Voice and Chat, Unified',
            description:
                'Seamlessly manage voice calls and chat messages side by side — no switching tabs, no lost context.',
        },
        {
            videoLight: '/vk/track-light.mov',
            videoDark: '/vk/track-dark.mov',
            alt: 'Automated Response System',
            title: 'Ride Map Intelligence',
            description:
                'Quickly trace the full route of any trip — with clear context on driver and passenger movements, stops, and deto',
        },
        {
            imageLight: '/vk/media-drop-light.png',
            imageDark: '/vk/media-drop-dark.png',
            alt: 'Analytics Dashboard',
            title: 'Effortless Media Handling',
            description:
                'View, download, and respond to images, videos, and files directly within the chat — no delays, no confusion.',
            noDecor: true,
            smallImage: true,
        },
    ]

    // Process tab content - includes Overview, Problem, Optimization, and Results sections
    const processContent = (
        <div className="space-y-8">
            {/* Project Overview Section */}
            <ProjectOverview stats={stats} description={description} />

            {/* Problem Analysis Section */}
            <ProblemSection
                stats={problemStats}
                description={problemDescription}
            />

            {/* Optimization Strategy Section */}
            <OptimizationSection />

            {/* Project Highlights Section */}
            <ProjectBento />

            {/* Results Section with Statistics */}
            <section className="w-full py-16 sm:py-24">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    {/* Left Column - Content */}
                    <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-center space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-blue-900 dark:text-blue-100">
                            Results
                        </h2>
                        <p className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80">
                            By optimizing the interface and automating routine
                            tasks, we achieved significant improvements in
                            operator efficiency and response times.
                        </p>
                    </div>

                    {/* Right Column - Table */}
                    <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-7 flex items-center">
                        <div className="w-full overflow-hidden rounded-2xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-100/50 dark:bg-blue-900/50">
                                        <th className="px-6 py-4 text-left text-sm text-blue-900 dark:text-blue-100">
                                            Metric
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm text-blue-900 dark:text-blue-100">
                                            Before
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm text-blue-900 dark:text-blue-100">
                                            After
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm text-blue-900 dark:text-blue-100">
                                            Improvement
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Daily Requests Handled
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            3,600
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            9,000
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +150%
                                        </td>
                                    </tr>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Avg. Requests per Operator
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            72
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            180
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +150%
                                        </td>
                                    </tr>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Failed Requests ({'>'}60s wait)
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            28%
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            6%
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            -79%
                                        </td>
                                    </tr>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Unanswered Requests
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            15,600+
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            Under 1,000
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            -94%
                                        </td>
                                    </tr>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Required Operators
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            ~200
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            50 (same team)
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            -75%
                                        </td>
                                    </tr>
                                    <tr className="border-b border-blue-200/20 dark:border-blue-800/20 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Resolution Rate
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            --
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +35%
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +35%
                                        </td>
                                    </tr>
                                    <tr className="transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                                        <td className="px-6 py-4 text-sm text-blue-800 dark:text-blue-200">
                                            Customer Satisfaction
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            --
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +21% CSAT, +23 NPS
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-mono text-blue-800 dark:text-blue-200">
                                            +22% avg
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* Process Tab Footer */}
            <ProjectFooter
                team={[
                    { role: 'Design' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'Business Analyst' },
                    { role: 'UX Researcher' },
                ]}
                technologies={currentProject.technologies}
                email="ivan@cheremisin.co.uk"
                linkedin="https://www.linkedin.com/in/icheremisin/"
                github="https://github.com/ivan-nthng"
                instagram="https://www.instagram.com/cheremisin.co.uk/"
                bookingLink="https://calendly.com/icheremisin/30min"
            />
        </div>
    )

    // Results tab content - includes Demo, Gallery, and Context sections
    const resultContent = (
        <div className="space-y-8">
            {/* Demo Section */}
            <DemoSection
                title={demoTitle}
                description={demoDescription}
                image="vk/demo"
                caption="A comprehensive support system that helps operators handle thousands of requests efficiently."
            />

            {/* Gallery Section */}
            <GallerySection items={galleryItems} />

            {/* Context Section */}
            <ContextImageSection
                lightImage="/vk/context-light@2x.png"
                darkImage="/vk/context-dark@2x.png"
                header="Context-Aware Support"
                description="The system automatically surfaces relevant trip details, driver history, and previous interactions, enabling operators to provide personalized support without manual research."
                alt="Context-Aware Support Interface"
            />

            {/* Results Tab Footer */}
            <ProjectFooter
                team={[
                    { role: 'QA' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'Business Analyst' },
                    { role: 'PM' },
                ]}
                technologies={currentProject.technologies}
                email="ivan@cheremisin.co.uk"
                linkedin="https://www.linkedin.com/in/icheremisin/"
                github="https://github.com/ivan-nthng"
                instagram="https://www.instagram.com/cheremisin.co.uk/"
                bookingLink="https://calendly.com/icheremisin/30min"
            />
        </div>
    )

    // Development tab content - includes Component Library and Figma Preview
    const devContent = (
        <div className="space-y-8">
            {/* Component Library Section */}
            <section className="space-y-8 sm:space-y-12">
                <div className="space-y-4 py-16 xl:w-1/2 lg:w-2/3">
                    <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-blue-900 dark:text-blue-100">
                        Component Library
                    </h2>
                    <p className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80 font-mono">
                        The project was developed using a component-first
                        approach, leveraging the <HitoLink /> — a scalable,
                        semantic token-based system optimized for clarity and
                        responsiveness.
                    </p>
                </div>
                <UIDemo />
            </section>

            {/* Figma Preview Section */}
            <FigmaPreview
                embedUrl="https://embed.figma.com/design/a1FIpM2QJ0y79EO170WQDG/CityMobil-Preview?embed-host=share"
                title="Figma Demo File"
                description="This Figma file is shared for preview purposes only. It includes a partial look at the design system: some components, applied variables, and a fragment of the interface. It's not a complete or production-ready file — just a snapshot to give you a feel for the structure and logic behind the system."
            />

            {/* Dev Tab Footer */}
            <ProjectFooter
                team={[
                    { role: 'Design' },
                    { role: 'Front-end Engineer' },
                    { role: 'Back-end Engineer' },
                    { role: 'Business Analyst' },
                    { role: 'UX Researcher' },
                ]}
                technologies={currentProject.technologies}
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
            {/* Grid Overlay Toggle */}
            <GridOverlay show={isGridVisible} />

            {/* Main Content */}
            <main className="relative">
                {/* Header with Grid Toggle */}
                <ProjectHeader
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />

                {/* Content Container */}
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                        {/* Hero Section */}
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <ProjectHero
                                title="Taxi Aggregator Support Workspace"
                                description="A unified, context-aware interface designed for speed and clarity — helping operators resolve issues faster, with less stress and zero guesswork."
                                mainImage="/actions-light.png"
                                mainImageDark="/actions-dark.png"
                                forwardImage="/forward-light.png"
                                forwardImageDark="/forward-dark.png"
                                clientLogo={clientLogo}
                            />
                        </div>

                        {/* Tab Section - Process, Results, Dev */}
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <TabSection
                                processContent={processContent}
                                resultContent={resultContent}
                                devContent={devContent}
                            />
                        </div>

                        {/* Project Navigation */}
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
