import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { ContactLinks } from '@/components/portfolio/ContactLinks'

const manifestoSections = [
    {
        label: 'Principles',
        items: [
            'Be kind.',
            'Do the right thing, even when it costs more.',
            'Do not look away from obvious problems.',
            "Respect other people's time and work.",
            'If something makes no sense, say it plainly.',
            'Make time for the people who matter.',
        ],
    },
    {
        label: 'How I work',
        items: [
            'Creativity is a tool, not the point.',
            'Do not polish a weak idea. Fix the idea first.',
            'Learn the rules before you try to break them.',
            'If the result keeps failing, change the process.',
            'Simple systems are easier to understand and trust.',
        ],
    },
    {
        label: 'Mindset',
        items: [
            'If a mistake can be fixed, fix it and move on.',
            'Look at familiar things with fresh attention.',
            'Tools should support the message, not compete with it.',
            'Write things down. Your brain is for thinking, not storage.',
            'Hope helps. Action changes things.',
        ],
    },
    {
        label: 'Professional',
        items: [
            'Every design decision needs a reason.',
            'Context matters. Do not judge work without understanding the people and constraints behind it.',
            'Good systems reduce noise and repeated work.',
            'Clear structure beats clever decoration.',
            'Do the best work the situation allows, then make the situation better.',
        ],
    },
] as const

export function ManifestoContent() {
    return (
        <main id="main-content" className="editorial-page manifesto-page portfolio-grid-lane portfolio-grid-page" tabIndex={-1}>
            <h1 className="sr-only">Manifesto</h1>
            <RepeatReveal className="editorial-intro">
                <p>Notes I come back to when I design, write, and work with people.</p>
            </RepeatReveal>
            <div className="manifesto-groups">
                    {manifestoSections.map((section, index) => (
                        <section
                            key={section.label}
                            className={`editorial-row portfolio-grid-tracks${index > 0 ? ' editorial-section' : ''}`}
                            aria-labelledby={`manifesto-group-${index}`}
                        >
                            <RepeatReveal><h2 id={`manifesto-group-${index}`}>{section.label}</h2></RepeatReveal>
                            <ul className="manifesto-statements" role="list">
                                {section.items.map((item) => (
                                    <li key={item}>
                                        <RepeatReveal className="manifesto-statement">
                                            <span className="manifesto-marker" aria-hidden="true"><PortfolioArrow direction="right" /></span>
                                            <p>{item}</p>
                                        </RepeatReveal>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
            </div>
            <footer className="editorial-section">
                <RepeatReveal>
                    <h2>Contact</h2>
                    <nav className="editorial-footer-contacts" aria-label="Footer contacts">
                        <ContactLinks />
                    </nav>
                </RepeatReveal>
            </footer>
        </main>
    )
}
