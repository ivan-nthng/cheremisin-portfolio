import { ArrowDownToLine } from 'lucide-react'
import { ContactLinks } from '@/components/portfolio/ContactLinks'

/** Shared closing contact strip for visitor-facing portfolio pages. */
export function PortfolioFooter({ home = false }: { home?: boolean }) {
  const contacts = <>
    <nav className="editorial-footer-contacts" aria-label="Footer contacts">
      <ContactLinks />
      <a className="editorial-link" href="/Ivan-Cheremisin-Resume.pdf" download="Ivan-Cheremisin-Resume.pdf">
        CV <ArrowDownToLine size={16} strokeWidth={1.6} aria-hidden="true" /><span className="sr-only">Download résumé</span>
      </a>
    </nav>
    <img className="home-contact-eye" src="/images/home/loader-eye.svg" width="40" height="40" alt="" />
  </>
  return <footer className="home-contact-band" data-home-footer={home || undefined}>
    {home ? <div className="portfolio-grid-lane home-contact-lane">{contacts}</div> : contacts}
  </footer>
}
