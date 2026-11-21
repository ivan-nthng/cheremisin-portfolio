import { caseStructuredData } from '@/lib/seo'
import { pageMetadata } from '@/lib/seo'
import ProjectNavigation from '@/components/ProjectNavigation'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import { CaseStory } from './CaseStory'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import LitresScenes from '@/components/litres-author/LitresScenes'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import { DemoLink } from './DemoLink'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import { HeroPagesRead } from './HeroPagesRead'
import styles from './case.module.css'

export const metadata = pageMetadata('/projects/litres', 'LitRes Publishing Workspace — Ivan Cheremisin', 'A workspace for authors and publishers to track book sales and reader engagement.')

export default function LitresCase() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStructuredData('/projects/litres', 'LitRes Publishing Workspace', 'A workspace for authors and publishers to track book sales and reader engagement.')).replace(/</g, '\\u003c') }} /><CaseStory
    hero={<section className={styles.hero} aria-labelledby="litres-title">
      <div className={styles.rail}>
        <RepeatReveal className={`${styles.heroCopy} ${editorial.exitCopy}`}>
          <img src="/images/litres/author/brand.svg" alt="LitRes" width="124" height="20" />
          <h1 id="litres-title" className={editorial.heroTitle}>One workspace. Two levels of insight.</h1>
          <p>Authors and publishers need to understand how books are performing. I paired a concise overview of readership and sales trends with a deeper, title-level view for exploring each book’s results.</p>
          <div className={styles.heroLinks}>
            <span className={styles.heroDemo}><DemoLink entry="hero" /></span>
            <a className="editorial-link" href="#details">Read the details <PortfolioArrow direction="right" /></a>
          </div>
        </RepeatReveal>
        <div data-case-hero-interface><HeroPagesRead /></div>
      </div>
    </section>}
      intro={<><p>Books / E-books / Digital publishing</p><p>LitRes publishes and distributes e-books and audiobooks.</p></>}
      outcome={<>
        <h2 className={editorial.sectionTitle}>Start with the pattern. Then explore each title.</h2>
        <p>The overview brings key trends into view. From there, publishers can go deeper into individual titles and examine the figures behind the wider picture.</p>
      </>}
      context={<>
        <p>Context</p>
        <h2 className={editorial.sectionTitle}>Two audiences. Two levels.</h2>
        <div className={styles.context}>
          <div><h3>Authors · At a glance</h3><p>Authors want to know whether their work finds readers.</p></div>
          <div><h3>Publishers · In detail</h3><p>Publishers need actionable insights and simpler catalogue operations.</p></div>
        </div>
      </>}
      entry={<DemoLink entry="workspace" />}
      details={<LitresScenes inCase />}
      further={<ProjectNavigation href="/projects/litres" />}
      caseFooter={<PortfolioFooter />}
    /></>
}
