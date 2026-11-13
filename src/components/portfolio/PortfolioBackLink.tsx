import Link from 'next/link'
import { PortfolioArrow } from './PortfolioArrow'
import { homeBackHref } from './navigation/policy'

export function PortfolioBackLink({ from }: { from: string }) {
  return <Link href={homeBackHref(from)} className="editorial-link context-back" aria-label="Back to home">
    <span className="context-control-label"><PortfolioArrow direction="left" /><span>Back</span></span>
  </Link>
}
