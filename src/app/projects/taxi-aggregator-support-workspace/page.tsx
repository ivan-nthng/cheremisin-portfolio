import CitymobilCase from '@/components/citymobil-case/CitymobilCase'
import { caseStructuredData, projectMetadata, siteUrl } from '@/lib/seo'

const path = '/projects/taxi-aggregator-support-workspace'
const name = 'Citymobil Support Workspace'
const description = 'Messages, trip details, and previous interactions in one support workspace.'

export const metadata = projectMetadata(path, {
  title: name,
  image: {
    url: `${siteUrl}/images/citymobil/case/social-preview.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'Citymobil-branded white taxi beside a sunlit concrete wall.',
  },
})

export default function CitymobilProjectPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(caseStructuredData(path, name, description)).replace(/</g, '\\u003c'),
    }} />
    <CitymobilCase review={false} />
  </>
}
