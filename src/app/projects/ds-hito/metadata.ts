import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
    return {
        title: 'Design System Hito',
        description:
            'A semantic variable-based system for building scalable, adaptive UI components. Created to help designers and developers work with consistent spacing, typography, and tokens.',
        openGraph: {
            title: 'Design System Hito — Ivan Cheremisin',
            description:
                'A semantic variable-based system for building scalable, adaptive UI components. Created to help designers and developers work with consistent spacing, typography, and tokens.',
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
                'A semantic variable-based system for building scalable, adaptive UI components. Created to help designers and developers work with consistent spacing, typography, and tokens.',
            images: ['/hito/main-light.png'],
        },
    }
}
