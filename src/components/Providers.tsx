'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    // Use state to prevent hydration mismatch
    const [mounted, setMounted] = useState(false)

    // Only show the UI after first mount to avoid hydration errors
    useEffect(() => {
        setMounted(true)
    }, [])

    // Return a placeholder during SSR to avoid hydration mismatch
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}
