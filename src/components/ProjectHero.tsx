'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface ProjectHeroProps {
    title: string
    description: string
    mainImage: string
    mainImageDark?: string
    forwardImage: string
    forwardImageDark?: string
    clientLogo?: {
        href: string
        svg: React.ReactNode
    }
    clientName?: string
}

export default function ProjectHero({
    title,
    description,
    mainImage,
    mainImageDark,
    forwardImage,
    forwardImageDark,
    clientLogo,
    clientName = 'Made for',
}: ProjectHeroProps) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const currentMainImage =
        mounted && resolvedTheme === 'dark' && mainImageDark
            ? mainImageDark
            : mainImage
    const currentForwardImage =
        mounted && resolvedTheme === 'dark' && forwardImageDark
            ? forwardImageDark
            : forwardImage

    return (
        <div className="relative pt-8 pb-4 sm:pt-12 sm:pb-6 md:pt-16 md:pb-8">
            <motion.div
                className="bg-blue-50/80 dark:bg-blue-950/20 backdrop-blur-sm rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    {/* Left Column - Content */}
                    <div className="col-span-2 sm:col-span-4 md:col-span-4 lg:col-span-6 p-6 flex flex-col h-full">
                        <div className="space-y-6 flex-grow">
                            <motion.h1
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {title}
                            </motion.h1>
                            <motion.p
                                className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {description}
                            </motion.p>
                        </div>

                        {clientLogo && (
                            <motion.div
                                className="mt-auto pt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <p className="text-sm text-blue-800/60 dark:text-blue-200/60 mb-4">
                                    {clientName}
                                </p>
                                <Link
                                    href={clientLogo.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    {clientLogo.svg}
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Images */}
                    <div className="col-span-2 sm:col-span-4 md:col-span-4 lg:col-span-6 relative h-[566px] overflow-visible -mt-12 lg:-mt-0">
                        {mounted && (
                            <>
                                {/* First Image Container */}
                                <motion.div
                                    className="absolute bottom-[15%] right-0 w-full h-[80%]"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={currentMainImage}
                                            alt={`${title} Main View`}
                                            fill
                                            className="object-contain object-bottom"
                                            priority
                                        />
                                    </div>
                                </motion.div>

                                {/* Second Image Container */}
                                <motion.div
                                    className="absolute bottom-[-15%] right-0 w-full h-[80%] translate-x-[30%]"
                                    initial={{ x: '130%' }}
                                    animate={{ x: '30%' }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={currentForwardImage}
                                            alt={`${title} Forward View`}
                                            fill
                                            className="object-contain object-bottom"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
