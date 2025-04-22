'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface ExperienceItem {
    company: string
    url: string
    role: string
    period: string
}

const experience: ExperienceItem[] = [
    {
        company: 'Veritonic',
        url: 'veritonic.com',
        role: 'Lead Product Designer',
        period: 'August, 2023 - September, 2024',
    },
    {
        company: 'BlueOrange Digital',
        url: 'blueorange.digital',
        role: 'Lead Product Designer',
        period: 'May, 2022 - June, 2023',
    },
    {
        company: 'CityMobil',
        url: 'city-mobil.ru',
        role: 'Senior Product Designer',
        period: 'June, 2020 - April, 2022',
    },
    {
        company: 'Wrike',
        url: 'wrike.com',
        role: 'Senior Product Designer',
        period: 'January, 2020 - June, 2020',
    },
    {
        company: 'LitRes',
        url: 'litres.ru',
        role: 'Senior Product Designer',
        period: 'April, 2017 - December, 2019',
    },
]

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function About() {
    return (
        <section id="about" className="relative py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {/* Manifesto Section */}
                    <div className="md:col-span-12 mb-16 lg:w-1/2 md:w-1/3">
                        <motion.h2
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-blue-950 dark:text-blue-50 mb-6"
                        >
                            Who am I?
                        </motion.h2>
                        <motion.div
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-md text-blue-900/80 dark:text-blue-100/80 space-y-4"
                        >
                            <p>
                                I design digital and physical products. Outside
                                of work, I surf,{' '}
                                <Link
                                    href="/photos"
                                    className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                                >
                                    shoot photos
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                , read,{' '}
                                <Link
                                    href="/music"
                                    className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                                >
                                    make music
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                , and try to spend as much time as I can with my
                                family.
                            </p>
                            <p>
                                I like it when my brain clicks, not overheats.
                                If you want to understand me better —{' '}
                                <Link
                                    href="/manifesto"
                                    className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                                >
                                    here's my manifesto
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                .
                            </p>
                        </motion.div>
                    </div>

                    {/* Overall Experience */}
                    <div className="md:col-span-12 flex items-baseline justify-between">
                        <motion.h2
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-blue-950 dark:text-blue-50"
                        >
                            Overall Experience
                        </motion.h2>
                        <motion.span
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                            className="text-xl text-blue-900 dark:text-blue-100"
                        >
                            10 years
                        </motion.span>
                    </div>

                    {/* Experience List */}
                    <div className="md:col-span-12 space-y-8">
                        {experience.map((item, index) => (
                            <motion.div
                                key={item.company}
                                variants={fadeInUpVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-blue-950 dark:text-blue-50">
                                            {item.company}
                                        </h3>
                                        <Link
                                            href={`https://${item.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                                        >
                                            {item.url}
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </Link>
                                    </div>
                                    <p className="text-blue-950 dark:text-blue-100">
                                        {item.role}
                                    </p>
                                </div>
                                <p className="text-blue-900/80 dark:text-blue-100/80 text-left sm:text-right whitespace-nowrap">
                                    {item.period}
                                </p>
                            </motion.div>
                        ))}
                        <motion.div
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 0.6,
                                delay: experience.length * 0.1,
                            }}
                            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                        >
                            <h3 className="text-xl font-bold text-blue-950 dark:text-blue-50">
                                More Projects
                            </h3>
                            <p className="text-blue-900/80 dark:text-blue-100/80 text-right">
                                since 2015
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
