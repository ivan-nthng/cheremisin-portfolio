'use client'

import React from 'react'
import { motion, animate } from 'framer-motion'

// Header component for the portfolio site
// Fixed at the top, includes navigation and logo, with Framer Motion animation and smooth scroll

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

export function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 py-4 flex justify-between items-center backdrop-blur-md px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[32px] bg-background text-text"
        >
            {/* Navigation links with smooth scroll */}
            <nav className="flex items-center gap-4">
                <button
                    type="button"
                    className="text-md font-normal hover:underline cursor-pointer bg-transparent border-none p-0"
                    onClick={() => scrollToSection('projects')}
                >
                    Projects
                </button>
                <button
                    type="button"
                    className="text-md font-normal hover:underline cursor-pointer bg-transparent border-none p-0"
                    onClick={() => scrollToSection('about')}
                >
                    About
                </button>
                <button
                    type="button"
                    className="text-md font-normal hover:underline cursor-pointer bg-transparent border-none p-0"
                    onClick={() => scrollToSection('contacts')}
                >
                    Contacts
                </button>
            </nav>
            {/* Logo (right) */}
            <a href="#" className="flex items-center gap-2 select-none">
                <span className="sr-only">Ivan Cheremisin</span>
                {/* SVG logo */}
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M35 23.75C35 29.9632 29.9632 35 23.75 35C17.5368 35 12.5 29.9632 12.5 23.75C12.5 17.5368 17.5368 12.5 23.75 12.5C29.9632 12.5 35 17.5368 35 23.75Z"
                        fill="white"
                    />
                    <path
                        d="M24 8C15.9601 8 0 16.1342 0 24.0895C0 32.0447 15.9601 40 23.9402 40C31.9202 40 48 32.0447 48 24.0895C48 16.1342 32.0399 8 24 8ZM17.5661 31.7415L16.1546 30.3344L19.5212 26.9782H22.3441L17.5661 31.7415ZM24.9227 33.959H22.9277V26.9832H24.9227V33.959ZM30.2843 31.7415L25.5062 26.9782H28.3292L31.6958 30.3344L30.2843 31.7415ZM33.9152 24.9944H13.9352V23.0056H21.5162L16.1546 17.6607L17.5661 16.2536L22.9277 21.5985V14.041H24.9227V21.5985L30.2843 16.2536L31.6958 17.6607L26.3342 23.0056H33.9152V24.9944Z"
                        fill="black"
                    />
                </svg>
            </a>
        </motion.header>
    )
}

export default Header
