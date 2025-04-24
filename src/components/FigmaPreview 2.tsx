'use client'

import { cn } from '@/lib/utils'

interface FigmaPreviewProps {
    embedUrl: string
    title?: string
}

export function FigmaPreview({
    embedUrl,
    title = 'Figma Preview',
}: FigmaPreviewProps) {
    return (
        <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Figma Preview Container */}
                <div className="lg:col-span-8">
                    <div className="relative w-full rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg overflow-hidden bg-blue-50/50 dark:bg-blue-950/50">
                        {/* 16:9 aspect ratio container */}
                        <div className="relative w-full aspect-[16/9]">
                            <iframe
                                src={embedUrl}
                                title={title}
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Reserved for future content */}
                <div className="lg:col-span-4">
                    {/* Placeholder for future content */}
                </div>
            </div>
        </div>
    )
}
