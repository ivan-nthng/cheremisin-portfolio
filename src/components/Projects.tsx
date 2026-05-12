import Image from 'next/image'
import Link from 'next/link'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
    DossierTagList,
} from '@/components/ascii/Dossier'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'
import { projects } from '@/lib/projects'

function ProjectPreview({
    title,
    image,
    darkImage,
}: {
    title: string
    image?: string
    darkImage?: string
}) {
    if (!image && !darkImage) {
        return <AsciiAssetFallback kind="img" compact />
    }

    return (
        <div className="relative aspect-[4/3] overflow-hidden bg-background">
            {image ? (
                <Image
                    src={image}
                    alt={`${title} preview`}
                    fill
                    className={darkImage ? 'object-contain p-3 dark:hidden' : 'object-contain p-3'}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                />
            ) : null}
            {darkImage ? (
                <Image
                    src={darkImage}
                    alt={`${title} preview`}
                    fill
                    className="hidden object-contain p-3 dark:block"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                />
            ) : null}
        </div>
    )
}

export default function Projects() {
    return (
        <section id="projects">
            <DossierFrame>
                <DossierBar label="Section" index="01" state="Projects" />
                <div className="px-4 py-6 sm:px-6 sm:py-8">
                    <DossierSectionHeading
                        label="Projects"
                        title="Selected work"
                        description="A selection of products and systems I helped shape. Each case study stays close to the problem, the decisions, and what changed."
                    />

                    <div className="mt-8 border-t border-dashed border-border">
                        {projects.map((project, index) => (
                            <article
                                key={project.link || project.title}
                                className="border-b border-dashed border-border last:border-b-0"
                            >
                                <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
                                    <div className="px-0 py-6 sm:pr-6">
                                        <div className="mb-4 flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-border pb-4">
                                            <div>
                                                <div className="terminal-divider">
                                                    [{String(index + 1).padStart(2, '0')}]
                                                </div>
                                                <h3 className="mt-2 text-xl font-bold leading-tight text-foreground">
                                                    {project.isComingSoon ? (
                                                        project.title
                                                    ) : (
                                                        <Link
                                                            href={project.link}
                                                            className="transition-colors hover:text-accent"
                                                        >
                                                            {project.title}
                                                        </Link>
                                                    )}
                                                </h3>
                                            </div>
                                            <div className="text-right text-[11px] uppercase tracking-[0.22em] text-muted">
                                                <div>
                                                    {project.companyName ||
                                                        'Independent'}
                                                </div>
                                                <div>
                                                    {project.isComingSoon
                                                        ? 'Soon'
                                                        : 'Published'}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm leading-7 text-muted">
                                            {project.description}
                                        </p>

                                        {project.technologies.length > 0 ? (
                                            <DossierTagList
                                                items={project.technologies}
                                                className="mt-6"
                                            />
                                        ) : null}

                                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] uppercase tracking-[0.22em]">
                                            {project.isComingSoon ? (
                                                <span className="text-muted">
                                                    Page coming soon
                                                </span>
                                            ) : (
                                                <Link
                                                    href={project.link}
                                                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                                                >
                                                    <span>&gt;</span>
                                                    <span>Read case study</span>
                                                </Link>
                                            )}
                                            {project.companyUrl ? (
                                                <Link
                                                    href={project.companyUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
                                                >
                                                    <span>|</span>
                                                    Visit company site
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-border pt-4 lg:border-l-0 lg:border-t-0 lg:pl-6 lg:pt-0">
                                        <DossierMediaViewport
                                            label={`img ${String(index + 1).padStart(2, '0')}`}
                                            title={project.title}
                                            note={
                                                project.darkImage
                                                    ? 'light + dark'
                                                    : 'single image'
                                            }
                                            className="h-full border-0"
                                            viewportClassName="h-full"
                                        >
                                            <ProjectPreview
                                                title={project.title}
                                                image={project.image}
                                                darkImage={project.darkImage}
                                            />
                                        </DossierMediaViewport>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </DossierFrame>
        </section>
    )
}
