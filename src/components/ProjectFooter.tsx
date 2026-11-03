'use client'

import { Link2, Code2, Mail, Calendar, Camera } from 'lucide-react'
import {
    DossierBar,
    DossierFrame,
    DossierSectionHeading,
    DossierTagList,
} from '@/components/ascii/Dossier'

interface TeamMember {
    role: string
}

interface ProjectFooterProps {
    team: TeamMember[]
    technologies: string[]
    email?: string
    linkedin?: string
    github?: string
    instagram?: string
    bookingLink?: string
}

const socialLinks = [
    { label: 'LinkedIn', icon: Link2, field: 'linkedin' },
    { label: 'GitHub', icon: Code2, field: 'github' },
    { label: 'Instagram', icon: Camera, field: 'instagram' },
] as const

export function ProjectFooter({
    team,
    technologies,
    email = 'ivan@cheremisin.co.uk',
    linkedin = 'https://www.linkedin.com/in/icheremisin/',
    github = 'https://github.com/ivan-nthng',
    instagram = 'https://www.instagram.com/cheremisin.co.uk/',
    bookingLink = 'https://calendly.com/icheremisin/30min',
}: ProjectFooterProps) {
    const linkMap = { linkedin, github, instagram }

    return (
        <div
        >
            <DossierFrame>
                <DossierBar label="Footer" index="98" state="Contact" />
                <div className="px-4 py-6 sm:px-6 sm:py-8">
                    <DossierSectionHeading
                        label="Contact"
                        title="Get in touch"
                        description="If this project is close to what you are building, feel free to reach out."
                    />

                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
                        <section className="border-[length:var(--stroke-thin)] border-border px-4 py-4">
                            <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                                Team
                            </div>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                                {team.map((member, index) => (
                                    <li key={`${member.role}-${index}`}>
                                        {member.role}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="border-[length:var(--stroke-thin)] border-border px-4 py-4">
                            <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                                Stack
                            </div>
                            <DossierTagList items={technologies} className="mt-4" />
                        </section>

                        <section className="border-[length:var(--stroke-thin)] border-border px-4 py-4">
                            <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                                Contact
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-foreground">
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-3 border-[length:var(--stroke-thin)] border-border px-3 py-3 transition-colors hover:bg-surface-muted"
                                >
                                    <Mail className="h-4 w-4 text-accent" />
                                    <span>{email}</span>
                                </a>

                                {socialLinks.map(({ label, icon: Icon, field }) => (
                                    <a
                                        key={label}
                                        href={linkMap[field]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 border-[length:var(--stroke-thin)] border-border px-3 py-3 transition-colors hover:bg-surface-muted"
                                    >
                                        <Icon className="h-4 w-4 text-accent" />
                                        <span>{label}</span>
                                    </a>
                                ))}

                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 border-[length:var(--stroke-thin)] border-border-strong bg-foreground px-3 py-3 text-background transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <Calendar className="h-4 w-4" />
                                    <span>Book a call</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </DossierFrame>
        </div>
    )
}
