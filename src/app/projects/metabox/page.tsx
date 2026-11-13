import MetaboxCase from '@/app/preview/metabox-case/page'
import { caseStructuredData, projectMetadata } from '@/lib/seo'

const path = '/projects/metabox'
export const metadata = projectMetadata(path)

export default function MetaboxPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStructuredData(path, '3D Source Metabox', String(metadata.description))).replace(/</g, '\\u003c') }} />
    <MetaboxCase />
  </>
}
