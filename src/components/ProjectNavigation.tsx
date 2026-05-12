'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'
import { type Project } from '@/lib/projects'

interface ProjectNavigationProps {
    projects: Project[]
    currentProjectIndex: number
}

function PagerCard({
    project,
    direction,
}: {
    project: Project
    direction: 'Previous' | 'Next'
}) {
    return (
        <Link
            href={project.link}
            className="block border-t border-dashed border-border pt-4 transition-colors hover:text-foreground"
        >
            <div className="flex min-h-10 items-center justify-between gap-3 py-2 text-[11px] uppercase tracking-[0.28em] text-muted">
                <span>{direction}</span>
                <span>{project.companyName || 'Independent'}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(240px,0.85fr)]">
                <div className="py-3">
                    <h3 className="text-lg font-bold text-foreground">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                        {project.description}
                    </p>
                </div>
                <div>
                    <DossierMediaViewport
                        label={direction === 'Previous' ? 'img prev' : 'img next'}
                        title={project.title}
                        note={project.darkImage ? 'light + dark' : 'single image'}
                        className="h-full border-0"
                    >
                        {project.image || project.darkImage ? (
                            <div className="relative aspect-[4/3] bg-background">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={
                                            project.darkImage
                                                ? 'object-contain p-3 dark:hidden'
                                                : 'object-contain p-3'
                                        }
                                        sizes="(max-width: 768px) 100vw, 28vw"
                                    />
                                ) : null}
                                {project.darkImage ? (
                                    <Image
                                        src={project.darkImage}
                                        alt={project.title}
                                        fill
                                        className="hidden object-contain p-3 dark:block"
                                        sizes="(max-width: 768px) 100vw, 28vw"
                                    />
                                ) : null}
                            </div>
                        ) : (
                            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-border text-[11px] uppercase tracking-[0.28em] text-muted">
                                No preview available
                            </div>
                        )}
                    </DossierMediaViewport>
                </div>
            </div>
        </Link>
    )
}

function isTypingSurface(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false
    }

    const tagName = target.tagName
    return (
        target.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
    )
}

export default function ProjectNavigation({
    projects,
    currentProjectIndex,
}: ProjectNavigationProps) {
    const router = useRouter()
    const navigableProjects = projects.filter((p) => !p.isComingSoon)
    const currentNavIndex = navigableProjects.findIndex(
        (p) => p.link === projects[currentProjectIndex].link,
    )
    const prevIndex =
        (currentNavIndex - 1 + navigableProjects.length) %
        navigableProjects.length
    const nextIndex = (currentNavIndex + 1) % navigableProjects.length
    const prevProject = navigableProjects[prevIndex]
    const nextProject = navigableProjects[nextIndex]

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.defaultPrevented ||
                event.altKey ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                isTypingSurface(event.target) ||
                document.querySelector('[role="dialog"][aria-modal="true"]')
            ) {
                return
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                router.push(prevProject.link)
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault()
                router.push(nextProject.link)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextProject.link, prevProject.link, router])

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
        >
            <DossierFrame>
                <DossierBar label="Navigation" index="99" state="More projects" />
                <div className="px-4 py-6 sm:px-6 sm:py-8">
                    <DossierSectionHeading
                        label="Navigation"
                        title="Continue browsing"
                        description="Open the previous or next project, or go back to the home page."
                        actions={
                            <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.22em] text-muted sm:items-end">
                                <span>Keys: &larr; previous / &rarr; next</span>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                                >
                                    <span>[00]</span>
                                    <span>Back to home</span>
                                </Link>
                            </div>
                        }
                    />
                    <div className="mt-8 grid gap-8 lg:grid-cols-2">
                        <PagerCard project={prevProject} direction="Previous" />
                        <PagerCard project={nextProject} direction="Next" />
                    </div>
                </div>
            </DossierFrame>
        </motion.div>
    )
}
