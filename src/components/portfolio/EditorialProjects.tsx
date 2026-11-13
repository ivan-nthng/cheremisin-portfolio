import Link from 'next/link'
import { projects } from '@/lib/projects'
import { RepeatReveal } from './RepeatReveal'
import { PortfolioArrow } from './PortfolioArrow'
import { ProjectStatusTooltip } from './ProjectStatusTooltip'
import { HomeProjectPreviews } from './HomeProjectPreviews'

const previewByHref = {
  '/projects/taxi-aggregator-support-workspace': 'citymobil',
  '/projects/ds-hito': 'hito',
  '/projects/litres': 'litres',
  '/projects/litres-library': 'libraries',
  '/projects/metabox': 'metabox',
} as const

export function EditorialProjects({ pending = false }: { pending?: boolean }) {
  const rows = projects.filter(project => !project.isComingSoon).map(project => {
    const website = project.projectWebsite
    const href = website?.href ?? project.companyUrl
    const preview = previewByHref[project.link as keyof typeof previewByHref]
    const content = <article className="editorial-project">
        <h3>{pending && !project.isActive
          ? <ProjectStatusTooltip title={project.title} />
          : <Link className="editorial-link" href={project.link}
            data-home-project-preview={pending ? preview : undefined}
            prefetch={pending && project.link === '/projects/ds-hito' ? false : undefined}>
            {project.title}<PortfolioArrow direction="right" />
          </Link>}
        </h3>
        <p>{project.description}</p>
        {project.role && <p className="portfolio-type-technical">Role {project.role}</p>}
        <div className="company-attribution">{href ? <>
          <span>{website ? 'Personal project /' : 'Company / client ·'}</span>
          <a className="editorial-link" href={href} target="_blank" rel="noreferrer">{website?.label ?? project.companyName}<PortfolioArrow /></a>
          {!website && project.companyContext && <span>{project.companyContext}</span>}
        </> : <span>{project.companyName ? `Company / client · ${project.companyName}` : 'Personal project'}</span>}</div>
      </article>
    return <RepeatReveal clearDock={pending} key={project.title}>{content}</RepeatReveal>
  })
  return pending ? <HomeProjectPreviews>{rows}</HomeProjectPreviews> : <div className="editorial-projects">{rows}</div>
}
