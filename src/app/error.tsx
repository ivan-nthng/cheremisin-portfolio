'use client'

import React from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h2 className="text-3xl font-heading mb-4 text-gray-900 dark:text-white">
                    Something went wrong!
                </h2>
                <p className="text-lg font-mono mb-8 text-gray-600 dark:text-gray-400">
                    {error.message}
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 font-mono bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
