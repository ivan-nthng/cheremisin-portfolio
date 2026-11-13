import type { AppProps } from 'next/app'
import '@/app/globals.css'
import '@/components/portfolio/navigation/page-motion.css'
import { PagesPageMotion } from '@/components/portfolio/navigation/PagesPageMotion'
import '@/components/hito-case/fonts.css'
import '@/components/hito-case/native.generated.css'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'

export default function PreviewApp({ Component, pageProps }: AppProps) {
  return <PagesPageMotion><Component {...pageProps} /><PortfolioFooter /></PagesPageMotion>
}
