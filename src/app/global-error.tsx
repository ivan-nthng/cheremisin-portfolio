'use client'

import React from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    React.useEffect(() => {
        console.error('Global Error:', error)
    }, [error])

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="text-center space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Something went wrong!
                        </h2>
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
