'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ProjectPageShell } from '@/components/ProjectPageShell'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierPage,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

const manifestoSections = [
    {
        label: 'Principles',
        items: [
            'Be kind.',
            'Do the right thing, even when it costs more.',
            'Do not look away from obvious problems.',
            "Respect other people's time and work.",
            'If something makes no sense, say it plainly.',
            'Make time for the people who matter.',
        ],
    },
    {
        label: 'How I work',
        items: [
            'Creativity is a tool, not the point.',
            'Do not polish a weak idea. Fix the idea first.',
            'Learn the rules before you try to break them.',
            'If the result keeps failing, change the process.',
            'Simple systems are easier to understand and trust.',
        ],
    },
    {
        label: 'Mindset',
        items: [
            'If a mistake can be fixed, fix it and move on.',
            'Look at familiar things with fresh attention.',
            'Tools should support the message, not compete with it.',
            'Write things down. Your brain is for thinking, not storage.',
            'Hope helps. Action changes things.',
        ],
    },
    {
        label: 'Professional',
        items: [
            'Every design decision needs a reason.',
            'Context matters. Do not judge work without understanding the people and constraints behind it.',
            'Good systems reduce noise and repeated work.',
            'Clear structure beats clever decoration.',
            'Do the best work the situation allows, then make the situation better.',
        ],
    },
] as const

export function ManifestoContent() {
    return (
        <ProjectPageShell>
            <DossierPage>
                <DossierFrame>
                    <DossierBar label="Route" index="M" state="Manifesto" />
                    <div className="grid gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                        <DossierMediaViewport
                            label="img 00"
                            title="Avatar"
                            note="route marker"
                        >
                            <div className="flex aspect-square items-center justify-center bg-background">
                                <Image
                                    src="/avatar-256.png"
                                    alt="Avatar"
                                    width={160}
                                    height={160}
                                    className="h-auto w-32 sm:w-40"
                                    priority
                                />
                            </div>
                        </DossierMediaViewport>

                        <DossierSectionHeading
                            label="Manifesto"
                            title="Manifesto"
                            description="Notes I come back to when I design, write, and work with people."
                        />
                    </div>
                </DossierFrame>

                <div className="space-y-8">
                    {manifestoSections.map((section, index) => (
                        <motion.div
                            key={section.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.24, delay: index * 0.04 }}
                        >
                            <DossierFrame>
                                <DossierBar
                                    label="Section"
                                    index={String(index + 1).padStart(2, '0')}
                                    state={section.label}
                                />
                                <div className="px-4 py-6 sm:px-6 sm:py-8">
                                    <DossierSectionHeading
                                        label={section.label}
                                        title={section.label}
                                    />
                                    <ul className="mt-8 border-t border-dashed border-border pt-6 text-sm leading-7 text-muted">
                                        {section.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-4 border-b border-dashed border-border/70 py-3 last:border-b-0"
                                            >
                                                <span className="text-[11px] uppercase tracking-[0.28em] text-accent">
                                                    &gt;
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </DossierFrame>
                        </motion.div>
                    ))}
                </div>
            </DossierPage>
        </ProjectPageShell>
    )
}
