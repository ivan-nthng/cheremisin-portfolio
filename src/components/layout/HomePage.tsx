import { career } from '@/lib/site-content'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { EditorialProjects } from '@/components/portfolio/EditorialProjects'
import { ContactLinks } from '@/components/portfolio/ContactLinks'
import { HomePhotoHero } from './HomePhotoHero'

function CareerRow({ entry }: { entry: (typeof career)[number] }) {
  const [company, role, period, summary, note] = entry
  return <article className="career-row portfolio-grid-tracks"><p className="career-period">{period}{note ? <><br />{note}</> : null}</p><div className="career-details"><h3>{company}</h3><p>{role}</p></div><p className="career-summary">{summary}</p></article>
}

export function HomePage() {
  return <main id="main-content" className="home-photo-page" aria-labelledby="portfolio-identity" tabIndex={-1}>
    <noscript><style>{'.project-status-trigger, .project-status-description { display: none !important; }'}</style></noscript>
    <HomePhotoHero />
    <div className="editorial-page portfolio-grid-lane portfolio-grid-page">
    <section className="editorial-section" aria-labelledby="work-heading">
      <RepeatReveal clearDock className="home-career-lead">
        <div><h2 id="work-heading">Work Experience</h2><p className="section-note">Founder, independent, and team roles; some periods overlap.</p></div>
        <CareerRow entry={career[0]} />
      </RepeatReveal>
      <div className="career-list">{career.slice(1).map(entry => <RepeatReveal key={entry[0]}>
        <CareerRow entry={entry} />
      </RepeatReveal>)}</div>
    </section>
    <section id="projects" className="editorial-section" aria-labelledby="projects-heading">
      <RepeatReveal><h2 id="projects-heading">Projects Done</h2><p className="section-note">Authored case studies, including concept work.</p></RepeatReveal>
      <EditorialProjects pending />
    </section>
    <footer className="editorial-section"><RepeatReveal className="editorial-footer-groups">
      <section aria-labelledby="footer-contact-heading">
        <h2 id="footer-contact-heading">Contact</h2>
        <nav className="editorial-footer-contacts" aria-label="Footer contacts">
          <ContactLinks />
        </nav>
      </section>
    </RepeatReveal></footer>
    </div>
  </main>
}
