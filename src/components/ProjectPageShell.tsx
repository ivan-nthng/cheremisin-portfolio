import type { ReactNode } from 'react'
import type { PortfolioProjectId } from '@/lib/portfolio/contracts'
interface ProjectPageShellProps { children: ReactNode; project?: { projectId: PortfolioProjectId; title: string } }
export function ProjectPageShell({ children, project }: ProjectPageShellProps) {
  return <main id="main-content" tabIndex={-1} className="case-content relative min-h-screen bg-background text-foreground">{project?.projectId === 'ds-hito' || project?.projectId === 'peruse' ? <p className="media-boundary">{project.projectId === 'ds-hito' ? 'Media note: Hito image placeholders are empty and existing video attribution is unresolved. These previews are not verified Hito evidence.' : 'Media note: the existing Peruse images duplicate other projects and are not verified Peruse evidence. This case describes concept work.'}</p> : null}{children}</main>
}
