export const demoLinks = {
  citymobil: { slug: 'citymobil', path: '/projects/taxi-aggregator-support-workspace', anchor: 'workspace' },
  publishing: { slug: 'litres-publishing', path: '/projects/litres', anchor: 'workspace' },
  library: { slug: 'litres-libraries', path: '/projects/litres-library', anchor: 'showcase' },
  'metabox-products': { slug: 'metabox', path: '/projects/metabox', anchor: 'showcase' },
  'metabox-camera': { slug: 'metabox-camera', path: '/projects/metabox', anchor: 'demo-metabox-camera' },
  'metabox-projects': { slug: 'metabox-projects', path: '/projects/metabox', anchor: 'demo-metabox-projects' },
  'metabox-suite': { slug: 'metabox-applications', path: '/projects/metabox', anchor: 'demo-metabox-projects' },
  saavi: { slug: 'saavi', path: '/projects/saavi', anchor: 'kitchen' },
} as const

export type DemoLinkId = keyof typeof demoLinks
export const demoShortPath = (id: DemoLinkId) => `/demo/${demoLinks[id].slug}`
