'use client'

import React from 'react'
import {
    DossierBar,
    DossierFrame,
    DossierMetaStrip,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface StatBlock {
    value: string
    label: string
}

interface ProjectOverviewProps {
    stats?: StatBlock[]
    description?: string
    problem?: string
    solution?: string
    impact?: string
}

export default function ProjectOverview({
    stats,
    description,
    problem,
    solution,
    impact,
}: ProjectOverviewProps) {
    return (
        <section className="w-full">
            <div>
                <DossierFrame>
                    <DossierBar label="Section" index="02" state="Overview" />
                    <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                        <div>
                            <DossierSectionHeading
                                label="Story / overview"
                                title="Overview"
                                description={description}
                            />
                        </div>

                        {stats?.length ? (
                            <div>
                                <DossierMetaStrip
                                    items={stats.map((stat) => ({
                                        label: stat.label,
                                        value: (
                                            <span className="text-3xl font-bold leading-none text-foreground sm:text-4xl">
                                                {stat.value}
                                            </span>
                                        ),
                                    }))}
                                />
                            </div>
                        ) : null}
                    </div>
                </DossierFrame>
            </div>
        </section>
    )
}
