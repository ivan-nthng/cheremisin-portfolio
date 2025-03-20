'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center py-20 md:py-0">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-6 flex flex-col justify-center mt-16 md:mt-0"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold mb-6 font-heading leading-tight"
                        >
                            Hi! I'm Ivan{' '}
                            <span className="inline-block w-10 h-10 md:w-12 md:h-12 relative align-middle -my-1">
                                <Image
                                    src="/ivan-avatar.png"
                                    alt="Ivan's avatar"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </span>{' '}
                            – a product designer
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
                        >
                            Crafting digital experiences that blend creativity
                            with functionality. Specialized in creating
                            intuitive and engaging user interfaces.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex gap-4"
                        >
                            <a
                                href="#projects"
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Contact Me
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-6 flex items-center justify-center mt-8 md:mt-0"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <Image
                                src="/images/hero-image.jpg"
                                alt="Ivan Cheremisin"
                                fill
                                className="object-cover rounded-2xl"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
