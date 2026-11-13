import ProjectNavigation from '@/components/ProjectNavigation'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { CaseDetails } from '@/components/portfolio/case-story/CaseDetails'
import { CaseHero } from '@/components/portfolio/case-story/CaseHero'
import { CaseTemplate } from '@/components/portfolio/case-story/CaseTemplate'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import chrome from '@/components/citymobil-case/case.module.css'
import { projectMetadata } from '@/lib/seo'
import { projects } from '@/lib/projects'
import KitchenDemoEntry from './KitchenDemoEntry'
import { SaaviWorkflowClips } from './SaaviWorkflowClips'
import { TimeCalculator } from './TimeCalculator'

const projectHref = '/projects/saavi'
const project = projects.find(item => item.link === projectHref)!
const media = '/images/saavi/case'
export const metadata = projectMetadata(projectHref)

export default function SaaviCasePage() {
  return <CaseTemplate data-restored-case className={layout.page}
    hero={<CaseHero headingId="saavi-title" titleSize="large"
      logo={<img src={`${media}/saavi-mark.svg`} alt="Saavi" width={72} height={55} />}
      title="Restaurant-quality meals. More time for life."
      introduction="Saavi makes it easier to plan a week of varied, chef-prepared meals, without cooking from scratch."
      metadata={<div>
        <p className={chrome.role}>Role {project.role}</p>
        <p className={chrome.company}><span>Company / client ·</span><a className="editorial-link" href={project.companyUrl} target="_blank" rel="noreferrer">{project.companyName}<PortfolioArrow /></a></p>
      </div>}
      artwork={{ src: `${media}/hero-v6-desktop.webp`, alt: 'A courier walking across a sunlit court with a white Saavi backpack.', width: 1536, height: 864 }}
      mobileArtwork={{ src: `${media}/hero-v6-mobile.webp`, alt: 'Saavi courier with a white backpack.', width: 816, height: 1020 }}
    />}
    context={<section className={layout.context} aria-labelledby="saavi-context-title">
      <RepeatReveal className={layout.contextIntro}>
        <p className={layout.kicker}>Saavi / Invite-only beta</p>
        <h2 id="saavi-context-title" className={editorial.sectionTitle}>From a weekly plan to the doorstep.</h2>
        <p className={layout.storyIntro}>Customers plan a week of chef-prepared meals in one place. Behind that plan, restaurants prepare the meals and Saavi manages orders and delivery. I founded Saavi and designed the customer, kitchen, admin and delivery workflows.</p>
      </RepeatReveal>
    </section>}
    statistics={<CaseDetails editorial={false} className={layout.detailSection} id="context" aria-labelledby="saavi-statistics-title">
      <TimeCalculator headingId="saavi-statistics-title" />
    </CaseDetails>}
    showcase={<KitchenDemoEntry available={process.env.NODE_ENV === 'development'}
      backdrop={<picture className={layout.photoBackdrop}>
        <source media="(max-width: 640px)" srcSet={`${media}/tabletop-mobile.webp`} width={852} height={1846} />
        <img src={`${media}/tabletop-desktop.webp`} width={1672} height={941} alt="" loading="lazy" draggable={false} />
      </picture>}
    />}
    details={<>
      <CaseDetails editorial={false} className={`${layout.detailSection} ${layout.trackSection}`} id="workflows" aria-labelledby="saavi-workflows-title">
        <RepeatReveal className={layout.contextIntro}>
          <h2 id="saavi-workflows-title" className={editorial.sectionTitle}>Inside the experience</h2>
          <p className={layout.storyIntro}>The kitchen sets up the dish and plans how many portions the restaurant can prepare each day. Saavi’s operations team can then open an order to check what was purchased and where it is in delivery.</p>
          <p className={layout.storyIntro}>The charts use fictional data.</p>
        </RepeatReveal>
        <SaaviWorkflowClips available={process.env.NODE_ENV === 'development'} />
      </CaseDetails>
      <CaseDetails editorial={false} className={layout.detailSection} id="process" aria-labelledby="saavi-process-title">
        <RepeatReveal className={layout.contextIntro}>
          <h2 id="saavi-process-title" className={editorial.sectionTitle}>Design decisions</h2>
          <p className={layout.storyIntro}>I gave kitchens a place to manage their menu and daily capacity. I designed Admin around a different job: following orders across restaurants and opening an individual order when the team needs more detail. Both views support the same weekly meal plan.</p>
        </RepeatReveal>
      </CaseDetails>
    </>}
    further={<ProjectNavigation href={projectHref} />}
    footer={<PortfolioFooter />}
  />
}
