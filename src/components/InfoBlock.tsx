'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

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
                className="relative flex gap-3 px-3 py-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/80 border border-blue-200/50 dark:border-blue-800/50"
            >
                {/* Optional info icon */}
                {showIcon && (
                    <div className="flex-shrink-0 pt-0">
                        <InformationCircleIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    </div>
                )}

                {/* Content container */}
                <div className="flex-grow space-y-2">
                    {/* Header text */}
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        {header}
                    </h4>

                    {/* Description text */}
                    <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                        {description}
                    </p>

                    {/* Optional action buttons */}
                    {(primaryAction || secondaryAction) && (
                        <div className="flex gap-3 pt-1">
                            {primaryAction && (
                                <button
                                    onClick={primaryAction.onClick}
                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    {primaryAction.label}
                                </button>
                            )}
                            {secondaryAction && (
                                <button
                                    onClick={secondaryAction.onClick}
                                    className="text-sm font-medium text-blue-600/70 dark:text-blue-400/70 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
                        className="absolute top-2 right-2 text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        <XMarkIcon className="w-4 h-4" />
                        <span className="sr-only">Dismiss</span>
                    </button>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
