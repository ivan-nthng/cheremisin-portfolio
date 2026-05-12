'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import {
    DossierBar,
    DossierFrame,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface BentoItem {
    title: string
    description: string
    image?: string
    imageDark?: string
}

interface ProjectBentoProps {
    items?: BentoItem[]
}

export default function ProjectBento({ items }: ProjectBentoProps) {
    const defaultImprovements: BentoItem[] = [
        {
            title: 'Context-Aware Interface',
            description:
                'Incoming requests auto-populate with relevant ride, payment, and user history data.',
        },
        {
            title: 'AI-Powered Suggestions',
            description:
                'Predictive actions help operators solve cases faster with minimal cognitive effort.',
        },
        {
            title: 'Scenario-Based Widgets',
            description:
                "Each request type triggers a dynamic layout showing only what's needed: fare breakdowns, map routes, payment logs, and supporting context.",
        },
        {
            title: 'Pre-filtering Logic',
            description:
                'Non-actionable requests are triaged before reaching an operator.',
        },
    ]
    const improvements = items ?? defaultImprovements

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="py-12 sm:py-16"
        >
            <DossierFrame>
                <DossierBar label="Section" index="08" state="Actions" />
                <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                    <DossierSectionHeading
                        label="Changes"
                        title="What changed"
                        description="The main changes in the product and the support workflow."
                    />

                    <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                        {improvements.map((item, index) => (
                            <div
                                key={`${item.title}-${index}`}
                                className="bg-surface px-4 py-4"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted">
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>
                                    <Check className="h-4 w-4 text-accent" />
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
        </motion.section>
    )
}
