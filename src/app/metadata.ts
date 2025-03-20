import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ivan Cheremisin - Product Designer',
    description:
        'Portfolio of Ivan Cheremisin, a Product Designer specializing in user experience and interface design.',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
}
