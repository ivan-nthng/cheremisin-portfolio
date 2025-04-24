'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { InfoBlock } from './InfoBlock'

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
        <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start">
                {/* Figma Preview Container */}
                <div className="md:col-span-8 relative w-full rounded-2xl overflow-hidden border border-blue-200/50 dark:border-blue-800/50">
                    <div className="relative w-full aspect-[16/9]">
                        <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 'none' }}
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="md:col-span-4 flex flex-col gap-4 md:pt-6">
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.2,
                        }}
                    >
                        {title && (
                            <h3 className="text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/80">
                                {description}
                            </p>
                        )}
                        <InfoBlock
                            header="Work in Progress"
                            description="This demo file is not final — some sections are still in progress and content may be incomplete"
                            showIcon={true}
                            dismissible={false}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
