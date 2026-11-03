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
        image: '/ds-hito/project-1-light.png',
        darkImage: '/ds-hito/project-1-dark.png',
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
        isActive: true,
    },
    {
        title: 'Litres Internal Tools',
        description:
            'Internal tools for authors, publishers, and library teams working with ebooks and audiobooks.',
        image: '/litres/project-1-light.png',
        darkImage: '/litres/project-1-dark.png',
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
        title: 'Peruse',
        description:
            'An AI document-workspace concept for organizing, finding, and connecting files by meaning.',
        technologies: [
            'AI',
            'File Management',
            'User Experience',
            'Product Design',
            'Machine Learning',
        ],
        role: 'Lead Product Designer',
        link: '/projects/peruse',
        isSingleColumn: true,
        companyName: 'Peruse',
        companyUrl: 'https://www.peruse.ml/',
        isActive: true,
    },
    {
        title: 'Wrike',
        description:
            'Board-based project planning and workload management for teams.',
        technologies: [
            'SaaS',
            'Productivity',
            'Enterprise',
            'Project Management',
            'Dashboard',
        ],
        role: 'Senior Product Designer',
        link: '/projects/wrike',
        isSingleColumn: true,
        companyName: 'Wrike',
        companyUrl: 'https://www.wrike.com/',
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
