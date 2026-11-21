import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'

const manifestoSections = [
    {
        label: 'Rules',
        items: [
            'You are what you can’t stop doing.',
            'Treat everything and everyone in your life as a treasure.',
            "Don't be indifferent. Never.",
            'Every person you met is fighting a battle you know nothing about, so be kind. Always.',
            "If you've got no kind words to say you got to say nothing at all.",
            'You can do what you think is safer and more profitable or you can do the right thing.',
            "Don't make sense of something that doesn't make sense.",
            'Whatever happens tomorrow, we have today.',
            'Appreciate other people’s hard work.',
            'Always find some time to go to the ocean with your kid.',
            'Be obsessively grateful.',
        ],
    },
    {
        label: 'Remember',
        items: [
            'Creativity is not the purpose.',
            'If you want to change yourself, first change what you do and how you do it.',
            'We’re all gonna leave one day, but it’s important to hold on to the end, believing in something. That’s the biggest challenge, because there doesn’t seem to be anything that is really worth believing in.',
            'Don’t keep the box closed.',
            'It’s never gonna be the same again.',
            'One analytic system — good, two — bad, three — good again.',
            "Don't decorate the garbage.",
            'The worst battle is between what you know and what you feel.',
            'To break the rules, you have to know them.',
            'If your purpose in life is to kill and destroy, you will either be killed or everything you value will be destroyed.',
            { text: '“All it takes for evil to triumph is the inaction of good men.”', note: 1 },
            'WHEN THE POWER OF LOVE\nOVER COMES\nLOVE OF POWER ONLY THEN WILL THERE BE A CHANCE FOR TRUE PEACE',
        ],
    },
    {
        label: 'Mindset',
        items: [
            'If the consequences of a mistake can be corrected, it is not a mistake.',
            'I don’t know why I love you but I do.',
            'I can speak but i don’t want to.',
            'Hope is a good thing maybe the best of things.',
            { text: 'A camera is a toolbar learning how to see without a camera.', note: 2 },
            'Don’t try to shoot something new, see old things the new way.',
            { text: "I don't believe you should ever let your tools dominate the message.", note: 3 },
            'The brain is for making ideas, not holding them.',
        ],
    },
    {
        label: 'Professional',
        items: [
            'Working in an environment you know nothing about is like trying to breathe underwater.',
            "Do as well as you can, it'll be original.",
            'Constructivist design translates design principles into practical solutions.',
            'If someone says they know which design is right, spit in his face.',
            "Don't let people discuss your work without you. Context is important.",
        ],
    },
] as const

const closingLines = [
    'Surround yourself only with what truly means something to you.',
    'Senseless things are only noise in your cognitive air.',
    'In the design process, every decision should have a reason.',
]

const noteAuthors = ['Navalny', 'Dorothea Lange', 'Plato']

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
                                {section.items.map((item) => {
                                    const text = typeof item === 'string' ? item : item.text
                                    return <li key={text}>
                                        <RepeatReveal className="manifesto-statement">
                                            <span className="manifesto-marker" aria-hidden="true"><PortfolioArrow direction="right" /></span>
                                            <p className="whitespace-pre-line">{text}{typeof item !== 'string' && <sup>
                                                <a href={`#manifesto-note-${item.note}`} aria-label={`Attribution note ${item.note}`} className="underline">{item.note}</a>
                                            </sup>}</p>
                                        </RepeatReveal>
                                    </li>
                                })}
                            </ul>
                        </section>
                    ))}
                <div className="editorial-row editorial-section portfolio-grid-tracks">
                    <span aria-hidden="true" />
                    <div className="manifesto-statements">
                        {closingLines.map(line => <RepeatReveal key={line}><p>{line}</p></RepeatReveal>)}
                        <aside className="section-note text-sm" aria-label="Attribution notes">
                            <p>Names from my original notes; wording and attribution are unverified.</p>
                            <ol className="list-decimal list-inside">
                                {noteAuthors.map((author, index) => <li id={`manifesto-note-${index + 1}`} key={author}>{author}</li>)}
                            </ol>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    )
}
