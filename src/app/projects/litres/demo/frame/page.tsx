import type { Metadata } from 'next'
import LitresAuthor from '@/components/litres-author/LitresAuthor'

export const metadata: Metadata = {
  title: 'LitRes — local author workspace preview',
  description: 'Interactive LitRes author workspace with fictional sample data.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function LitresAuthorPreviewPage() {
  return <LitresAuthor />
}
