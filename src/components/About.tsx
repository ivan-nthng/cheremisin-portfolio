'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <section
            id="about"
            className="relative py-24 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-100 mb-8"
                >
                    About Me
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl"
                >
                    <p className="text-lg text-primary-600 dark:text-primary-300 leading-relaxed">
                        I am a passionate full-stack developer with expertise in
                        modern web technologies. My journey in software
                        development has been driven by a desire to create
                        elegant solutions to complex problems. I specialize in
                        building responsive, user-friendly applications that
                        deliver exceptional user experiences.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
