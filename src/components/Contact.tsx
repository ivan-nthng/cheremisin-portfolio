'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative py-24 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-8"
                >
                    Get in Touch
                </motion.h2>
                <div className="max-w-2xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-primary-600 dark:text-primary-300 leading-relaxed mb-8"
                    >
                        I'm always interested in hearing about new projects and
                        opportunities. Whether you have a question or just want
                        to say hi, feel free to reach out!
                    </motion.p>

                    <div className="flex flex-wrap gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                href="https://github.com/ivancheremisin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                            >
                                <GithubIcon className="w-5 h-5" />
                                <span>GitHub</span>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link
                                href="https://linkedin.com/in/ivancheremisin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                            >
                                <LinkedinIcon className="w-5 h-5" />
                                <span>LinkedIn</span>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link
                                href="mailto:ivan.cheremisin@gmail.com"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Email</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
