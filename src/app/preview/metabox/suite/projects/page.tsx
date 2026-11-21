import type { Metadata } from 'next'
import MetaboxProjectsGrid from '@/components/metabox/suite/MetaboxProjectsGrid'
import { MetaboxSuiteLayout } from '@/components/metabox/suite/MetaboxSuite'

export const metadata: Metadata = {
  title: 'Metabox Projects',
  robots: { index: false, follow: false },
}

export default function MetaboxProjectsPreview() {
  return <MetaboxSuiteLayout title="Projects">
    <MetaboxProjectsGrid />
  </MetaboxSuiteLayout>
}
