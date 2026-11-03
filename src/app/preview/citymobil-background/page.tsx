import type { Metadata } from 'next'
import CitymobilBackgroundPreview from '@/components/citymobil-background/CitymobilBackgroundPreview'

export const metadata: Metadata = {
  title: 'Citymobil — background preview',
  description: 'Local presentation study with original Citymobil interface media.',
  robots: { index: false, follow: false },
}

export default function CitymobilBackgroundPage() {
  return <CitymobilBackgroundPreview />
}
