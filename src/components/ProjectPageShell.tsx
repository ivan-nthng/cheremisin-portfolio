'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import GridOverlay from '@/components/GridOverlay'
import ProjectHeader from '@/components/ProjectHeader'

interface ProjectPageShellProps {
    children: ReactNode
}

export function ProjectPageShell({ children }: ProjectPageShellProps) {
    const [isGridVisible, setIsGridVisible] = useState(false)

    return (
        <>
            <GridOverlay show={isGridVisible} />
            <main className="relative min-h-screen bg-background text-foreground">
                <ProjectHeader
                    isGridVisible={isGridVisible}
                    onToggleGrid={() => setIsGridVisible(!isGridVisible)}
                />
                {children}
            </main>
        </>
    )
}
