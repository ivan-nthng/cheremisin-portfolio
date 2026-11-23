import type { Metadata } from 'next'
import ReaderDemoGallery from '@/components/litres-readers/ReaderDemoGallery'
import { LibraryDemoSurface } from '@/components/litres-readers/LibraryDemoSurface'
import CaseDraft, { type CaseDraftData } from '@/components/portfolio/case-story/CaseDraft'

export const metadata: Metadata = {
  title: 'LitRes Libraries — Ivan Cheremisin',
  robots: { index: false, follow: false },
}

const data: CaseDraftData = {
  projectHref: '/projects/litres-library',
  name: 'LitRes Libraries',
  title: 'Free to borrow. Clear rules for buying.',
  introduction: 'I designed a workspace where library staff could decide when readers may buy an extra digital copy for the collection at the library’s expense.',
  variant: 'litres',
  heroPreview: true,
  context: {
    title: 'Keep useful books available',
    body: 'Libraries lend a finite number of digital copies. When all available copies are in use, readers must wait for one to be returned. With staff permission, a reader can request an additional copy for the library, paid from its acquisition budget.',
    beats: [
      {
        label: 'Before / Permission was unclear',
        title: 'Budget exhausted in the first quarter',
        body: 'Borrowing was free for readers, but the library could also pay to add titles when demand justified another copy. Without clear staff permissions for those purchases, the annual acquisition budget was spent in the first quarter.',
      },
      {
        label: 'Design decision',
        title: 'Make purchasing permission explicit',
        body: 'I made purchasing permissions explicit in the workflow, so staff could decide when a reader request should add another copy to the library’s collection.',
      },
      {
        label: 'After / Reported outcome',
        title: 'Budget lasted the full year',
        body: 'According to my account, the library’s acquisition budget then lasted through the full year.',
      },
    ],
  },
  story: [
    {
      label: 'Process',
      title: 'Make the purchase decision matter',
      paragraphs: [
        'LitRes asked the design team to bring library acquisition costs under control. I worked from a library to see how readers looked for books and how staff handled requests for extra copies.',
        'Some staff needed time to learn a new tool. Others wanted to get through administrative tasks quickly. Setting purchase permissions was easy to put off. I made the rules quick to set and showed what was at stake. When staff decided who could buy an extra copy at the library’s expense, they could see how that decision shaped the collection.',
      ],
    },
    {
      label: 'Reported outcome',
      title: 'Keep the budget available for books people want',
      paragraphs: [
        'According to my account, the library’s acquisition budget then lasted through the full year.',
        'When the budget runs out, readers lose the option to add a copy. If the books they want are repeatedly unavailable, they have less reason to return.',
      ],
    },
  ],
  hero: {
    src: '/images/litres/library-case/workspace.webp',
    alt: 'LitRes Library reader directory and account workspace',
    width: 1440,
    height: 868,
  },
  poster: {
    src: '/images/litres/library-case/workspace.webp',
    alt: 'LitRes Library reader directory and selected reader ticket with borrowing rules',
    width: 1440,
    height: 868,
  },
  showcase: {
    kicker: 'LitRes Libraries / Reader workspace',
    lines: ['Manage reader access', 'in one place.'],
    chrome: 'LitRes Library — reader workspace',
  },
  demos: [{
    label: 'Open the reader workspace',
    href: '/preview/litres-readers',
    description: 'Explore reader accounts and purchase permissions.',
  }],
}

export default function LitresLibraryCasePage() {
  return <CaseDraft data={data} ReaderGallery={ReaderDemoGallery} LibrarySurface={LibraryDemoSurface} />
}
