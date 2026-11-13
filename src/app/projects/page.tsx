import { PageReady } from '@/components/portfolio/navigation/PageMotion'
import { EditorialProjects } from '@/components/portfolio/EditorialProjects'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/projects', 'Projects — Ivan Cheremisin', "Ivan Cheremisin’s authored project case studies, including concept work.")
export default function ProjectsPage() {
  return <><PageReady /><main id="main-content" className="editorial-page editorial-index" tabIndex={-1}><h1>Selected Work</h1><p className="section-note">Authored case studies, including concept work.</p><EditorialProjects /></main><PortfolioFooter /></>
}
