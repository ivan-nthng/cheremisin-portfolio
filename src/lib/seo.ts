import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import { contacts } from '@/lib/site-content'

export const siteUrl = 'https://www.cheremisin.co.uk'
export const siteName = 'Ivan Cheremisin'
export const homeTitle = `${siteName} — Product Designer`
export const homeDescription =
  'Portfolio of Ivan Cheremisin, a product designer working on internal tools, AI features, design systems, and workflow-heavy software.'

export const socialImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Ivan Cheremisin — Product designer and Product builder',
}

/** Only the temporary homepage is admitted for indexing. Keep every route crawlable. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, siteUrl).href
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: path === '/', follow: true },
    openGraph: {
      type: 'website',
      siteName,
      locale: 'en_US',
      url,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  }
}

export function projectMetadata(path: string): Metadata {
  const project = projects.find(project => project.link === path)
  if (!project) throw new Error(`Missing project metadata for ${path}`)
  return pageMetadata(path, `${project.title} — ${siteName}`, project.description)
}

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteName,
      url: `${siteUrl}/`,
      jobTitle: 'Product Designer',
      sameAs: contacts
        .filter(contact => contact.label === 'LinkedIn' || contact.label === 'GitHub')
        .map(contact => contact.href),
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
