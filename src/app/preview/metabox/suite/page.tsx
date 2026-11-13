import type { Metadata } from 'next'
import MetaboxSuite from '@/components/metabox/suite/MetaboxSuite'

export const metadata: Metadata = {
  title: 'Metabox Applications',
  robots: { index: false, follow: false },
}

export default function MetaboxApplicationsPreview() {
  return <MetaboxSuite />
}
