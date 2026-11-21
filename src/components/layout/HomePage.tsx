import { career, personal } from '@/lib/site-content'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { EditorialProjects } from '@/components/portfolio/EditorialProjects'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { ArrowUpRight } from 'lucide-react'
import { DocumentaryPreview } from './DocumentaryPreview'
import { HomePhotoHero } from './HomePhotoHero'

const careerWebsites: Record<string, string> = {
  Saavi: 'https://saavi.cc/',
  '3D Source': 'https://www.3dsource.com/',
  'VK / Citymobil': 'https://vk.com/',
  Wrike: 'https://www.wrike.com/',
  LitRes: 'https://litres.com/',
  Veritonic: 'https://veritonic.com/',
  'Blue Orange Digital': 'https://blueorange.digital/',
  Lugg: 'https://lugg.com/',
}

function CareerRow({ entry }: { entry: (typeof career)[number] }) {
  const [company, role, period, summary, note] = entry
  return <article className="career-row portfolio-grid-tracks"><p className="career-period">{period}{note ? <><br />{note}</> : null}</p><div className="career-details"><h3><a className="editorial-link" href={careerWebsites[company]} target="_blank" rel="noreferrer">{company === 'VK / Citymobil' ? 'VK' : company}<PortfolioArrow /></a></h3><p>{role}</p></div><p className="career-summary">{summary}</p></article>
}

export function HomePage() {
  return <>
  <main id="main-content" className="home-photo-page" aria-labelledby="portfolio-identity" tabIndex={-1}>
    <noscript><style>{'.project-status-trigger, .project-status-description { display: none !important; }'}</style></noscript>
    <HomePhotoHero />
    <div className="editorial-page portfolio-grid-lane portfolio-grid-page">
    <section id="projects" className="editorial-section portfolio-grid-tracks" aria-labelledby="projects-heading">
      <RepeatReveal clearDock><h2 id="projects-heading">Selected Work</h2><p className="section-note">Authored case studies, including concept work.</p></RepeatReveal>
      <EditorialProjects pending />
    </section>
    <section className="editorial-section" aria-labelledby="work-heading">
      <RepeatReveal clearDock className="home-career-lead">
        <div><h2 id="work-heading">Work Experience</h2><p className="section-note">Founder, independent, and team roles; some periods overlap.</p></div>
        <CareerRow entry={career[0]} />
      </RepeatReveal>
      <div className="career-list">{[career[2], career[5], career[6], career[7]].map(entry => <RepeatReveal clearDock key={entry[0]}>
        <CareerRow entry={entry} />
      </RepeatReveal>)}
        <details className="career-more">
          <summary className="editorial-link"><span className="career-more-closed">More</span><span className="career-more-open">Hide</span></summary>
          <div className="career-list">{[career[3], career[4], career[8]].map(entry => <RepeatReveal clearDock key={entry[0]}><CareerRow entry={entry} /></RepeatReveal>)}</div>
        </details>
      </div>
    </section>
    </div>
    <section className="personal-band" aria-labelledby="personal-heading">
      <div className="personal-band-inner">
      <RepeatReveal className="personal-section portfolio-grid-lane">
        <div className="personal-copy">
          <h2 id="personal-heading">Personal</h2>
          {personal.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <nav aria-label="Personal links">
            <a className="editorial-link" href="/manifesto">Manifesto<PortfolioArrow direction="right" /></a>
            <a className="editorial-link" href={personal.instagram} target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="editorial-link" href={personal.photography} target="_blank" rel="noreferrer">Unsplash<ArrowUpRight size={16} aria-hidden="true" /></a>
          </nav>
        </div>
        <DocumentaryPreview />
      </RepeatReveal>
      </div>
    </section>
  </main>
  <PortfolioFooter home />
  </>
}
