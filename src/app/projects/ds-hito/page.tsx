'use client'

// ===================================
// Imports and Dependencies
// ===================================
import React from 'react'
import { useTheme } from 'next-themes'
import ProjectHero from '@/components/ProjectHero'
import ProjectHeader from '@/components/ProjectHeader'
import DemoSection from '@/components/DemoSection'
import GridOverlay from '@/components/GridOverlay'
import TabSection from '@/components/TabSection'
import OptimizationSection from '@/components/OptimizationSection'
import { GallerySection } from '@/components/GallerySection'
import ProjectNavigation from '@/components/ProjectNavigation'
import { projects, type Project } from '@/components/Projects'
import { ProjectFooter } from '@/components/ProjectFooter'
import { ContextImageSection } from '@/components/ContextImageSection'
import { CodeSnippet } from '@/components/CodeSnippet'
import { cn } from '@/lib/utils'

export default function DsHitoPage() {
    // ===================================
    // Hooks and State
    // ===================================
    const { theme } = useTheme()
    const [isGridVisible, setIsGridVisible] = React.useState(false)

    // Find the current project index
    const currentProjectIndex = projects.findIndex(
        (p) => p.link === '/projects/ds-hito',
    )
    const currentProject = projects[currentProjectIndex]

    // ===================================
    // Asset Configuration
    // ===================================
    const mainImage =
        theme === 'dark' ? '/hito/main-dark.png' : '/hito/main-light.png'
    const forwardImage =
        theme === 'dark' ? '/hito/forward-dark.png' : '/hito/forward-light.png'

    // ===================================
    // Client Logo Configuration
    // ===================================
    const clientLogo = {
        href: 'https://example.com',
        svg: (
            <svg
                width="102"
                height="48"
                viewBox="0 0 68 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-900 dark:text-blue-100 opacity-40 hover:opacity-60 transition-opacity duration-300"
            >
                <g clipPath="url(#clip0_5174_359)">
                    <path
                        d="M44.34 0H34.6L32.2 6.83L29.59 5.91L31.67 0H20.18L14.27 14.76C17.65 11.43 20.16 11.37 20.98 11.47C21.9 11.46 22.42 11.94 22.66 12.24C23.68 13.55 22.92 15.75 21.77 19.08C20.99 21.36 19.53 25.59 20.32 26.61C20.52 26.86 21.15 26.84 21.41 26.82C21.48 26.82 23.14 26.6 27.62 19.19C30.01 15.24 31.96 11.28 31.98 11.24L34.55 12.23C34.55 12.23 33.75 15.06 33.28 18.17C32.46 23.6 33.32 25.14 33.6 25.48C33.76 25.67 33.94 25.78 34.35 25.75C35.04 25.69 36.5 25.04 38.45 21.27C39.27 19.68 40.09 17.7 40.9 15.37C41.14 13.39 41.54 11.15 42.08 8.66L36.83 9.09L36.6 6.33L42.74 5.83C43.27 3.7 43.82 1.7 44.32 0H44.34Z"
                        fill="currentColor"
                    />
                    <path
                        d="M58.17 11.19C57.53 11.24 56.7 12.67 56.86 14.55C56.93 15.37 57.25 16.91 58.65 18.06C59.22 18.53 59.92 18.88 60.72 19.12C60.98 17.85 61.07 16.51 60.97 15.35C60.74 12.49 59.39 11.1 58.17 11.2V11.19Z"
                        fill="currentColor"
                    />
                    <path
                        d="M64.62 19.43C67.06 19.23 67.47 18.24 68 17.77V6.14L45.88 8.35C45.62 9.34 45.35 10.35 45.07 11.36C44.61 12.99 44.14 14.51 43.66 15.91C43.25 19.35 43.22 22.78 44.35 24.23C44.6 24.55 44.98 24.88 45.83 24.81C46.21 24.78 47.58 24.37 49.55 20.4C50.73 18.02 51.47 15.63 51.48 15.61L54.18 16.18C54.03 17.52 53.93 21.7 55.47 23.28C55.93 23.76 56.51 23.95 57.3 23.88C58.38 23.79 59.23 22.95 59.85 21.76C58.74 21.42 57.75 20.9 56.91 20.21C55.29 18.88 54.29 16.95 54.12 14.79C53.85 11.43 55.54 8.65 57.97 8.45C60.48 8.25 63.35 10.25 63.75 15.14C63.86 16.46 63.78 17.99 63.48 19.5C63.85 19.5 64.24 19.48 64.63 19.45L64.62 19.43Z"
                        fill="currentColor"
                    />
                    <path
                        d="M64.84 22.19C64.07 22.25 63.34 22.27 62.64 22.23C61.65 24.58 59.99 26.43 57.51 26.64C55.9 26.77 54.5 26.27 53.46 25.2C52.65 24.36 52.13 23.25 51.81 22.09C50.41 24.77 48.44 27.39 46.04 27.58C44.43 27.71 43.08 27.15 42.14 25.94C41.52 25.14 41.09 24.05 40.84 22.66C38.88 26.41 36.83 28.33 34.57 28.51C33.3 28.61 32.22 28.17 31.45 27.24C30.22 25.74 30.01 22.99 30.23 20.19C30.14 20.33 30.06 20.48 29.97 20.62C25.31 28.33 23.06 29.46 21.62 29.57C19.66 29.73 18.63 28.97 18.12 28.3C16.41 26.1 17.8 22.07 19.14 18.17C19.57 16.93 20.17 15.17 20.32 14.23C18.97 14.41 13.76 16.13 7.59 31.41L7.31 31.99H67.99V21.03C66.95 21.56 66.59 22.04 64.83 22.18L64.84 22.19Z"
                        fill="currentColor"
                    />
                    <path
                        d="M46.58 5.52L68 3.36V0H47.78C47.46 1.58 47.06 3.47 46.57 5.52H46.58Z"
                        fill="currentColor"
                    />
                    <path
                        d="M5.02999 30.4L12.96 10.6C10.37 13.19 7.75999 14.84 5.54999 15.9C3.46999 16.9 1.55999 17.46 0.00999451 17.78V32.01H4.26999C4.59999 31.33 4.98999 30.52 5.03999 30.41L5.02999 30.4Z"
                        fill="currentColor"
                    />
                    <path
                        d="M4.49 13.33C9.76 10.77 13.98 6.29 17.06 0H0V14.93C1.29 14.63 2.83 14.13 4.49 13.33Z"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_5174_359">
                        <rect width="68" height="32" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
    }

    // ===================================
    // Content Configuration
    // ===================================
    const description =
        'A semantic variable-based system for building scalable, adaptive UI components. Created to help designers and developers work with consistent spacing, typography, and tokens—tailored for any project with just a few root-level overrides.'

    const demoTitle = 'Building Scalable Tools'
    const demoDescription =
        'A semantically smart system that lets designers and developers communicate in human terms. Auto-adaptive. Scales instantly. Ready for any product, zero rework'

    // Video path based on theme
    const demoVideo =
        theme === 'dark'
            ? '/hito/var-demo-dark.mov'
            : '/hito/var-demo-light.mov'

    // ===================================
    // Gallery Configuration
    // ===================================
    const galleryItems = [
        {
            imageLight: '/hito/example-light.png',
            imageDark: '/hito/example-dark.png',
            alt: 'Design Tokens',
            title: 'Design Tokens',
            description:
                'Raw value syncs with a Tailwind CSS or a custom primitive — then reused as multiple semantic variables across the system. One value, many roles. Clean, scalable, consistent',
            neutral: true,
            noDecor: true,
        },
        {
            imageLight: '/hito/system-part-light.png',
            imageDark: '/hito/system-part-dark.png',
            alt: 'System part',
            title: 'One button size — many behaviors',
            description:
                'In my component library, buttons have a single base size. Their actual size adapts automatically based on context — like screen size or layout — or can be customized manually when needed.',
        },
    ]

    // ===================================
    // Code States Configuration
    // ===================================
    const buttonSizes = [
        {
            name: 'SM',
            code: `// Button component with SM size
const Button = ({
  size: 'sm',
  state: 'default',
  style: 'accent',
  leftIcon: false,
  rightIcon: false,
  theme: '${theme}'
}) => (
  <button className={cn(
    'rounded-lg font-medium',
    'text-sm px-3 py-1.5'
  )}>
    Small Button
  </button>
)`,
            lightImage: '/hito/button-1-light.png',
            darkImage: '/hito/button-1-dark.png',
            tokens: {
                padding: '0.375rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
            },
        },
        {
            name: 'MD',
            code: `// Button component with MD size
const Button = ({
  size: 'md',
  state: 'default',
  style: 'accent',
  leftIcon: false,
  rightIcon: false,
  theme: '${theme}'
}) => (
  <button className={cn(
    'rounded-lg font-medium',
    'text-base px-4 py-2'
  )}>
    Medium Button
  </button>
)`,
            lightImage: '/hito/button-2-light.png',
            darkImage: '/hito/button-2-dark.png',
            tokens: {
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
            },
        },
        {
            name: 'LG',
            code: `// Button component with LG size
const Button = ({
  size: 'lg',
  state: 'default',
  style: 'accent',
  leftIcon: false,
  rightIcon: false,
  theme: '${theme}'
}) => (
  <button className={cn(
    'rounded-lg font-medium',
    'text-lg px-5 py-2.5'
  )}>
    Large Button
  </button>
)`,
            lightImage: '/hito/button-3-light.png',
            darkImage: '/hito/button-3-dark.png',
            tokens: {
                padding: '0.625rem 1.25rem',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
            },
        },
        {
            name: 'XL',
            code: `// Button component with XL size
const Button = ({
  size: 'xl',
  state: 'default',
  style: 'accent',
  leftIcon: false,
  rightIcon: false,
  theme: '${theme}'
}) => (
  <button className={cn(
    'rounded-lg font-medium',
    'text-xl px-6 py-3'
  )}>
    Extra Large Button
  </button>
)`,
            lightImage: '/hito/button-4-light.png',
            darkImage: '/hito/button-4-dark.png',
            tokens: {
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '1.25rem',
            },
        },
    ]

    // ===================================
    // Page Layout
    // ===================================
    return (
        <>
            {/* Grid Overlay */}
            <GridOverlay show={isGridVisible} />

            {/* Main Content */}
            <main className="relative">
                {/* Header */}
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
                                title="A Semantically-Driven Design System"
                                description="A comprehensive data science platform that helps users analyze and visualize complex datasets with ease. Built with modern web technologies and a focus on user experience."
                                mainImage="/ds-hito/project-1-light.png"
                                mainImageDark="/ds-hito/project-1-dark.png"
                                forwardImage="/ds-hito/project-2-light.png"
                                forwardImageDark="/ds-hito/project-2-dark.png"
                                clientLogo={clientLogo}
                                role="Lead Product Designer"
                            />
                        </div>

                        {/* Main Content Section */}
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                            <div className="space-y-8">
                                {/* Main Demo Section */}
                                <DemoSection
                                    title={demoTitle}
                                    description={demoDescription}
                                    video={demoVideo}
                                    caption="Hito Design System Demo"
                                />

                                {/* Variables Demo Section */}
                                <ContextImageSection
                                    lightVideo="/hito/var-demo-light.mov"
                                    darkVideo="/hito/var-demo-dark.mov"
                                    alt="Variable Demo"
                                    header="Semantic Variables"
                                    description="One variable — many contexts.
Developers and designers don't need to think about sizes. Values adapt automatically across breakpoints and interface sizes. Just pick a semantically meaningful variable, and the system does the rest."
                                />

                                {/* Gallery Section */}
                                <GallerySection items={galleryItems} />

                                {/* Interactive Code Section */}
                                <CodeSnippet
                                    header="Button Sizes"
                                    description="Each button size is defined using semantic tokens that adapt to different contexts while maintaining consistent relationships between padding, font size, and border radius."
                                    alt="Button Size Variants"
                                    sizes={buttonSizes}
                                />

                                {/* Footer Section */}
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
