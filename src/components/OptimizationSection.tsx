'use client'

import React from 'react'
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
    return (
        <section
            className={cn('w-full py-12 sm:py-16', className)}
        >
            <div>
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

                        <div className="grid gap-px border-[length:var(--stroke-thin)] border-border bg-border md:grid-cols-3">
                            {resolvedItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="bg-surface px-4 py-4"
                                >
                                    <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
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
            </div>
        </section>
    )
}
