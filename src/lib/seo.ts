import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import { contacts, homeIdentity } from '@/lib/site-content'

export const siteUrl = 'https://www.cheremisin.co.uk'
export const siteName = 'Ivan Cheremisin'
export const homeTitle = `${siteName} — Product Designer & Product Builder`
export const homeDescription =
  'Ivan Cheremisin is a product designer and product builder working on internal tools, AI features, design systems, and workflow-heavy software.'

export const socialImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Ivan Cheremisin — Product designer and Product builder',
}

export const indexablePaths = [
  '/',
  '/projects/taxi-aggregator-support-workspace',
  '/projects/litres',
  '/projects/ds-hito',
  '/projects/litres-library',
  '/projects/metabox',
] as const

export function isIndexablePath(path: string) {
  return (indexablePaths as readonly string[]).includes(path)
}

/** Keep other routes crawlable and noindex. */
export function pageMetadata(path: string, title: string, description: string, image = socialImage): Metadata {
  const url = new URL(path, siteUrl).href
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: isIndexablePath(path), follow: true },
    openGraph: {
      type: 'website',
      siteName,
      locale: 'en_US',
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  }
}

export function projectMetadata(path: string, share?: { title: string; image: typeof socialImage }): Metadata {
  const project = projects.find(project => project.link === path)
  if (!project) throw new Error(`Missing project metadata for ${path}`)
  return pageMetadata(path, `${share?.title ?? project.title} — ${siteName}`, project.description, share?.image)
}

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteName,
      url: `${siteUrl}/`,
      jobTitle: ['Product Designer', 'Product Builder', 'Film Director'],
      description: homeIdentity.introduction.join(' '),
      knowsAbout: [
        'Support operations workflows',
        'Author and publisher dashboards',
        'Semantic design tokens',
        'Figma component systems',
        'Research workflows',
      ],
      sameAs: contacts
        .filter(contact => contact.label === 'LinkedIn' || contact.label === 'GitHub')
        .map(contact => contact.href),
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: homeTitle,
      description: homeDescription,
      inLanguage: 'en',
      author: { '@id': `${siteUrl}/#person` },
    },
  ],
}

export function caseStructuredData(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': new URL(path, siteUrl).href,
    url: new URL(path, siteUrl).href,
    name,
    description,
    author: { '@id': `${siteUrl}/#person` },
    isPartOf: { '@id': `${siteUrl}/#website` },
  }
}
