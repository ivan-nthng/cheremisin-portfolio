import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/layout/Header'
import { homeEyeBootstrap } from '@/components/layout/home-eye-bootstrap'
import { homeDescription, homeTitle, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: homeTitle,
    description: homeDescription,
    icons: {
        icon: { url: `${siteUrl}/favicon.svg`, type: 'image/svg+xml' },
        shortcut: `${siteUrl}/favicon.svg`,
        apple: { url: `${siteUrl}/apple-icon`, sizes: '180x180', type: 'image/png' },
    },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#3A0823' }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="bg-background text-foreground min-h-screen"
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <>
                        <a
                            href="#main-content"
                            className="fixed left-3 top-3 z-[var(--layer-overlay)] -translate-y-20 bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0"
                        >
                            Skip to main content
                        </a>
                        <Header homeEyeBootstrap={homeEyeBootstrap} />
                        {children}
                    </>
                </ThemeProvider>
            </body>
        </html>
    )
}
