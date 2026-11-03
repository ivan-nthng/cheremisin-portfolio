import Link from 'next/link'
import { projects } from '@/lib/projects'
import { RepeatReveal } from './RepeatReveal'
import { PortfolioArrow } from './PortfolioArrow'
import { ProjectStatusTooltip } from './ProjectStatusTooltip'

export function EditorialProjects({ pending = false }: { pending?: boolean }) {
  return <div className="editorial-projects">{projects.filter(p => !p.isComingSoon).map(project => (
    <RepeatReveal key={project.link}>
      <article className="editorial-project">
        <h3>{pending ? <ProjectStatusTooltip title={project.title} /> : <Link className="editorial-link" href={project.link}>{project.title}<PortfolioArrow direction="right" /></Link>}</h3>
        <p>{project.description}</p>
        <p>Project role · {project.role}</p>
        <div className="company-attribution">{project.companyUrl ? <><span>Company / client ·</span><a className="editorial-link" href={project.companyUrl} target="_blank" rel="noreferrer">{project.companyName}<PortfolioArrow /></a>{project.companyContext ? <span>{project.companyContext}</span> : null}</> : <span>Personal project</span>}</div>
      </article>
    </RepeatReveal>
  ))}</div>
}
