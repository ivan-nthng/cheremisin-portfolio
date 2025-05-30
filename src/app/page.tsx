'use client'

// Home page for the portfolio site
// Renders the main layout, hero section, and top-level content sections

import Image from 'next/image'
import { HeroSection } from '@/components/layout/HeroSection'
import { Button } from '@/components/ui/Button'
import { animate } from 'framer-motion'

// Smoothly scrolls to a section by id using Framer Motion's animate
function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const target = el.getBoundingClientRect().top + window.scrollY
    animate(window.scrollY, target, {
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1],
        onUpdate: (v) => window.scrollTo(0, v),
    })
}

export default function Home() {
    // Main page layout
    return (
        <main className="flex flex-col min-h-screen">
            {/* Hero section with name, subheader, description, and CTA buttons */}
            <HeroSection>
                {/* Responsive grid: content fits 4 columns on xl screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12">
                    <div className="md:col-span-2 xl:col-span-4">
                        {/* Main heading */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Ivan Cheremisin
                        </h1>
                        {/* Subheader with lighter color */}
                        <div className="text-lg text-neutral-500 font-normal mb-0">
                            Product Designer & Engineer
                        </div>
                        {/* Description paragraph */}
                        <p className="text-md mb-8">
                            Building smart, scalable tools — SaaS, AI, analytics
                            — from idea to deploy.
                        </p>
                        {/* Call-to-action buttons */}
                        <div className="flex gap-4">
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() =>
                                    (window.location.href = '#contact')
                                }
                            >
                                Contact Me
                            </Button>
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => scrollToSection('projects')}
                            >
                                View Projects
                            </Button>
                        </div>
                    </div>
                </div>
            </HeroSection>
            {/* Projects section */}
            <section
                id="projects"
                className="py-24 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[32px]"
            >
                <h2 className="text-3xl font-bold mb-8">Projects</h2>
                {/* Projects content will go here */}
            </section>
            {/* About section */}
            <section
                id="about"
                className="py-24 bg-muted px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[32px]"
            >
                <h2 className="text-3xl font-bold mb-8">About</h2>
                {/* About content will go here */}
            </section>
            {/* Contacts section */}
            <section
                id="contacts"
                className="py-24 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[32px]"
            >
                <h2 className="text-3xl font-bold mb-8">Contacts</h2>
                {/* Contacts content will go here */}
            </section>
        </main>
    )
}
