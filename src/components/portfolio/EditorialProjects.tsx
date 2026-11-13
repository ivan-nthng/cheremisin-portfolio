import Link from 'next/link'
import { projects } from '@/lib/projects'
import { RepeatReveal } from './RepeatReveal'
import { PortfolioArrow } from './PortfolioArrow'
import { ProjectStatusTooltip } from './ProjectStatusTooltip'

export function EditorialProjects({ pending = false }: { pending?: boolean }) {
  const rows = projects.filter(project => !project.isComingSoon).map(project => {
    const website = project.projectWebsite
    const href = website?.href ?? project.companyUrl
    const content = <article className="editorial-project">
        <h3>{pending && !project.isActive
          ? <ProjectStatusTooltip title={project.title} />
          : <Link className="editorial-link" href={project.link}
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
  return <div className="editorial-projects">{rows}</div>
}
