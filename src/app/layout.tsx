import { Poppins, Azeret_Mono } from 'next/font/google'
import Script from 'next/script'
import Providers from '@/components/Providers'
import './globals.css'
import { Metadata } from 'next'

const poppins = Poppins({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
})

const azeretMono = Azeret_Mono({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-azeret-mono',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://cheremisin.com'),
    title: {
        default: 'Ivan Cheremisin — Product Designer',
        template: '%s — Ivan Cheremisin',
    },
    description:
        'Portfolio of Ivan Cheremisin, Product Designer specializing in AI Tools, B2B, and SaaS.',
    authors: [{ name: 'Ivan Cheremisin' }],
    keywords: [
        'Product Designer',
        'UX',
        'UI',
        'AI Tools',
        'SaaS',
        'B2B',
        'Ivan Cheremisin',
    ],
    openGraph: {
        type: 'website',
        siteName: 'Ivan Cheremisin Portfolio',
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
    icons: {
        icon: [
            { url: '/favicons/favicon.ico', sizes: 'any' },
            { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: '/',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicons/favicon.svg"
                />
                <link rel="alternate icon" href="/favicons/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    href="/favicons/apple-touch-icon.png"
                />
                <meta
                    property="og:image"
                    content="https://cheremisin.co.uk/og-image.jpg"
                />
                <meta
                    name="twitter:image"
                    content="https://cheremisin.co.uk/og-image.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="image"
                    content="https://cheremisin.co.uk/og-image.jpg"
                />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-W1K2TLVJ29"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-W1K2TLVJ29');
                    `}
                </Script>
            </head>
            <body
                className={`${poppins.variable} ${azeretMono.variable} font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                suppressHydrationWarning
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
