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

// =============================
// Experience Data
// =============================
// This array contains the user's work experience, including company, url, role, and period.
const experience: ExperienceItem[] = [
    {
        company: 'Veritonic',
        url: 'veritonic.com',
        role: 'Lead Product Designer',
        period: 'Aug 2023 - Sep 2024',
    },
    {
        company: 'BlueOrange Digital',
        url: 'blueorange.digital',
        role: 'Lead Product Designer',
        period: 'May 2022 - Jun 2023',
    },
    {
        company: 'CityMobil',
        url: 'city-mobil.ru',
        role: 'Senior Product Designer',
        period: 'Jun 2020 - Apr 2022',
    },
    {
        company: 'Wrike',
        url: 'wrike.com',
        role: 'Senior Product Designer',
        period: 'Jan 2020 - Jun 2020',
    },
    {
        company: 'LitRes',
        url: 'litres.ru',
        role: 'Senior Product Designer',
        period: 'Apr 2017 - Dec 2019',
    },
]

export default function About() {
    // =============================
    // Visibility Animation State
    // =============================
    // Ref and state for triggering animations when the section enters the viewport.
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            {
                threshold: 0.25,
                rootMargin: '-50px 0px',
            },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    // =============================
    // Animation Variants
    // =============================
    // Framer Motion animation configs for container and items.
    const container = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 40,
                damping: 20,
                mass: 1,
                staggerChildren: 0.15,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
            },
        },
    }

    return (
        // =============================
        // About Section Root
        // =============================
        <section id="about" className="relative py-24 sm:py-32" ref={ref}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {/* =============================
                        Manifesto Section
                        - Personal intro, hobbies, and links to photos/music/manifesto
                    ============================= */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isVisible ? 'show' : 'hidden'}
                        className="md:col-span-12 mb-16 lg:w-1/2 md:w-1/3"
                    >
                        <motion.h2
                            variants={item}
                            className="text-3xl font-bold text-blue-950 dark:text-blue-50 mb-6"
                        >
                            Who am I?
                        </motion.h2>
                        <motion.div
                            variants={item}
                            className="text-md text-blue-900/80 dark:text-blue-100/80 space-y-4"
                        >
                            {/* Personal description and links */}
                            <p>
                                I design digital and physical products. Outside
                                of work, I surf,{' '}
                                <Link
                                    href="https://unsplash.com/@vanya_nichego"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                                >
                                    shoot photos
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                , read,{' '}
                                <Link
                                    href="https://soundcloud.com/vanya-nichego"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                    </motion.div>

                    {/* =============================
                        Overall Experience Section
                        - Summary of total experience
                    ============================= */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isVisible ? 'show' : 'hidden'}
                        className="md:col-span-12 lg:w-2/3 md:w-2/3"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-8">
                            <motion.h2
                                variants={item}
                                className="text-3xl font-bold text-blue-950 dark:text-blue-50 order-1 sm:order-none"
                            >
                                Overall Experience
                            </motion.h2>
                            <motion.span
                                variants={item}
                                className="text-xl text-blue-900 dark:text-blue-100 order-2 sm:order-none"
                            >
                                10 years
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* =============================
                        Experience List Section
                        - Detailed list of companies, roles, and periods
                    ============================= */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isVisible ? 'show' : 'hidden'}
                        className="md:col-span-12 space-y-8 lg:w-2/3 md:w-2/3"
                    >
                        {experience.map((item, index) => (
                            <motion.div
                                key={item.company}
                                variants={item}
                                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                            >
                                <div className="space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        {/* Company Name and Link */}
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
                                    {/* Role */}
                                    <p className="text-blue-950 dark:text-blue-100">
                                        {item.role}
                                    </p>
                                </div>
                                {/* Period */}
                                <p className="text-blue-900/80 dark:text-blue-100/80 text-left sm:text-right whitespace-nowrap">
                                    {item.period}
                                </p>
                            </motion.div>
                        ))}
                        {/* Older Projects Entry */}
                        <motion.div
                            variants={item}
                            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                        >
                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <h3 className="text-xl font-bold text-blue-950 dark:text-blue-50">
                                        Older Projects
                                    </h3>
                                </div>
                            </div>
                            <p className="text-blue-900/80 dark:text-blue-100/80 text-left sm:text-right whitespace-nowrap">
                                Since 2015
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
