import type { ReactNode } from 'react'
import Link from 'next/link'
import MetaboxProjectsGrid from './MetaboxProjectsGrid'
import { profile } from '../catalog-fixtures'
import catalog from '../metabox-catalog.module.css'
import shell from '../metabox.module.css'
import styles from './metabox-suite.module.css'

const assets = '/images/metabox/suite/'

const applications = [
  { name: 'Metabox', icon: 'metabox', size: 40, description: 'View, comment and approve your 3D assets', href: '/preview/metabox/products' },
  { name: 'Projects', icon: 'projects', size: 24, description: 'View, comment and approve your 3D assets', href: '/preview/metabox/suite/projects' },
  { name: 'Analytics', icon: 'analytics', size: 24, description: 'View statistics and usage for your 3D solutions.' },
  { name: 'Configurator CMS', icon: 'configurator-cms', size: 24, description: 'Update and manage your configurators.' },
  { name: 'Orchestration', icon: 'orchestration', size: 24, description: 'Manage pixel streaming server orchestration.' },
  { name: '3D Services', icon: '3d-services', size: 40, description: 'VR, AR, 3D architectural and interior renderings.' },
]

export function MetaboxSuiteLayout({ title, children, hosted = false, onOpenApplications, theme }: { theme?: string; title: 'Applications' | 'Projects'; children: ReactNode; hosted?: boolean; onOpenApplications?: () => void }) {
  const isProjects = title === 'Projects'

  return <main id={hosted ? undefined : "main-content"} className={shell.app + ' ' + styles.page} data-theme={theme}>
    <header className={styles.header}>
      <div className={styles.heading}>
        {isProjects
          ? <span className={styles.projectsIcon}><img src={assets + 'projects.svg'} alt="" width={24} height={24} /></span>
          : <img src={assets + 'launch.svg'} alt="" width={36} height={36} />}
        <h1>{title}</h1>
      </div>
      <details className={styles.profile}>
        <summary>
          <span className={catalog.avatar} aria-hidden="true">{profile.initials}</span>
          <span className={styles.profileName}>{profile.name}</span>
          <img src={assets + 'profile-chevron.svg'} alt="" width={20} height={20} />
        </summary>
        <p>{profile.workspace}</p>
      </details>
    </header>
    <div className={styles.content}>{children}</div>
    {isProjects && (onOpenApplications
      ? <button type="button" data-target="metabox-open-applications" onClick={onOpenApplications} className={catalog.powered + ' ' + styles.powered}><img src="/images/metabox/catalog/brand.svg" alt="" width={16} height={16} /> Powered by Metabox</button>
      : <Link href="/preview/metabox/suite" className={catalog.powered + ' ' + styles.powered}>
      <img src="/images/metabox/catalog/brand.svg" alt="" width={16} height={16} /> Powered by Metabox
    </Link>)}
  </main>
}

export default function MetaboxSuite({ hosted = false, projects = false, theme, imageAttempt = 0, onOpenApplications, onLaunch }: { hosted?: boolean; projects?: boolean; theme?: string; imageAttempt?: number; onOpenApplications?: () => void; onLaunch?: (destination: 'products' | 'projects') => void } = {}) {
  return <MetaboxSuiteLayout hosted={hosted} title={projects ? 'Projects' : 'Applications'} theme={theme} onOpenApplications={onOpenApplications}>
    {projects ? <MetaboxProjectsGrid imageAttempt={imageAttempt} /> :
    <ul className={styles.cards} aria-label="Applications">
      {applications.map(app => {
        const launch = <>Launch <img src={assets + 'chevron-right.svg'} alt="" width={20} height={20} /></>

        return <li className={styles.card} key={app.name}>
          <span className={styles.cardIcon}>
            <img key={imageAttempt} data-suite-image src={assets + app.icon + '.svg'} alt="" width={app.size} height={app.size} />
          </span>
          <h2>{app.name}</h2>
          <p>{app.description}</p>
          {app.href
            ? onLaunch
              ? <button type="button" className={styles.launch} aria-label={'Launch ' + app.name}
                data-target={app.name === 'Projects' ? 'metabox-open-projects' : undefined}
                onClick={() => onLaunch(app.name === 'Projects' ? 'projects' : 'products')}>{launch}</button>
              : <Link href={app.href} className={styles.launch} aria-label={'Launch ' + app.name}>{launch}</Link>
            : <button type="button" disabled className={styles.launch} aria-label={'Launch ' + app.name}>{launch}</button>}
        </li>
      })}
    </ul>}
  </MetaboxSuiteLayout>
}
