import { EditorialProjects } from '@/components/portfolio/EditorialProjects'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/projects', 'Projects — Ivan Cheremisin', "Ivan Cheremisin’s authored project case studies, including concept work.")
export default function ProjectsPage() {
  return <main id="main-content" className="editorial-page editorial-index" tabIndex={-1}><h1>Projects Done</h1><p className="section-note">Authored case studies, including concept work.</p><EditorialProjects /></main>
}
