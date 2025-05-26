'use client'

import React from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    React.useEffect(() => {
        console.error('Error:', error)
    }, [error])

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Something went wrong!</h2>
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
        </div>
    )
}
