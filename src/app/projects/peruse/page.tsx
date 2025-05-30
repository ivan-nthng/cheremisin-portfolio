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
    const currentProject = projects[currentProjectIndex]

    const clientLogo = {
        href: 'https://www.peruse.ml',
        svg: (
            <svg
                width="289"
                height="58"
                viewBox="0 0 289 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-auto"
            >
                <path
                    d="M2.10361 9.43354C0 13.3759 0 18.584 0 29C0 39.416 0 44.6241 2.10361 48.5665C3.03611 50.3141 4.24729 51.8841 5.68019 53.2196C5.67589 50.3202 6.41129 47.3805 7.96211 44.6898L9.32466 42.3257L12.6346 36.5328L24.8911 15.2672C28.891 8.3271 37.7511 5.9362 44.6795 9.94319C51.6013 13.9464 53.9632 22.8285 49.9636 29.7679L40.7758 45.7092C37.468 51.4485 30.1431 53.4269 24.4168 50.1151C18.6905 46.8034 16.7385 39.4596 20.0463 33.7203L25.134 24.893C25.6853 23.9364 26.9064 23.6086 27.8613 24.1609C28.8163 24.7132 29.1434 25.9364 28.5921 26.893L23.5044 35.7203C21.2954 39.5531 22.6036 44.4477 26.4133 46.651C30.2231 48.8544 35.1087 47.542 37.3177 43.7092L46.5055 27.7679C49.4062 22.7351 47.6882 16.3021 42.6829 13.4073C37.6696 10.5079 31.2495 12.2351 28.3492 17.2672L16.0946 38.5295L12.7846 44.3225L11.4202 46.6898C9.6942 49.6845 9.28845 53.0793 10.0221 56.1954C13.8898 58 19.0757 58 28.9499 58C31.1356 58 33.0916 58 34.8544 57.9804L46.7268 37.3812C47.2782 36.4246 48.4992 36.0968 49.4542 36.6491C50.4091 37.2014 50.7363 38.4246 50.185 39.3812L39.5423 57.8466C43.4695 57.6326 46.1903 57.1201 48.4826 55.8927C51.5901 54.2289 54.1352 51.6793 55.7962 48.5665C57.8998 44.6241 57.8998 39.416 57.8998 29C57.8998 18.584 57.8998 13.3759 55.7962 9.43354C54.1352 6.32068 51.5901 3.77111 48.4826 2.10725C44.547 0 39.348 0 28.9499 0C18.5519 0 13.3528 0 9.41724 2.10725C6.30976 3.77111 3.7646 6.32067 2.10361 9.43354Z"
                    fill="#6BBE8C"
                />
                <path
                    d="M117.166 9.34857C114.224 7.12 110.007 6 104.479 6H87.0795L86.8496 9.23429L91.6419 10.3086C91.7453 10.4571 91.8143 10.9486 91.8373 11.7714C91.8603 12.5943 91.9062 13.76 91.9522 15.2686C91.9982 16.7771 92.0327 18.7429 92.0327 21.1543L91.9522 35.6914C91.9522 38.1486 91.9407 40.1829 91.9177 41.7714C91.8947 43.36 91.8488 44.5486 91.8028 45.3486C91.7568 46.1486 91.6764 46.64 91.573 46.8457L87.0909 47.92L87.3208 51.1543H106.341L106.57 47.7714L100.227 46.7657C100.181 46.56 100.123 46.0571 100.077 45.2686C100.02 44.4686 99.9739 43.2914 99.9279 41.7257C99.8704 40.16 99.8474 38.1486 99.8474 35.6914V33.0171C100.342 33.0857 100.824 33.1771 101.353 33.2343C102.307 33.3371 103.295 33.3829 104.329 33.3829C107.685 33.3829 110.65 32.7771 113.225 31.5771C115.799 30.3771 117.844 28.6971 119.338 26.5371C120.832 24.3886 121.579 21.8971 121.579 19.0743C121.579 14.8229 120.108 11.5771 117.166 9.34857ZM110.903 27.0057C109.306 28.5486 107.065 29.3143 104.18 29.3143C103.249 29.3143 102.341 29.2229 101.433 29.04C100.905 28.9371 100.365 28.8 99.813 28.6514L99.7785 21.1543C99.7785 19.1543 99.79 17.36 99.813 15.7714C99.836 14.1829 99.8589 12.8457 99.8934 11.7714C99.9164 10.6971 99.9279 10 99.9279 9.69143H103.41C106.295 9.69143 108.674 10.5257 110.524 12.1943C112.386 13.8629 113.305 16.4914 113.305 20.08C113.305 23.1543 112.501 25.4629 110.903 27.0057Z"
                    fill="#223852"
                />
                <path
                    d="M146.334 44.88C144.92 45.5771 143.3 45.92 141.496 45.92C138.197 45.92 135.531 44.7657 133.486 42.4571C131.601 40.32 130.589 37.44 130.463 33.84H152.402V32.2971C152.402 27.68 151.253 24.0343 148.954 21.3371C146.656 18.64 143.403 17.2686 139.174 17.2229C136.29 17.1771 133.6 17.8857 131.13 19.3714C128.659 20.8571 126.648 22.9486 125.096 25.6457C123.545 28.3429 122.775 31.4743 122.775 35.0629C122.775 38.4 123.487 41.3143 124.901 43.8286C126.314 46.3429 128.268 48.2857 130.739 49.68C133.21 51.0629 136.002 51.76 139.094 51.76C141.978 51.76 144.599 51.0629 146.943 49.68C149.287 48.2971 151.184 46.1943 152.632 43.3714L150.54 41.4514C149.15 43.04 147.748 44.1829 146.322 44.88H146.334ZM131.566 25.6914C132.313 24.0571 133.313 22.8229 134.577 22C135.841 21.1771 137.163 20.7657 138.565 20.7657C140.726 20.7657 142.45 21.5429 143.714 23.1086C144.978 24.6743 145.61 26.8343 145.61 29.6114V30.2286H130.509C130.635 28.4686 130.992 26.96 131.566 25.6914Z"
                    fill="#223852"
                />
                <path
                    d="M180.926 18.4229C180.052 17.7829 178.995 17.4629 177.754 17.4629C176.26 17.4629 174.72 17.9771 173.157 19.0057C171.583 20.0343 170.054 22 168.56 24.9257L168.33 24.8457L168.641 18.5371L167.25 17.3829L155.884 20.4571V23.3029L160.837 24.3771C161.044 25.4514 161.217 26.7314 161.343 28.2286C161.469 29.7143 161.538 31.3029 161.538 32.9943L161.458 38.9143C161.458 40.4571 161.435 41.7829 161.377 42.9143C161.331 44.0457 161.274 44.9372 161.228 45.6114C161.171 46.2743 161.125 46.7086 161.079 46.9143L156.286 48.1486L156.516 51.1429H175.697L175.927 47.9886L169.192 46.9143C169.146 46.4 169.089 45.6114 169.043 44.5257C168.997 43.4514 168.939 42.2057 168.893 40.8C168.847 39.3943 168.79 37.9429 168.744 36.4571L168.664 29.6914C169.33 28.2057 170.077 26.9486 170.905 25.92C171.548 25.12 172.215 24.4457 172.893 23.8971C173.444 24.32 173.996 24.6629 174.548 24.9257C175.421 25.3371 176.375 25.5429 177.409 25.5429C178.8 25.5429 179.961 25.1886 180.891 24.4686C181.822 23.7486 182.282 22.72 182.282 21.3943C182.282 20.0686 181.845 19.0743 180.972 18.4343L180.926 18.4229Z"
                    fill="#223852"
                />
                <path
                    d="M220.747 41.3029C220.643 39.6114 220.597 37.6114 220.597 35.3029V25.6457C220.597 24.4457 220.597 23.2686 220.632 22.1486C220.655 21.0171 220.701 19.8171 220.747 18.5371L219.276 17.3829L207.37 20.4571V23.3029L213.013 24.3771C213.116 25.0971 213.196 25.9314 213.242 26.88C213.288 27.8286 213.334 28.8343 213.357 29.8743C213.38 30.9257 213.392 32.0114 213.392 33.1429V41.68C212.415 43.2686 211.254 44.4114 209.91 45.1086C208.565 45.8057 207.278 46.1486 206.037 46.1486C203.773 46.1486 201.934 45.4857 200.543 44.1486C199.153 42.8114 198.452 40.6629 198.452 37.6914L198.532 29.84C198.532 27.7943 198.567 25.8057 198.647 23.8743C198.728 21.9543 198.808 20.2171 198.923 18.6857L197.302 17.3829L185.626 20.4571V23.3029L190.89 24.3771C190.993 25.7143 191.085 27.0171 191.166 28.2971C191.246 29.5771 191.281 30.8343 191.281 32.0686V38.6857C191.281 43.04 192.441 46.3086 194.763 48.4914C197.084 50.6743 200.026 51.76 203.577 51.76C205.382 51.76 207.094 51.3371 208.726 50.4914C210.346 49.6457 211.909 48.1257 213.403 45.92L213.633 46L213.553 50.9943L214.943 52L225.999 49.2343V46.4686L221.046 45.2343C220.942 44.3086 220.839 43.0057 220.735 41.3143L220.747 41.3029Z"
                    fill="#223852"
                />
                <path
                    d="M245.823 31.84C242.835 30.5029 240.744 29.3943 239.56 28.4914C238.376 27.6 237.779 26.4229 237.779 24.9943C237.779 23.76 238.307 22.7429 239.364 21.92C240.422 21.0971 241.824 20.6857 243.582 20.6857C244.352 20.6857 245.099 20.7771 245.823 20.96C246.547 21.1429 247.168 21.3829 247.685 21.6914L249.466 26.9943H253.489L252.638 18.7657C251.604 18.3086 250.317 17.9314 248.765 17.6457C247.214 17.36 245.697 17.2229 244.203 17.2229C241.468 17.2229 239.077 17.6457 237.009 18.4914C234.94 19.3371 233.319 20.4914 232.136 21.9543C230.952 23.4171 230.354 25.0971 230.354 26.9943C230.354 29.3486 231.101 31.3029 232.595 32.8457C234.089 34.3886 236.698 35.8971 240.41 37.3829C243.249 38.5143 245.145 39.5543 246.099 40.5029C247.053 41.4514 247.536 42.5714 247.536 43.8514C247.536 45.1314 247.03 46.24 246.03 47.0057C245.019 47.7714 243.674 48.16 241.973 48.16C239.709 48.16 237.664 47.5771 235.859 46.3886L234.239 40.8457H230.067L230.458 49.3029C231.848 50.0686 233.538 50.6743 235.526 51.1086C237.514 51.5429 239.479 51.76 241.445 51.76C245.409 51.76 248.673 50.8457 251.225 49.0286C253.776 47.2114 255.051 44.8343 255.051 41.9086C255.051 39.7029 254.373 37.84 253.006 36.3314C251.638 34.8229 249.259 33.3257 245.846 31.8286L245.823 31.84Z"
                    fill="#223852"
                />
                <path
                    d="M286.931 41.4629C285.541 43.0514 284.139 44.1943 282.714 44.8914C281.3 45.5886 279.68 45.9314 277.875 45.9314C274.577 45.9314 271.911 44.7772 269.865 42.4686C267.98 40.3314 266.969 37.4514 266.831 33.8514H288.77V32.3086C288.77 27.6914 287.621 24.0457 285.322 21.3486C283.024 18.6514 279.772 17.28 275.542 17.2343C272.658 17.1886 269.969 17.8972 267.498 19.3829C265.027 20.8686 263.016 22.96 261.464 25.6572C259.913 28.3543 259.143 31.4857 259.143 35.0743C259.143 38.4114 259.855 41.3257 261.269 43.84C262.682 46.3543 264.636 48.2972 267.107 49.6914C269.578 51.0743 272.37 51.7714 275.462 51.7714C278.346 51.7714 280.967 51.0743 283.311 49.6914C285.656 48.3086 287.552 46.2057 289 43.3829L286.908 41.4629H286.931ZM267.946 25.6914C268.693 24.0572 269.693 22.8229 270.957 22C272.221 21.1772 273.543 20.7657 274.945 20.7657C277.105 20.7657 278.829 21.5429 280.093 23.1086C281.357 24.6743 281.99 26.8343 281.99 29.6114V30.2286H266.889C267.015 28.4686 267.371 26.96 267.946 25.6914Z"
                    fill="#223852"
                />
            </svg>
        ),
    }

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
                                title="Peruse.ml"
                                description="AI-powered file organization that understands your content and makes finding files effortless."
                                mainImage="/peruse/hero.png"
                                forwardImage="/peruse/forward.png"
                                clientLogo={clientLogo}
                                role="Lead Product Designer"
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
