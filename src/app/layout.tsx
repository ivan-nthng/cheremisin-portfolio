import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Ivan Cheremisin - Full Stack Developer',
    description:
        'Portfolio website showcasing my work as a Full Stack Developer specializing in modern web technologies.',
    keywords: [
        'Full Stack Developer',
        'Web Development',
        'React',
        'Next.js',
        'TypeScript',
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
            >
                {children}
            </body>
        </html>
    )
}
