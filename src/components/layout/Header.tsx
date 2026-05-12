'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
    HOME_NAV_ITEMS,
    HOME_ROUTE_ITEMS,
    scrollToHomeSection,
    type HomeSectionId,
} from '@/lib/home-shell'

function HomeNavButton({
    id,
    index,
    label,
}: {
    id: HomeSectionId
    index: string
    label: string
}) {
    return (
        <button
            type="button"
            className="inline-flex items-center gap-2 px-1 py-1 text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-foreground"
            onClick={() => scrollToHomeSection(id)}
        >
            <span>[{index}]</span>
            <span>{label}</span>
        </button>
    )
}

export function Header() {
    const pathname = usePathname()
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (pathname !== '/') {
        return null
    }

    const isDark = mounted && resolvedTheme === 'dark'

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-50 border-b border-dashed border-border bg-background/98"
        >
            <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-foreground">
                        <span>[00]</span>
                        <span>Index</span>
                    </span>
                    {HOME_ROUTE_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-foreground"
                        >
                            <span>[{item.index}]</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {HOME_NAV_ITEMS.map((item) => (
                        <HomeNavButton key={item.id} {...item} />
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                            Current page
                        </div>
                        <div className="text-xs uppercase tracking-[0.22em] text-foreground">
                            Home
                        </div>
                    </div>
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

export default Header
