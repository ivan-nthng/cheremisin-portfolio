'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
    DossierBar,
    DossierFrame,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface OptimizationItem {
    title: string
    description: string
}

interface OptimizationSectionProps {
    className?: string
    items?: OptimizationItem[]
}

export default function OptimizationSection({
    className,
    items,
}: OptimizationSectionProps) {
    const defaultItems: OptimizationItem[] = [
        {
            title: 'Interface clarity',
            description:
                'The layout puts the most useful actions and information first.',
        },
        {
            title: 'Faster decision-making',
            description:
                'Operators can move through common cases with less switching and fewer manual checks.',
        },
        {
            title: 'Scalable support patterns',
            description:
                'Shared patterns keep the experience consistent as the product grows.',
        },
    ]
    const resolvedItems = items ?? defaultItems
    const [isVisible, setIsVisible] = React.useState(false)
    const sectionRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.25,
                rootMargin: '-50px 0px',
            },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section
            className={cn('w-full py-12 sm:py-16', className)}
            ref={sectionRef}
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.24, ease: 'easeOut' }}
            >
                <DossierFrame>
                    <DossierBar
                        label="Section"
                        index="07"
                        state="Improvements"
                    />
                    <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                        <DossierSectionHeading
                            label="Improvements"
                            title="What improved"
                            description="The main product and workflow changes in this part of the project."
                        />

                        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
                            {resolvedItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="bg-surface px-4 py-4"
                                >
                                    <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                                        Change
                                    </div>
                                    <h3 className="mt-3 text-lg font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-muted">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </DossierFrame>
            </motion.div>
        </section>
    )
}
