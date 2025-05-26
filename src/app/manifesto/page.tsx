'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProjectHeader from '@/components/ProjectHeader'
import GridOverlay from '@/components/GridOverlay'

/**
 * ManifestoPage Component
 *
 * A personal manifesto page that displays core principles, beliefs, and professional values.
 * Features smooth animations, intersection observer for scroll-based reveals, and responsive design.
 *
 * Key Features:
 * - Animated content reveal on scroll
 * - Grid overlay toggle for layout visualization
 * - Responsive typography and spacing
 * - Dark/light mode compatible
 */
export default function ManifestoPage() {
    // State for grid visibility toggle and intersection observer
    const [isGridVisible, setIsGridVisible] = React.useState(false)
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)

    /**
     * Intersection Observer Setup
     * Tracks when the content enters viewport to trigger animations
     * Uses a 25% visibility threshold and -50px top margin for earlier trigger
     */
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

    /**
     * Animation Variants
     *
     * container: Parent animation settings for the entire content block
     * - Slides up and fades in
     * - Uses spring animation for natural movement
     * - Staggers children animations for visual hierarchy
     */
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
                staggerChildren: 0.15, // Delay between each child animation
            },
        },
    }

    /**
     * Individual item animation settings
     * Applied to each section (avatar, header, content blocks)
     * Slightly bouncier spring animation for engaging micro-interactions
     */
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
        <>
            {/* Grid overlay for layout visualization */}
            <GridOverlay show={isGridVisible} />

            <main className="relative">
                {/* Header with grid toggle functionality */}
                <ProjectHeader
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />

                {/* Main content section with intersection observer reference */}
                <section ref={ref} className="relative py-24 sm:py-32">
                    <div className="container mx-auto px-6">
                        {/* Animated container for all content */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate={isVisible ? 'show' : 'hidden'}
                            className="max-w-3xl mx-auto space-y-16"
                        >
                            {/* Avatar image */}
                            <motion.div
                                variants={item}
                                className="flex justify-start"
                            >
                                <Image
                                    src="/avatar-256.png"
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    className="rounded-none"
                                    priority
                                />
                            </motion.div>

                            {/* Page title */}
                            <motion.h1
                                variants={item}
                                className="text-4xl sm:text-5xl font-bold text-blue-950 dark:text-blue-50"
                            >
                                Manifesto
                            </motion.h1>

                            {/* Content sections container */}
                            <motion.div variants={item} className="space-y-12">
                                {/* Rules section - Core principles and daily guidelines */}
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                                        Rules
                                    </h2>
                                    <ul className="space-y-4 text-blue-800/80 dark:text-blue-200/80">
                                        <li>
                                            You are what you can't stop doing
                                        </li>
                                        <li>
                                            Treat everything and everyone in
                                            your life as a treasure
                                        </li>
                                        <li>Don't be indifferent. Never</li>
                                        <li>
                                            Every person you met is fighting a
                                            battle you know nothing about, so be
                                            kind. Always.
                                        </li>
                                        <li>
                                            If you've got no kind words to say
                                            you got to say nothing at all
                                        </li>
                                        <li>
                                            You can do what you think is safer
                                            and more profitable or you can do
                                            the right thing
                                        </li>
                                        <li>
                                            Don't make sense of something that
                                            doesn't make sense
                                        </li>
                                        <li>
                                            Whatever happens tomorrow, we have
                                            today.
                                        </li>
                                        <li>
                                            Appreciate other people's hard work
                                        </li>
                                        <li>
                                            Always find some time to go to the
                                            ocean with your kid
                                        </li>
                                        <li>Be obsessively grateful</li>
                                    </ul>
                                </div>

                                {/* Remember section - Important life lessons and philosophical insights */}
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                                        Remember
                                    </h2>
                                    <ul className="space-y-4 text-blue-800/80 dark:text-blue-200/80">
                                        <li>Creativity is not the purpose</li>
                                        <li>
                                            If you want to change yourself,
                                            first change what you do and how you
                                            do it.
                                        </li>
                                        <li>
                                            We're all gonna leave one day, but
                                            it's important to hold on to the
                                            end, believing in something. That's
                                            the biggest challenge, because there
                                            doesn't seem to be anything that is
                                            really worth believing in.
                                        </li>
                                        <li>Don't keep the box closed</li>
                                        <li>
                                            It's never gonna be the same again
                                        </li>
                                        <li>
                                            One analytic system - good, two -
                                            bad, three - good again.
                                        </li>
                                        <li>Don't decorate the garbage.</li>
                                        <li>
                                            The worst battle is between what you
                                            know and what you feel
                                        </li>
                                        <li>
                                            To break the rules, you have to know
                                            them.
                                        </li>
                                        <li>
                                            If your purpose in life is to kill
                                            and destroy, you will either be
                                            killed or everything you value will
                                            be destroyed.
                                        </li>
                                        <li>
                                            "All it takes for evil to triumph is
                                            the inaction of good men" Navalny
                                        </li>
                                    </ul>
                                </div>

                                {/* Mindset section - Personal perspectives and creative philosophy */}
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                                        Mindset
                                    </h2>
                                    <ul className="space-y-4 text-blue-800/80 dark:text-blue-200/80">
                                        <li>
                                            If the consequences of a mistake can
                                            be corrected, it is not a mistake
                                        </li>
                                        <li>
                                            I don't know why I love you but I do
                                        </li>
                                        <li>I can speak but i don't want to</li>
                                        <li>
                                            Hope is a good thing maybe the best
                                            of things
                                        </li>
                                        <li>
                                            A camera is a toolbar learning how
                                            to see without a camera{' '}
                                            <span className="italic">
                                                Dorothea Lange
                                            </span>
                                        </li>
                                        <li>
                                            Don't try to shoot something new,
                                            see old things the new way
                                        </li>
                                        <li>
                                            I don't believe you should ever let
                                            your tools dominate the message. -{' '}
                                            <span className="italic">
                                                Plato
                                            </span>
                                        </li>
                                        <li>
                                            The brain is for making ideas, not
                                            holding them
                                        </li>
                                    </ul>
                                </div>

                                {/* Professional section - Work principles and design philosophy */}
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                                        Professional
                                    </h2>
                                    <ul className="space-y-4 text-blue-800/80 dark:text-blue-200/80">
                                        <li>
                                            Working in an environment you know
                                            nothing about is like trying to
                                            breathe underwater.
                                        </li>
                                        <li>
                                            Do as well as you can, it'll be
                                            original.
                                        </li>
                                        <li>
                                            Constructivist design translates
                                            design principles into practical
                                            solutions
                                        </li>
                                        <li>
                                            Don't try to shoot something new,
                                            see old things the new way
                                        </li>
                                        <li>
                                            If someone says they know which
                                            design is right, spit in his face.
                                        </li>
                                        <li>
                                            Don't let people discuss your work
                                            without you. Context is important.
                                        </li>
                                        <li>
                                            Surround yourself only with what
                                            truly means something to you.
                                        </li>
                                        <li>
                                            Senseless things are only noise in
                                            your cognitive air.
                                        </li>
                                        <li>
                                            In the design process, every
                                            decision should have a reason.
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    )
}
