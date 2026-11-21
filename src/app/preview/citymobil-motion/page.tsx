import type { Metadata } from 'next'
import CitymobilMotionPreview from '@/components/citymobil-motion/CitymobilMotionPreview'

export const metadata: Metadata = {
  title: 'Citymobil — local motion trial',
  description: 'Unpublished motion experiment. Test figures are unverified, not project results.',
  robots: { index: false, follow: false },
}

export default function CitymobilMotionPage() {
  return <CitymobilMotionPreview />
}
