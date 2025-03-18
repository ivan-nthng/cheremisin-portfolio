'use client'

import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import GridOverlay from '@/components/GridOverlay'

export default function Home() {
    return (
        <main className="relative">
            <Header />
            <Hero />
            <Projects />
            <About />
            <Contact />
            <GridOverlay />
        </main>
    )
}
