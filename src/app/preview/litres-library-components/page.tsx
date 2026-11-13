import type { Metadata } from 'next'
import LibraryComponentsPreview from '@/components/litres-readers/LibraryComponentsPreview'

export const metadata: Metadata = {
  title: 'LitRes Libraries — interface fragments',
  description: 'Local light and dark review of seven LitRes Libraries interface fragments.',
  robots: { index: false, follow: false },
}

export default function LibraryComponentsPage() {
  return <LibraryComponentsPreview />
}
