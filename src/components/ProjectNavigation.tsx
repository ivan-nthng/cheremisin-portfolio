import Link from 'next/link'
import { projects } from '@/lib/projects'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import styles from './project-navigation.module.css'

export default function ProjectNavigation({ href, native = false }: { href: string; native?: boolean }) {
  const active = projects.filter(project => project.isActive && project.link.startsWith('/projects/'))
  const index = active.findIndex(project => project.link === href)
  if (index < 0) return null

  const neighbors = [
    { project: active[index - 1], label: 'Previous', arrow: 'left' },
    { project: active[index + 1], label: 'Next', arrow: 'right' },
  ] as const

  return <nav className={styles.band} aria-label="Project navigation">
    <div className={styles.lane}>
      {neighbors.map(({ project, label, arrow }) => {
        if (!project) return null
        const content = <>
          <div className={styles.copy}>
            <span className={styles.direction}>{label}</span>
            <h3>{project.title}</h3><p>{project.description}</p>
          </div>
          <span className={styles.arrow}><PortfolioArrow direction={arrow} /></span>
        </>
        return native || project.link === '/projects/ds-hito'
          ? <a key={label} href={project.link} className={styles.card} data-direction={label}>{content}</a>
          : <Link key={label} href={project.link} className={styles.card} data-direction={label}>{content}</Link>
      })}
    </div>
  </nav>
}
