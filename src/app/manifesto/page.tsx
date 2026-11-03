import { ManifestoContent } from '@/components/ManifestoContent'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(
    '/manifesto',
    'Manifesto — Ivan Cheremisin',
    'Notes on how Ivan Cheremisin designs, writes, and works with people.',
)

export default function ManifestoPage() {
    return <ManifestoContent />
}
