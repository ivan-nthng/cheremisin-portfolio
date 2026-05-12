export interface Project {
    title: string
    description: string
    image?: string
    darkImage?: string
    technologies: string[]
    link: string
    isWide?: boolean
    isSingleColumn?: boolean
    companyName?: string
    companyUrl?: string
    isComingSoon?: boolean
}

export const projects: Project[] = [
    {
        title: 'Taxi Aggregator Support Workspace',
        description:
            'Support workspace for a taxi service. It helped operators answer more requests with less switching and less guesswork.',
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
        link: '/projects/taxi-aggregator-support-workspace',
        companyName: 'VK',
        companyUrl: 'https://vk.com',
    },
    {
        title: 'DS Hito Design System',
        description:
            'A design system built on semantic tokens, so teams could scale components without rewriting them for every product.',
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
        link: '/projects/ds-hito',
        isWide: true,
        companyName: 'DS Hito',
        companyUrl: 'https://hitocajon.com',
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
        link: '/projects/litres',
        companyName: 'Litres.com',
        companyUrl: 'https://litres.com',
    },
    {
        title: 'Peruse',
        description:
            'An AI document tool that organizes files by meaning, not just by folder structure.',
        technologies: [
            'AI',
            'File Management',
            'User Experience',
            'Product Design',
            'Machine Learning',
        ],
        link: '/projects/peruse',
        isSingleColumn: true,
        companyName: 'Peruse',
        companyUrl: 'https://www.peruse.ml/',
    },
    {
        title: 'Wrike',
        description:
            'Project planning and workload management for large teams that need a clearer view of priorities and capacity.',
        technologies: [
            'SaaS',
            'Productivity',
            'Enterprise',
            'Project Management',
            'Dashboard',
        ],
        link: '/projects/wrike',
        isSingleColumn: true,
        companyName: 'Wrike',
        companyUrl: 'https://www.wrike.com',
    },
    {
        title: 'Coming Soon',
        description: 'More projects will be added soon.',
        image: '',
        technologies: [],
        link: '#',
        isComingSoon: true,
    },
]
