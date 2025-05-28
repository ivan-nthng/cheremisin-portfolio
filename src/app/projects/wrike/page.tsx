'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import ProjectHero from '@/components/ProjectHero'
import ProjectHeader from '@/components/ProjectHeader'
import GridOverlay from '@/components/GridOverlay'
import ProjectNavigation from '@/components/ProjectNavigation'
import { projects } from '@/components/Projects'

export default function WrikePage() {
    const { theme, setTheme } = useTheme()
    const [isGridVisible, setIsGridVisible] = React.useState(false)

    // Force light theme for this page
    React.useEffect(() => {
        setTheme('light')
    }, [setTheme])

    // Find current project index for navigation
    const currentProjectIndex = projects.findIndex(
        (p) => p.link === '/projects/wrike',
    )

    // Client logo configuration
    const clientLogo = {
        href: 'https://www.wrike.com',
        svg: (
            <svg
                width="444"
                height="89"
                viewBox="0 0 444 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-auto"
            >
                <g clipPath="url(#clip0_5290_158)">
                    <mask
                        id="mask0_5290_158"
                        style={{ maskType: 'luminance' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="444"
                        height="89"
                    >
                        <path d="M444 0H0V89H444V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_5290_158)">
                        <path
                            d="M264.845 77.1333H278.997V55.0394C278.997 41.6894 290.738 41.9236 296.881 42.9385V27.871C287.084 27.0122 281.252 29.7447 278.608 35.0534H278.297L278.375 28.1052H264.767V77.1333H264.845Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                        <path
                            d="M338.249 77.1333H347.113L361.732 58.6306L374.096 77.1333H390.58L371.141 48.7157L388.17 28.0271H371.763L352.323 52.6973H352.012L352.168 3.51306H338.249V77.1333Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                        <path
                            d="M178.456 77.1333H189.419L206.215 45.5929L222.467 77.1333H233.586L258.547 28.0271H241.984L226.666 59.3333L212.125 28.0271H200.228L184.909 59.4894L170.369 28.0271H153.806L178.456 77.1333Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                        <path
                            d="M315.777 21.0008C320.587 21.0008 324.486 17.086 324.486 12.2569C324.486 7.42782 320.587 3.51306 315.777 3.51306C310.967 3.51306 307.068 7.42782 307.068 12.2569C307.068 17.086 310.967 21.0008 315.777 21.0008Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                        <path
                            d="M322.775 28.0271H308.779V77.1333H322.775V28.0271Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                        <path
                            d="M32.8142 32.2429C39.5792 32.2429 42.7673 33.492 47.6661 38.4104L73.9484 64.7981C74.726 65.5788 74.8815 65.8911 75.037 66.3595C75.1147 66.5157 75.1147 66.7499 75.1147 66.906C75.1147 67.0622 75.1147 67.2964 75.037 67.4525C74.8815 67.921 74.726 68.2332 73.9484 69.0139L55.9862 87.1262C55.2086 87.9069 54.8976 88.063 54.431 88.2192C54.2755 88.2973 54.0422 88.2973 53.8867 88.2973C53.7312 88.2973 53.4979 88.2973 53.3424 88.2192C52.8759 88.063 52.5648 87.9069 51.7873 87.1262L0.855559 35.9902C-0.621849 34.5069 -0.0775409 32.2429 2.41073 32.2429H32.8142Z"
                            fill="#08CF65"
                        />
                        <path
                            d="M106.996 -5.47841e-05C100.231 -5.47841e-05 97.0428 1.24907 92.144 6.16749L65.8617 32.5552C65.0841 33.3359 64.9286 33.6482 64.7731 34.1166C64.6953 34.2727 64.6953 34.5069 64.6953 34.6631C64.6953 34.8192 64.6953 35.0534 64.7731 35.2096C64.9286 35.678 65.0841 35.9903 65.8617 36.771L83.8239 54.8052C84.6014 55.5859 84.9125 55.742 85.379 55.8982C85.5345 55.9762 85.7678 55.9762 85.9233 55.9762C86.0789 55.9762 86.3121 55.9762 86.4676 55.8982C86.9342 55.742 87.2452 55.5859 88.0228 54.8052L138.955 3.66924C140.432 2.18591 139.888 -0.078125 137.399 -0.078125H106.996V-5.47841e-05Z"
                            fill="#08CF65"
                        />
                        <path
                            d="M430.315 60.8166C428.604 63.3929 425.027 66.5937 419.04 66.5937C412.042 66.5937 407.065 62.5341 405.977 56.6788H444C444 55.6639 444 54.1806 444 52.7753C444 38.5665 433.814 27.1683 418.729 27.1683C403.955 27.1683 392.524 38.4104 392.524 52.7753C392.524 67.0622 403.722 78.3823 418.729 78.3823C429.926 78.3823 436.691 73.9323 441.046 68.2332L430.315 60.8166ZM417.951 38.1762C424.405 38.1762 428.915 41.7674 430.47 46.9201H405.355C406.91 41.7674 411.342 38.1762 417.951 38.1762Z"
                            fill={theme === 'dark' ? 'white' : 'black'}
                        />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_5290_158">
                        <rect width="444" height="89" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
    }

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
                                title="Wrike — Agile Project Management Tool"
                                description="I designed a flexible project management tool based on a BoardView interface."
                                mainImage="/wrike/hero-light.png"
                                mainImageDark="/wrike/hero-light.png"
                                forwardImage="/wrike/forward-light.png"
                                forwardImageDark="/wrike/forward-light.png"
                                clientLogo={clientLogo}
                                role="Senior Product Designer"
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
