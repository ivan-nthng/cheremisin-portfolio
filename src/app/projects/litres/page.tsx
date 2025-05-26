'use client'

/**
 * Litres Project Page Component
 *
 * A comprehensive showcase page for the Litres.com project, featuring:
 * - Project hero section with theme-aware images
 * - Interactive grid overlay for layout visualization
 * - Tabbed sections for process, results, and development details
 * - Responsive grid layout system
 * - Project navigation for seamless browsing
 *
 * The page is organized into distinct sections:
 * 1. Hero Section: Project introduction and branding
 * 2. Process Section: Project overview, problem analysis, and optimizations
 * 3. Results Section: Demo showcase and feature gallery
 * 4. Development Section: Technical details and implementation
 */

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
import { ProjectFooter } from '@/components/ProjectFooter'

export default function LitresPage() {
    // Theme context for handling light/dark mode
    const { theme } = useTheme()
    // State for toggling the grid overlay visualization
    const [isGridVisible, setIsGridVisible] = React.useState(false)

    // Project identification and current context
    const currentProjectIndex = projects.findIndex(
        (p) => p.link === '/projects/litres',
    )
    const currentProject = projects[currentProjectIndex]

    // =============================================
    // Project Data and Configuration
    // =============================================

    /**
     * Theme-aware image paths
     * Automatically switches between light and dark versions based on the current theme
     */
    const mainImage =
        theme === 'dark' ? '/litres/≈' : '/litres/project-1-light.png'
    const forwardImage =
        theme === 'dark'
            ? '/litres/project-1-dark.png'
            : '/litres/project-1-light.png'

    /**
     * Client branding configuration
     * Includes:
     * - External link to client website
     * - SVG logo with theme-aware colors
     * - Interactive hover states
     */
    const clientLogo = {
        href: 'https://litres.com',
        svg: (
            <svg
                width="173"
                height="28"
                viewBox="0 0 173 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-900 dark:text-blue-100 opacity-40 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
            >
                <path
                    d="M0 23.9392H24.4188V18.9222H6.30679V1.33057H0V23.9392Z"
                    fill="currentColor"
                />
                <path
                    d="M118.88 24.5C125.994 24.5 130.795 22.2226 130.795 17.9654C130.795 14.5331 128.564 12.6182 124.027 12.1236C122.219 11.893 117.495 11.893 116.764 11.827C115.188 11.761 114.341 11.3648 114.341 10.4404C114.341 8.9553 116.918 8.7897 118.995 8.7897C122.44 8.7897 127.698 9.55518 129.558 10.2602C129.651 10.296 129.756 10.2345 129.756 10.1461V5.7199C127.756 4.92755 122.302 4.4329 118.763 4.4329C113.725 4.4329 108.573 5.984 108.573 10.737C108.573 14.2354 110.842 16.1827 115.649 16.4143C117.726 16.5128 118.995 16.5464 120.072 16.5464C121.841 16.6124 124.719 16.7109 124.719 18.2296C124.719 19.5826 122.033 20.0784 118.956 20.0784C115.296 20.0784 110.749 19.1942 108.83 18.2161C108.733 18.1669 108.611 18.224 108.611 18.3202V22.9489C110.688 23.8073 114.687 24.5 118.878 24.5H118.88Z"
                    fill="#FF5500"
                />
                <path
                    d="M105.5 14.764C105.5 7.6015 100.347 4.466 93.003 4.466C85.0038 4.466 80.159 8.2285 80.159 14.3681C80.159 21.9267 85.6196 24.4351 93.58 24.4351C98.3873 24.4351 102.193 23.7748 104.809 22.884V18.3C104.809 18.2082 104.697 18.1489 104.6 18.1903C102.704 18.9995 98.3586 19.9787 93.657 19.9787C89.4925 19.9787 86.8456 18.8204 86.2732 15.9845H105.346C105.462 15.5884 105.5 15.1601 105.5 14.764ZM93.003 8.7565C96.7829 8.7565 98.8443 10.2058 99.5705 12.3209H86.3895C87.0244 10.0334 89.0301 8.7565 93.003 8.7565Z"
                    fill="#FF5500"
                />
                <path
                    d="M76.306 4.4331C72.1963 4.38945 70.1375 5.071 68.5715 7.7782V4.9614H62.8032V23.9394H68.7254V14.1952C69.0266 10.8199 70.3239 9.4165 74.7297 9.4165C75.9553 9.4165 77.3244 9.5396 78.9073 9.75671C78.9946 9.76902 79.0755 9.71195 79.0755 9.63585V4.56505C78.5761 4.46656 76.9606 4.4331 76.306 4.4331Z"
                    fill="#FF5500"
                />
                <path
                    d="M50.88 24.236C53.7642 24.236 56.763 23.8073 58.6093 23.4112V18.6269C58.6093 18.5441 58.5154 18.4847 58.4229 18.5082C56.5779 18.9906 54.9246 19.5166 51.6871 19.5166C47.9959 19.5166 47.649 18.2296 47.649 14.5991V9.4836H57.878V4.9623H47.649V1.0196C47.649 0.94238 47.5669 0.884182 47.4782 0.898732L41.766 1.86007V4.96227H36.4593V9.48357H41.766V15.6231C41.766 22.6199 44.8809 24.2382 50.88 24.2382V24.236Z"
                    fill="currentColor"
                />
                <path
                    d="M30.264 5.5442C32.1543 5.5442 33.6867 4.3031 33.6867 2.7721C33.6867 1.2411 32.1543 0 30.264 0C28.3738 0 26.8414 1.2411 26.8414 2.7721C26.8414 4.3031 28.3738 5.5442 30.264 5.5442Z"
                    fill="currentColor"
                />
                <path
                    d="M33.225 7.3696H27.3028V23.9386H33.225V7.3696Z"
                    fill="currentColor"
                />
                <path
                    d="M145.93 4.943C145.763 4.943 145.716 5.03141 145.834 5.13325C146.483 5.69058 146.886 6.46055 146.886 7.31445C146.886 8.16835 146.484 8.93385 145.839 9.49115C145.714 9.5997 145.754 9.68476 145.989 9.68476H159.887C160.674 9.11848 161.179 8.26686 161.179 7.31336C161.179 6.35986 160.674 5.50816 159.885 4.94196H145.929L145.93 4.943Z"
                    fill="currentColor"
                />
                <path
                    d="M145.93 12.07C145.763 12.07 145.716 12.1584 145.834 12.2602C146.483 12.8176 146.886 13.5875 146.886 14.4414C146.886 15.2953 146.484 16.0608 145.839 16.6181C145.714 16.7267 145.754 16.8117 145.989 16.8117H154.47C155.258 16.2455 155.763 15.3938 155.763 14.4403C155.763 13.4868 155.258 12.6351 154.469 12.0689H145.929L145.93 12.07Z"
                    fill="currentColor"
                />
                <path
                    d="M145.93 19.196C145.753 19.196 145.713 19.2822 145.839 19.3896C146.485 19.947 146.886 20.7147 146.886 21.5675C146.886 22.4202 146.484 23.1869 145.839 23.7442C145.713 23.8527 145.754 23.9378 145.989 23.9378H149.054C149.841 23.3715 150.346 22.5199 150.346 21.5664C150.346 20.6129 149.841 19.7612 149.053 19.1949H145.93V19.196Z"
                    fill="currentColor"
                />
                <path
                    d="M171.08 4.9443H167.35C168.138 5.51058 168.642 6.36 168.643 7.3157C168.643 8.27144 168.138 9.1209 167.35 9.6871H171.08C171.869 9.12194 172.373 8.2714 172.373 7.3157C172.373 6.35997 171.869 5.5105 171.08 4.9443Z"
                    fill="#FF5500"
                />
                <path
                    d="M167.35 4.9443H163.62C164.409 5.51058 164.912 6.36 164.914 7.3157C164.914 8.27144 164.409 9.1209 163.62 9.6871H167.35C168.139 9.12194 168.644 8.2714 168.644 7.3157C168.644 6.35997 168.139 5.5105 167.35 4.9443Z"
                    fill="#6B6BEB"
                />
                <path
                    d="M171.08 12.07H161.934C162.722 12.6363 163.226 13.4857 163.227 14.4415C163.227 15.3972 162.722 16.2466 161.934 16.8129H171.08C171.869 16.2477 172.374 15.3972 172.374 14.4415C172.374 13.4857 171.869 12.6363 171.08 12.07Z"
                    fill="#FF5500"
                />
                <path
                    d="M161.93 12.07H158.199C158.988 12.6363 159.491 13.4857 159.493 14.4415C159.493 15.3972 158.988 16.2466 158.199 16.8129H161.93C162.718 16.2477 163.223 15.3972 163.223 14.4415C163.223 13.4857 162.718 12.6363 161.93 12.07Z"
                    fill="#6B6BEB"
                />
                <path
                    d="M163.62 4.9443H159.89C160.679 5.51058 161.182 6.36 161.183 7.3157C161.183 8.27144 160.679 9.1209 159.89 9.6871H163.62C164.409 9.12194 164.913 8.2714 164.913 7.3157C164.913 6.35997 164.409 5.5105 163.62 4.9443Z"
                    fill="#5050B3"
                />
                <path
                    d="M158.2 12.07H154.47C155.258 12.6363 155.762 13.4857 155.763 14.4415C155.763 15.3972 155.258 16.2466 154.47 16.8129H158.2C158.989 16.2477 159.493 15.3972 159.493 14.4415C159.493 13.4857 158.989 12.6363 158.2 12.07Z"
                    fill="#5050B3"
                />
                <path
                    d="M171.08 19.196H156.516C157.304 19.7623 157.808 20.6117 157.809 21.5674C157.809 22.5232 157.304 23.3726 156.516 23.9389H171.08C171.869 23.3737 172.373 22.5232 172.373 21.5674C172.373 20.6117 171.869 19.7623 171.08 19.196Z"
                    fill="#FF5500"
                />
                <path
                    d="M156.52 19.196H152.79C153.579 19.7623 154.082 20.6117 154.084 21.5674C154.084 22.5232 153.579 23.3726 152.79 23.9389H156.52C157.309 23.3737 157.814 22.5232 157.814 21.5674C157.814 20.6117 157.309 19.7623 156.52 19.196Z"
                    fill="#6B6BEB"
                />
                <path
                    d="M152.78 19.196H149.05C149.839 19.7623 150.342 20.6117 150.343 21.5674C150.343 22.5232 149.839 23.3726 149.05 23.9389H152.78C153.569 23.3737 154.073 22.5232 154.073 21.5674C154.073 20.6117 153.569 19.7623 152.78 19.196Z"
                    fill="#5050B3"
                />
            </svg>
        ),
    }

    /**
     * Project performance metrics
     * Key statistics and data points showcasing project impact
     * TODO: Replace placeholder values with actual metrics
     */
    const stats = [
        {
            value: '+22.5%',
            label: 'Authors growt in the first half of 2020',
        },
        {
            value: '9.5M',
            label: 'Books sold in the first 6 months of 2020',
        },
        {
            value: '92%',
            label: 'Revenue increase driven by self-publishing',
        },
        {
            value: '500+',
            label: 'Partner publishers on the platform',
        },
    ]

    /**
     * Problem analysis metrics
     * Quantitative data points illustrating project challenges
     * TODO: Replace placeholder values with actual metrics
     */
    const problemStats = [
        {
            value: '281K+',
            label: 'Registered independent authors in 2024',
        },
        {
            value: '500+',
            label: 'Partner publishing houses',
        },
        {
            value: '92%',
            label: 'Revenue growth from self-publishing in 2020',
        },
        {
            value: '0',
            label: 'Tools for managing assets and sales for publishers and authors',
        },
    ]

    /**
     * Project content and descriptions
     * Core narrative elements describing the project's context and achievements
     * TODO: Replace placeholder text with actual project content
     */
    const description =
        "LitRes is Russia's leading platform for eBooks and audiobooks, connecting readers, authors, and publishers. In 2020, self-publishing revenue nearly doubled as author growth accelerated. The platform keeps expanding its publisher network, offering a unified space for digital distribution."
    const problemDescription =
        'LitRes was scaling fast — but its infrastructure lagged behind.\n\n' +
        'Authors struggled to manage growing portfolios, lacking tools for sales analytics, promo tools, or bulk editing.\n\n' +
        "Publishers couldn't track performance across multiple titles or authors, and manual processes led to lost revenue opportunities.\n\n" +
        'As author and publisher counts grew, the lack of scalable, data-driven dashboards became a bottleneck to further expansion.'
    const demoTitle = 'A smart dashboard'
    const demoDescription =
        'Designed for both authors and publishers. Where writers see recognition and growth in real-time, and publishers dig into performance and sales strategy. One shared space, two completely different user needs — perfectly balanced.'

    /**
     * Gallery content configuration
     * Visual showcase of project features and achievements
     * Each item includes:
     * - Theme-aware images (light/dark versions)
     * - Alt text for accessibility
     * - Title and description for context
     */
    const galleryItems = [
        {
            imageLight: '/litres/sales-light.png',
            imageDark: '/litres/sales-dark.png',
            alt: 'Placeholder Gallery Item 1',
            title: 'For Publishers',
            description:
                'A deep dive into performance — traffic sources, paid vs free dynamics, conversion patterns, and reader behavior breakdowns.',
        },
        {
            videoLight: '/litres/custom-light.mov',
            videoDark: '/litres/custom-dark.mov',
            alt: 'Custom Dashboard',
            title: 'Customizable Dashboard',
            description:
                'Flexible dashboard layout with quick configuration to match user roles.',
        },
    ]

    // Additional gallery items for the second gallery section
    const additionalGalleryItems = [
        {
            imageLight: '/litres/users-light.png',
            imageDark: '/litres/users-dark.png',
            alt: 'User Management Dashboard',
            title: 'User management for librarians',
            description:
                'Quickly group standard corporate users and apply bulk actions with ease — adjust access rules, update client types, or assign digital book quotas in just a few clicks.',
        },
        {
            imageLight: '/litres/promo-light.png',
            imageDark: '/litres/promo-dark.png',
            alt: 'Promotion Tools',
            title: 'Promotion Suite',
            description:
                'Integrated promotion tools for authors to manage campaigns, track performance, and optimize their marketing strategies.',
        },
    ]

    // =============================================
    // Component Layout Sections
    // =============================================

    /**
     * Process Section
     * Comprehensive overview of the project's journey:
     * - Project context and initial metrics
     * - Problem analysis and challenges
     * - Technical optimizations and solutions
     * - Team composition and contact information
     */
    const processContent = (
        <div className="space-y-8">
            <ProjectOverview stats={stats} description={description} />
            <ProblemSection
                stats={problemStats}
                description={problemDescription}
            />
            <OptimizationSection />
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

    /**
     * Results Section
     * Showcase of project outcomes:
     * - Interactive demo of key features
     * - Visual gallery of project highlights
     * - Consistent footer with team and contact information
     */
    const resultContent = (
        <div className="space-y-8">
            <DemoSection
                title={demoTitle}
                description={demoDescription}
                image="litres/main"
                caption="Placeholder caption for the demo section. Replace with actual caption."
            />
            <GallerySection items={galleryItems} />

            {/* Additional Demo Section */}
            <DemoSection
                title="E-Library Management Platform"
                description="A lightweight internal tool for public library staff to manage digital readers, control access rights, and expand their e-book collections. It simplifies user management, allows bulk updates to borrowing permissions, and helps libraries grow and organize their digital catalogs with ease."
                image="litres/libr"
                caption="The author success platform provides tools for sales tracking, promotion management, and reader engagement."
            />

            {/* Additional Gallery Section */}
            <GallerySection items={additionalGalleryItems} />

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

    /**
     * Development Section
     * Technical implementation details:
     * - Placeholder gallery for development artifacts
     * - Consistent footer with team and contact information
     * TODO: Add actual development content and documentation
     */
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
            {/* Grid overlay for layout visualization */}
            <GridOverlay show={isGridVisible} />

            <main className="relative">
                {/* Project header with grid toggle */}
                <ProjectHeader
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />

                {/* Main content container with responsive grid */}
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                        {/* Hero section */}
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <ProjectHero
                                title="Litres.com"
                                description="A platform for selling, distributing, and managing e-books and audiobooks. It serves as a digital bookstore, publishing tool, and library system."
                                mainImage="/litres/project-2-light.png"
                                mainImageDark="/litres/project-2-dark.png"
                                forwardImage="/litres/project-1-light.png"
                                forwardImageDark="/litres/project-1-dark.png"
                                clientLogo={clientLogo}
                                role="Lead Product Designer"
                            />
                        </div>

                        {/* Tabbed content sections */}
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <TabSection
                                processContent={processContent}
                                resultContent={resultContent}
                                devContent={devContent}
                            />
                        </div>

                        {/* Project navigation */}
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
