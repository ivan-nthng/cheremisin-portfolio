import type { Metadata } from 'next'
import LitresScenes from '@/components/litres-author/LitresScenes'

export const metadata: Metadata = {
  title: 'LitRes — local mini demos',
  description: 'Three animated LitRes author workspace examples with fictional sample data.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function LitresScenesPage() {
  return <LitresScenes />
}
