'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Grid, Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

interface ProjectHeaderProps {
    isGridVisible?: boolean
    onToggleGrid?: () => void
}

function getRouteLabel(pathname: string) {
    if (pathname === '/manifesto') {
        return {
            index: 'M',
            label: 'Readme',
            state: 'Manifesto',
        }
    }

    const slug = pathname.split('/').filter(Boolean).pop() ?? 'index'
    return {
        index: 'P',
        label: 'Case file',
        state: slug.replace(/-/g, ' '),
    }
}

export default function ProjectHeader({
    isGridVisible = false,
    onToggleGrid,
}: ProjectHeaderProps) {
    const pathname = usePathname()
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const routeMeta = getRouteLabel(pathname)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === 'dark'

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-50 border-b border-dashed border-border bg-background/98"
        >
            <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
                    >
                        <span>[00]</span>
                        <span>Index</span>
                    </Link>
                    <Link
                        href="/manifesto"
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-foreground"
                    >
                        <span>[M]</span>
                        <span>Readme</span>
                    </Link>
                </div>

                <div className="hidden text-center sm:block">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                        [{routeMeta.index}] {routeMeta.label}
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-foreground">
                        {routeMeta.state}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {onToggleGrid ? (
                        <button
                            type="button"
                            onClick={onToggleGrid}
                            className="inline-flex h-10 w-10 items-center justify-center border border-dashed border-border text-foreground transition-colors hover:text-accent"
                            aria-label="Toggle grid overlay"
                        >
                            <Grid
                                className={`h-4 w-4 ${
                                    isGridVisible ? 'text-accent' : ''
                                }`}
                            />
                        </button>
                    ) : null}
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center border border-dashed border-border text-foreground transition-colors hover:text-accent"
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                    >
                        {mounted ? isDark ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        ) : (
                            <span className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </motion.header>
    )
}
