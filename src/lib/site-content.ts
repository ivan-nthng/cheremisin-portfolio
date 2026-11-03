/** Read-only public copy. Career provenance: docs/data-quality/portfolio-career-and-project-source-register.md E1–E9.
 * Personal/contact provenance: Ivan's PORT-16 instruction, 2026-10-28. */
export const contacts = [
  { label: 'Email', href: 'mailto:ivan@cheremisin.co.uk' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/icheremisin/' },
  { label: 'GitHub', href: 'https://github.com/ivan-nthng' },
] as const
/** PORT-20: Ivan's approved public hero identity; employment and SEO titles stay separate. */
export const homeIdentity = {
  name: 'Ivan Cheremisin',
  roles: 'Product designer | Product builder | Film director',
  introduction: [
    "I'm a product designer working on internal tools, AI features, design systems, and workflow-heavy software.",
    'I focus on clarity, better decisions, and calmer working software.',
  ],
} as const
export const personal = {
  text: 'I’m a single dad. There isn’t much spare time, but I like to surf, take photographs, and make documentaries about things that interest me.',
  photography: 'https://unsplash.com/@vanya_nichego',
  youtube: 'https://youtu.be/FXyGj8CYFHQ?si=grzzN2d77VR6pwJ3',
}
export const career = [
  ['Saavi', 'Founder / Product Designer / Product Builder', 'Jun 2026 – Present', 'Design and build personalized meal-planning flows and reusable product components.', ''],
  ['cheremisin.co.uk', 'Independent Product Designer / UX Engineer', 'Sep 2024 – Present', 'Design and build web services, iOS apps and reusable design systems.'],
  ['3D Source', 'Product Designer / Product Builder', 'Jun 2025 – Mar 2026', 'Designed a Figma system for client websites with Metabox configurators; defined component and brand-variable rules for AI page assembly.'],
  ['Veritonic', 'Senior Product Designer', 'Aug 2023 – Sep 2024', 'Designed a multi-platform design system, research workflows and research-results sharing.'],
  ['Blue Orange Digital', 'Senior Product Designer', 'Jun 2022 – Jun 2023', 'Designed reporting tools and operational dashboards for client products, including Quext.'],
  ['VK / Citymobil', 'Senior Product Designer', 'Jun 2020 – Apr 2022', 'Designed support tools for Citymobil, including a unified workspace and knowledge hub.'],
  ['Wrike', 'Senior Product Designer', 'Jan 2020 – May 2020', 'Designed Agile project-management workflows.'],
  ['LitRes', 'UI Designer', 'Apr 2017 – Jan 2020', 'Designed the main website, business pages, author and publisher dashboards, and web-reader interfaces.'],
  ['Lugg', 'UI Designer', 'Mar 2015 – Apr 2015', 'Designed product interfaces and illustrations.'],
] as const
