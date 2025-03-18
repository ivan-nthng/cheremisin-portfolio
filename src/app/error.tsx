'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="max-w-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {error.message ||
                        'An unexpected error occurred. Please try again.'}
                </p>
                <button onClick={reset} className="btn">
                    Try again
                </button>
            </div>
        </div>
    )
}
