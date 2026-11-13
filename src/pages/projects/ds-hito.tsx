import { caseStructuredData } from '@/lib/seo'
import Head from 'next/head'
import HitoCase from '@/components/hito-case/HitoCase'
import { isIndexablePath, pageMetadata, socialImage } from '@/lib/seo'

const title = 'Hito DS — Ivan Cheremisin'
const description = 'An AI-first design system for small teams and solo developers, with semantic tokens and native React examples.'
const canonical = String(pageMetadata('/projects/ds-hito', title, description).alternates?.canonical)

export default function DsHitoPage() {
  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={isIndexablePath('/projects/ds-hito') ? 'index, follow' : 'noindex, follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage.url} />
      <meta property="og:image:alt" content={socialImage.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage.url} />
      <meta name="twitter:image:alt" content={socialImage.alt} />
    </Head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStructuredData('/projects/ds-hito', 'Hito DS', 'An AI-first design system for small teams and solo developers, with semantic tokens and native React examples.')).replace(/</g, '\\u003c') }} />
    <HitoCase />
  </>
}
