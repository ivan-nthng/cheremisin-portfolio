import LitresLibraryCase from '@/app/preview/litres-library-case/page'
import { caseStructuredData, projectMetadata } from '@/lib/seo'

const path = '/projects/litres-library'
export const metadata = projectMetadata(path)

export default function LitresLibraryPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStructuredData(path, 'LitRes Libraries Interface', String(metadata.description))).replace(/</g, '\\u003c') }} />
    <LitresLibraryCase />
  </>
}
