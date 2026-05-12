import Projects from '@/components/Projects'
import {
    DossierBar,
    DossierFrame,
    DossierMetaStrip,
    DossierPage,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'
import { HomeHeroActions } from '@/components/layout/HomeHeroActions'
import { HomeSignal } from '@/components/layout/HomeSignal'
import { HOME_SECTION_IDS } from '@/lib/home-shell'

const introMeta = [
    { label: 'Focus', value: 'Internal tools, SaaS, AI, workflow systems' },
    { label: 'Work', value: 'Product design, systems, front-end' },
    { label: 'Role', value: 'Product designer and engineer' },
    { label: 'Status', value: 'Available for selected projects' },
]

const contactLinks = [
    { label: 'Email', value: 'ivan@cheremisin.co.uk', href: 'mailto:ivan@cheremisin.co.uk' },
    { label: 'LinkedIn', value: 'Ivan Cheremisin', href: 'https://www.linkedin.com/in/icheremisin/' },
    { label: 'GitHub', value: 'ivan-nthng', href: 'https://github.com/ivan-nthng' },
    { label: 'Call', value: 'Book a 30-minute call', href: 'https://calendly.com/icheremisin/30min' },
] as const

export function HomePage() {
    return (
        <main className="min-h-screen">
            <DossierPage>
                <DossierFrame>
                    <DossierBar
                        label="Home Index"
                        index="00"
                        state="Selected work"
                    />
                    <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
                        <div className="space-y-6">
                            <DossierSectionHeading
                                label="Product designer"
                                title="Ivan Cheremisin"
                                description="I design and build products for teams working through complexity: internal tools, design systems, AI features, and workflow-heavy software."
                            />
                            <div className="terminal-rule max-w-2xl pt-4 text-sm leading-7 text-muted">
                                I help turn messy flows into working systems:
                                clearer decisions, fewer handoffs, and
                                interfaces people can use without friction.
                            </div>
                            <HomeHeroActions />
                        </div>

                        <div className="space-y-4">
                            <HomeSignal />
                            <DossierMetaStrip items={introMeta} className="lg:grid-cols-1" />
                            <div className="border-t border-dashed border-border px-1 pt-4 text-[11px] uppercase tracking-[0.28em] text-muted">
                                Use the top navigation to jump to sections or
                                open the manifesto.
                            </div>
                        </div>
                    </div>
                </DossierFrame>

                <Projects />

                <section id={HOME_SECTION_IDS.about}>
                    <DossierFrame>
                        <DossierBar label="Section" index="02" state="About" />
                        <div className="px-4 py-6 sm:px-6 sm:py-8">
                            <DossierSectionHeading
                                label="About"
                                title="I make complex products easier to work with"
                                description="Most often I join products with dense workflows, shared ownership, and too much hidden logic. I bring structure to the flow, the interface, and the system behind it so teams can move faster without losing context."
                            />
                        </div>
                    </DossierFrame>
                </section>

                <section id={HOME_SECTION_IDS.contact}>
                    <DossierFrame>
                        <DossierBar label="Section" index="03" state="Contact" />
                        <div className="px-4 py-6 sm:px-6 sm:py-8">
                            <DossierSectionHeading
                                label="Contact"
                                title="If your product feels harder than it should, let's talk"
                                description="I am happy to talk about internal tools, new product directions, AI features, and design systems that need to become clearer and more usable."
                            />
                            <div className="mt-8 border-t border-dashed border-border">
                                {contactLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={
                                            item.href.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            item.href.startsWith('http')
                                                ? 'noreferrer'
                                                : undefined
                                        }
                                        className="flex min-h-20 flex-col justify-between gap-3 border-b border-dashed border-border px-0 py-4 transition-colors last:border-b-0 hover:text-foreground"
                                    >
                                        <span className="terminal-divider">
                                            {item.label}
                                        </span>
                                        <span className="text-sm text-foreground">
                                            {item.value}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </DossierFrame>
                </section>
            </DossierPage>
        </main>
    )
}
