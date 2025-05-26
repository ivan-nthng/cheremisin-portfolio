import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
    return {
        title: 'Manifesto',
        description:
            'Personal manifesto of Ivan Cheremisin - core principles, beliefs, and professional values that guide my work and life.',
        openGraph: {
            title: 'Manifesto — Ivan Cheremisin',
            description:
                'Personal manifesto of Ivan Cheremisin - core principles, beliefs, and professional values that guide my work and life.',
            images: [
                {
                    url: '/avatar-256.png',
                    width: 256,
                    height: 256,
                    alt: 'Ivan Cheremisin Avatar',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Manifesto — Ivan Cheremisin',
            description:
                'Personal manifesto of Ivan Cheremisin - core principles, beliefs, and professional values that guide my work and life.',
            images: ['/avatar-256.png'],
        },
    }
}
