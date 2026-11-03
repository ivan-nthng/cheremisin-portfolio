'use client'

import { InfoBlock } from './InfoBlock'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface FigmaPreviewProps {
    embedUrl: string
    title: string
    description: string
}

export function FigmaPreview({
    embedUrl,
    title,
    description,
}: FigmaPreviewProps) {
    return (
        <div className="py-12 sm:py-16">
            <DossierFrame>
                <DossierBar label="Section" index="09" state="Figma preview" />
                <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 md:grid-cols-[minmax(0,1fr)_var(--case-media-aside)]">
                    <DossierMediaViewport
                        label="fig 01"
                        title={title}
                        note="embedded preview"
                    >
                        <div className="relative aspect-[16/9] w-full border-[length:var(--stroke-thin)] border-border bg-background">
                            <iframe
                                src={embedUrl}
                                title={title}
                                className="absolute inset-0 h-full w-full"
                                style={{ border: 'none' }}
                                allowFullScreen
                            />
                        </div>
                    </DossierMediaViewport>

                    <div
                        className="space-y-4 border-[length:var(--stroke-thin)] border-border px-4 py-4"
                    >
                        <DossierSectionHeading
                            label="Figma"
                            title={title}
                            description={description}
                        />
                        <InfoBlock
                            header="Note"
                            description="This file is not final. Some parts are still unfinished."
                            showIcon={true}
                            dismissible={false}
                        />
                    </div>
                </div>
            </DossierFrame>
        </div>
    )
}
