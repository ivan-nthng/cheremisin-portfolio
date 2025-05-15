import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
    return {
        title: 'Home',
        description:
            'Portfolio of Ivan Cheremisin, Product Designer specializing in AI Tools, B2B, and SaaS.',
        openGraph: {
            title: 'Ivan Cheremisin — Product Designer',
            description:
                'Portfolio of Ivan Cheremisin, Product Designer specializing in AI Tools, B2B, and SaaS.',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Ivan Cheremisin Portfolio Preview',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Ivan Cheremisin — Product Designer',
            description:
                'Portfolio of Ivan Cheremisin, Product Designer specializing in AI Tools, B2B, and SaaS.',
            images: ['/og-image.jpg'],
        },
    }
}
