import type { Metadata } from 'next'
import MetaboxDemo from '@/components/metabox/MetaboxDemo'

export const metadata: Metadata = {
  title: 'Metabox camera demo',
  robots: { index: false, follow: false },
}

export default function MetaboxPreview() {
  return <MetaboxDemo />
}
