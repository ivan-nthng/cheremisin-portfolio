'use client'

import Link from 'next/link'
import { HOME_SECTION_IDS, scrollToHomeSection } from '@/lib/home-shell'

export function HomeHeroActions() {
    return (
        <div className="flex flex-wrap gap-3">
            <Link
                href="/manifesto"
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
            >
                <span>[M]</span>
                <span>Read notes</span>
            </Link>
            <button
                type="button"
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
                onClick={() => scrollToHomeSection(HOME_SECTION_IDS.projects)}
            >
                <span>&gt;</span>
                <span>View case studies</span>
            </button>
        </div>
    )
}
