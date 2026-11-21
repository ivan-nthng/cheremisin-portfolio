import { describe, expect, it } from 'vitest'
import { caseStructuredData, homeStructuredData, indexablePaths, pageMetadata, siteUrl } from '@/lib/seo'
import sitemap from '@/app/sitemap'

describe('published portfolio discovery contract', () => {
  it('indexes Home, Citymobil and the four approved case studies only', () => {
    expect(indexablePaths).toEqual([
      '/', '/projects/taxi-aggregator-support-workspace', '/projects/litres', '/projects/ds-hito',
      '/projects/litres-library', '/projects/metabox',
    ])
    for (const path of indexablePaths) expect(pageMetadata(path, 'Title', 'Description').robots).toMatchObject({ index: true })
    for (const path of ['/projects/saavi', '/preview/metabox', '/preview/metabox-case', '/preview/litres-library-case', '/preview/litres-readers', '/projects/litres/demo', '/manifesto']) {
      expect(pageMetadata(path, 'Title', 'Description').robots).toMatchObject({ index: false })
    }
  })

  it('lists every admitted canonical once and keeps previews out of the sitemap', () => {
    const urls = sitemap().map(item => item.url)
    expect(new Set(urls).size).toBe(urls.length)
    expect(urls).toEqual(indexablePaths.map(path => new URL(path, siteUrl).href))
    expect(urls.some(url => /preview|demo|saavi/.test(url))).toBe(false)
  })

  it('connects the profile and case to the same Person', () => {
    const graph = homeStructuredData['@graph']
    const person = graph.find(node => node['@type'] === 'Person')
    expect(person?.jobTitle).toContain('Product Builder')
    expect(graph.find(node => node['@type'] === 'ProfilePage')?.mainEntity).toEqual({ '@id': `${siteUrl}/#person` })
    expect(caseStructuredData('/projects/taxi-aggregator-support-workspace', 'Citymobil', 'Case').author)
      .toEqual({ '@id': person?.['@id'] })
  })
})
