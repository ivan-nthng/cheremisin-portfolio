import { Poppins, Azeret_Mono } from 'next/font/google'
import Providers from '@/components/Providers'
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
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
