import type { Metadata } from 'next'
import { HomePage } from '@/components/layout/HomePage'

export const metadata: Metadata = {
    title: 'Ivan Cheremisin',
    description:
        'Portfolio of Ivan Cheremisin, a product designer and engineer working on internal tools, AI features, design systems, and workflow-heavy software.',
}

export default function Home() {
    return <HomePage />
}
