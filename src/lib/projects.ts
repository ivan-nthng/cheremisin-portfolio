export interface Project {
    title: string
    description: string
    image?: string
    darkImage?: string
    technologies: string[]
    link: string
    isWide?: boolean
    isSingleColumn?: boolean
    role?: string
    companyContext?: string
    companyName?: string
    companyUrl?: string
    projectWebsite?: { label: string; href: string }
    isComingSoon?: boolean
    isActive?: boolean
}

export const projects: Project[] = [
    {
        title: 'Taxi Aggregator Support Workspace',
        description:
            'Messages, trip details, and previous interactions in one support workspace.',
        image: '/vk/demo-light.png',
        darkImage: '/vk/demo-dark.png',
        technologies: [
            'Figma',
            'Design Systems',
            'User Testing',
            'User flows',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
        ],
        role: 'Lead Product Designer',
        link: '/projects/taxi-aggregator-support-workspace',
        companyName: 'VK',
        companyUrl: 'https://vk.com/',
        companyContext: '/ Citymobil',
        isActive: true,
    },
    {
        title: 'DS Hito Design System',
        description:
            'A design system organized around semantic tokens and reusable component behavior.',
        image: '/images/hito/case/home-cover.webp',
        technologies: [
            'UI Design',
            'Figma',
            'Design Systems',
            'Next.js',
            'MVP',
            'Design Handoff',
            'Product Strategy',
        ],
        role: 'Lead Product Designer',
        link: '/projects/ds-hito',
        isWide: true,
        companyName: 'Personal project',
        projectWebsite: { label: 'Hito DS', href: 'https://www.hitocajon.com/' },
        isActive: true,
    },
    {
        title: 'LitRes Publishing Workspace',
        description: 'A workspace for authors, self-publishers, and e-book publishers to track sales and reader engagement.',
        image: '/images/litres/case/home-cover.webp',
        technologies: [
            'UI Design',
            'Figma',
            'Design Systems',
            'Quantitative Research',
            'User Interviews',
            'Design Handoff',
            'Product Strategy',
            'Mobile-first Design',
            'A/B Testing',
            'Collaboration',
        ],
        role: 'Lead Product Designer',
        link: '/projects/litres',
        companyName: 'LitRes',
        companyUrl: 'https://www.litres.ru/',
        isActive: true,
    },
    {
        title: 'LitRes Libraries Interface',
        description: 'A workspace for library staff to manage reader accounts and decide when reader requests can add copies to the collection.',
        technologies: ['Product Design', 'Design Systems', 'Interactive Prototypes'],
        link: '/projects/litres-library',
        companyName: 'LitRes',
        companyUrl: 'https://www.litres.ru/',
        isActive: true,
    },
    {
        title: '3D Source Metabox',
        description: 'A workspace for configuring 3D products, setting camera views, and creating renders.',
        technologies: ['Product Design', 'Design Systems', 'Interactive Prototypes'],
        link: '/projects/metabox',
        companyName: '3D Source',
        companyUrl: 'https://www.3dsource.com/',
        isActive: true,
    },
    {
        title: 'Saavi',
        description: 'A platform for planning everyday routines, starting with a week of chef-prepared meals.',
        technologies: ['Product Strategy', 'Product Design', 'Design Systems'],
        role: 'Founder / Product Designer / Product Builder',
        link: '/projects/saavi',
        companyName: 'Saavi',
        companyUrl: 'https://saavi.cc/',
        isActive: true,
    },
    {
        title: 'Coming Soon',
        description: 'More projects will be added soon.',
        image: '',
        technologies: [],
        link: '#',
        isComingSoon: true,
        isActive: false,
    },
]

export const activeProjects = projects.filter((project) => project.isActive)
