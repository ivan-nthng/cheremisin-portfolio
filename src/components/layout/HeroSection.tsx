'use client'

import React from 'react'
import { motion } from 'framer-motion'

// HeroSection layout component
// Provides a responsive, padded, full-width hero area
// Used to wrap the main hero content on the home page

export function HeroSection({ children }: { children: React.ReactNode }) {
    return (
        // Main hero section with responsive horizontal padding and top padding for header
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-20 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[32px]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mx-auto w-full"
            >
                {children}
            </motion.div>
        </section>
    )
}

export default HeroSection
