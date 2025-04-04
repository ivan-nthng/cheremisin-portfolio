import { Poppins, Azeret_Mono } from 'next/font/google'
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
    title: 'Ivan Cheremisin',
    description: 'Portfolio website of Ivan Cheremisin - Software Engineer',
    icons: {
        icon: [
            { url: '/favicons/favicon.ico', sizes: 'any' },
            { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicons/favicon.svg"
                />
                <link rel="alternate icon" href="/favicons/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicons/favicon.svg" />
            </head>
            <body
                className={`${poppins.variable} ${azeretMono.variable} font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
