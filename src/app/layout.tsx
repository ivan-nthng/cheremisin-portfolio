import type { Metadata } from 'next'
import { Poppins, Azeret_Mono } from 'next/font/google'
import './globals.css'

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
    title: 'Ivan Cheremisin - Product Designer',
    description:
        'Portfolio website of Ivan Cheremisin, a product designer focusing on complex business tools.',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${poppins.variable} ${azeretMono.variable} font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
            >
                {children}
            </body>
        </html>
    )
}
