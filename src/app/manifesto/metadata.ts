import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
    return {
        title: 'Manifesto',
        description:
            'Notes on how Ivan Cheremisin designs, writes, and works with people.',
        openGraph: {
            title: 'Manifesto — Ivan Cheremisin',
            description:
                'Notes on how Ivan Cheremisin designs, writes, and works with people.',
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
                'Notes on how Ivan Cheremisin designs, writes, and works with people.',
            images: ['/avatar-256.png'],
        },
    }
}
