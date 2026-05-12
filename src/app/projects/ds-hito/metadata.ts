import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
    return {
        title: 'Design System Hito',
        description:
            'A design system built on semantic tokens, helping teams keep components consistent across products and screen sizes.',
        openGraph: {
            title: 'Design System Hito — Ivan Cheremisin',
            description:
                'A design system built on semantic tokens, helping teams keep components consistent across products and screen sizes.',
            images: [
                {
                    url: '/hito/main-light.png',
                    width: 1200,
                    height: 630,
                    alt: 'Design System Hito Preview',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Design System Hito — Ivan Cheremisin',
            description:
                'A design system built on semantic tokens, helping teams keep components consistent across products and screen sizes.',
            images: ['/hito/main-light.png'],
        },
    }
}
