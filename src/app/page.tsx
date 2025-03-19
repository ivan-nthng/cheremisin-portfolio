'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import GridOverlay from '@/components/GridOverlay'

export default function Home() {
    const [isGridVisible, setIsGridVisible] = useState(false)

    return (
        <>
            <GridOverlay isVisible={isGridVisible} />
            <main className="relative">
                <Header
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />
                <Hero />
                <Projects />
                <About />
                <Contact />
            </main>
        </>
    )
}
