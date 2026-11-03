import { contacts } from '@/lib/site-content'
import { PortfolioArrow } from './PortfolioArrow'

/** Shared plain contact anchors; navigation containers own layout and focus. */
export function ContactLinks() {
  return contacts.map(contact => <a key={contact.label} className="editorial-link" href={contact.href}
    {...(contact.label !== 'Email' ? { target: '_blank', rel: 'noreferrer' } : {})}>
    {contact.label}<PortfolioArrow />
  </a>)
}
