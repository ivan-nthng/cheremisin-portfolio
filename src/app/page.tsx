import { HomePage } from '@/components/layout/HomePage'
import { homeDescription, homeStructuredData, homeTitle, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/', homeTitle, homeDescription)

export default function Home() {
    return <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c'),
        }} />
        <HomePage />
    </>
}
