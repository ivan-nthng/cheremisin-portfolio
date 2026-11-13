import type { Metadata } from 'next'
import MetaboxCardScene from '@/components/metabox/MetaboxCardScene'
import CaseDraft, { type CaseDraftData } from '@/components/portfolio/case-story/CaseDraft'

export const metadata: Metadata = {
  title: '3D Source Metabox case draft',
  robots: { index: false, follow: false },
}

const data: CaseDraftData = {
  projectHref: '/projects/metabox',
  name: '3D Source Metabox',
  title: 'From client requests to a reusable 3D product foundation.',
  introduction: 'At 3D Source, retailers, animation studios and other teams working with 3D assets needed ways to configure and present products. Repeated client requests took time away from developing the product. I worked on two tracks: a customizable design system for client configurators, and AI to automate recurring client-service work.',
  variant: 'metabox',
  context: {
    layout: 'columns',
    title: 'A reusable foundation for configurators and the product.',
    body: 'Client-service automation, AI-assisted configurator assembly and Metabox product development were related parts of the work.',
    beats: [
      {
        title: 'Client-service automation',
        body: 'Repeated client requests took time away from developing the product. I worked on two tracks: a customizable design system for client configurators, and AI to automate recurring client-service work.',
      },
      {
        title: 'Design decision',
        body: 'Instead of rebuilding each client interface, I created a customizable design system with reusable components and brand rules. We used those rules to assemble client configurators with AI.',
      },
      {
        title: 'Product direction',
        body: 'The Metabox experience focused on managing 3D assets, exporting multiple renders to a folder or website, configuring the camera, and controlling how products appeared on a customer’s site.',
      },
    ],
  },
  hero: {
    src: '/images/metabox/products/porsche-current-delivery.webp',
    alt: 'Silver Porsche 911 Carrera in a courtyard',
    width: 1920,
    height: 1080,
  },
  poster: {
    src: '/images/metabox/case/workspace.webp',
    alt: 'Metabox render editor showing a silver Porsche, render history, and a list of selectable camera views',
    width: 2160,
    height: 1350,
  },
  showcase: {
    kicker: 'Workspace preview',
    lines: ['Frame the product.', 'Render selected views.'],
    chrome: 'Metabox · Products',
  },
  demos: [
    {
      label: 'Products and renders',
      href: '/preview/metabox/products',
      description: 'Open the Porsche editor, choose camera views, and export images in a batch.',
    },
    {
      label: 'Camera setup',
      href: '/preview/metabox',
      description: 'Position the camera and set limits for rotation and zoom.',
    },
    {
      label: 'Projects gallery',
      href: '/preview/metabox/suite/projects',
      description: 'Browse Tuuci, DCI Edge, and Tactile Audio Furniture and open their product experiences.',
    },
  ],
  textFeatures: {
    columns: 3,
    items: [
      {
        title: 'Product configuration',
        description: 'Open interactive product configurators from the Projects gallery, including Tuuci and DCI Edge.',
      },
      {
        title: 'Camera controls',
        subheading: 'Set position, rotation, and field of view',
        description: 'Limit how far the camera can rotate or zoom.',
      },
      {
        title: 'Batch rendering',
        description: 'Select several camera views and render them together. Find the resulting images in the Renders tab.',
      },
    ],
  },
}

export default function MetaboxCasePreview() {
  return <CaseDraft data={data} MetaboxScene={MetaboxCardScene} />
}
