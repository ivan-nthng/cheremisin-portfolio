import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
})

export const metadata: Metadata = {
    title: 'Ivan Cheremisin - Product Designer',
    description:
        'Portfolio website of Ivan Cheremisin, a product designer focusing on complex business tools.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${poppins.variable} font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
            >
                {children}
            </body>
        </html>
    )
}
