'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    GithubIcon,
    LinkedinIcon,
    Mail,
    Instagram,
} from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
    return (
        <section id="contact" className="relative py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-blue-950 dark:text-blue-50 mb-8"
                >
                    Get in Touch
                </motion.h2>
                <div className="max-w-2xl space-y-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-blue-900/80 dark:text-blue-100/80 leading-relaxed"
                    >
                        I'm always interested in hearing about new projects and
                        opportunities. Whether you have a question or just want
                        to say hi, feel free to reach out!
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-4"
                    >
                        <Link
                            href="https://github.com/ivan-nthng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                        >
                            <GithubIcon className="w-5 h-5" />
                            <span>GitHub</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/icheremisin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                        >
                            <LinkedinIcon className="w-5 h-5" />
                            <span>LinkedIn</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="https://www.instagram.com/cheremisin.co.uk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                            <span>Instagram</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="mailto:ivan@cheremisin.co.uk"
                            className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span>ivan@cheremisin.co.uk</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>

                    {/* Footer Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-sm text-blue-900/60 dark:text-blue-100/60 space-y-1 pt-8"
                    >
                        <p>No rights reserved.</p>
                        <p>
                            Feel free to use anything from this site — remix,
                            reuse, share, whatever you like. Attribution is
                            appreciated but not required.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
