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
            <body style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Global Error</h2>
                <pre style={{ color: 'red', margin: '1rem 0' }}>
                    {error?.message}
                </pre>
                <button
                    style={{
                        padding: '0.5rem 1.5rem',
                        borderRadius: 6,
                        background: '#eee',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </body>
        </html>
    )
}
