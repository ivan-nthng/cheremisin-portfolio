'use client'

import { useState, useEffect } from 'react'
import type { FC } from 'react'

interface GridOverlayProps {
    className?: string
}

const GridOverlay: FC<GridOverlayProps> = ({ className = '' }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'g') {
                e.preventDefault()
                setIsVisible((prev) => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (!isVisible) return null

    return (
        <div
            className={`fixed inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 pointer-events-none z-50 p-4 ${className}`}
        >
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="h-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20"
                />
            ))}
        </div>
    )
}

export default GridOverlay
