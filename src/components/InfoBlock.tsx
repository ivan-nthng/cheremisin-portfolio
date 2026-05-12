'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

// Props interface
interface InfoBlockProps {
    header: string
    description: string
    showIcon?: boolean
    dismissible?: boolean
    primaryAction?: {
        label: string
        onClick: () => void
    }
    secondaryAction?: {
        label: string
        onClick: () => void
    }
}

export function InfoBlock({
    header,
    description,
    showIcon = false,
    dismissible = false,
    primaryAction,
    secondaryAction,
}: InfoBlockProps) {
    // State for visibility control
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <AnimatePresence>
            {/* Main container with background and border */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative flex gap-3 border border-border bg-surface px-3 py-3"
            >
                {/* Optional info icon */}
                {showIcon && (
                    <div className="flex-shrink-0 pt-0">
                        <InformationCircleIcon className="h-5 w-5 text-accent" />
                    </div>
                )}

                {/* Content container */}
                <div className="flex-grow space-y-2">
                    {/* Header text */}
                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">
                        {header}
                    </h4>

                    {/* Description text */}
                    <p className="text-xs leading-6 text-muted">
                        {description}
                    </p>

                    {/* Optional action buttons */}
                    {(primaryAction || secondaryAction) && (
                        <div className="flex gap-3 pt-1">
                            {primaryAction && (
                                <button
                                    onClick={primaryAction.onClick}
                                    className="text-xs font-medium text-foreground transition-colors hover:text-accent"
                                >
                                    {primaryAction.label}
                                </button>
                            )}
                            {secondaryAction && (
                                <button
                                    onClick={secondaryAction.onClick}
                                    className="text-xs font-medium text-muted transition-colors hover:text-foreground"
                                >
                                    {secondaryAction.label}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Optional dismiss button */}
                {dismissible && (
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-2 top-2 text-muted transition-colors hover:text-foreground"
                    >
                        <XMarkIcon className="w-4 h-4" />
                        <span className="sr-only">Dismiss</span>
                    </button>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
