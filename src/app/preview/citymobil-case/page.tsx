import type { Metadata } from 'next'
import CitymobilCase from '@/components/citymobil-case/CitymobilCase'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'

export const metadata: Metadata = {
  title: 'Citymobil case — local review',
  description: 'Local review of the Citymobil case introduction, draft comparison and product showcase.',
  robots: { index: false, follow: false },
}

export default function CitymobilCasePage() { return <><CitymobilCase/><PortfolioFooter /></> }
