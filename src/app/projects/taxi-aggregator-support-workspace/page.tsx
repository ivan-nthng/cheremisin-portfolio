'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function TaxiAggregatorSupportWorkspacePage() {
    const { theme } = useTheme()

    const mainImage =
        theme === 'dark' ? '/actions-dark.png' : '/actions-light.png'
    const forwardImage =
        theme === 'dark' ? '/forward-dark.png' : '/forward-light.png'

    return (
        <div className="relative min-h-screen py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    className="bg-blue-50/80 dark:bg-blue-950/20 backdrop-blur-sm rounded-[32px] overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left Column - Content */}
                        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-12">
                            <div className="space-y-4 sm:space-y-6">
                                <motion.h1
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Taxi Aggregator Support Workspace
                                </motion.h1>
                                <motion.p
                                    className="text-base sm:text-lg text-blue-800/80 dark:text-blue-200/80"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    Making sense of complex business interfaces.
                                    SaaS, project management, data
                                    visualization, and design systems — all to
                                    help people work smarter.
                                </motion.p>
                            </div>

                            <motion.div
                                className="mt-6 sm:mt-8 md:mt-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <p className="text-sm text-blue-800/60 dark:text-blue-200/60 mb-4">
                                    Made for
                                </p>
                                <Link
                                    href="https://vk.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
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
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column - Images */}
                        <div className="relative h-[566px] overflow-visible -mt-12 lg:-mt-0">
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
                                        src={mainImage}
                                        alt="Taxi Aggregator Support Workspace Main View"
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
                                        src={forwardImage}
                                        alt="Taxi Aggregator Support Workspace Forward View"
                                        fill
                                        className="object-contain object-bottom"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
