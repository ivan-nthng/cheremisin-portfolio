export const HOME_SECTION_IDS = {
    projects: 'projects',
    about: 'about',
    contact: 'contact',
} as const

export type HomeSectionId =
    (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS]

export const HOME_NAV_ITEMS: ReadonlyArray<{
    id: HomeSectionId
    index: string
    label: string
}> = [
    { id: HOME_SECTION_IDS.projects, index: '01', label: 'Projects' },
    { id: HOME_SECTION_IDS.about, index: '02', label: 'About' },
    { id: HOME_SECTION_IDS.contact, index: '03', label: 'Contact' },
]

export const HOME_ROUTE_ITEMS = [
    { href: '/manifesto', index: 'M', label: 'Manifesto' },
] as const

export function scrollToHomeSection(id: HomeSectionId) {
    if (typeof window === 'undefined') return

    const element = document.getElementById(id)
    if (!element) return

    const headerOffset = 88
    const target =
        element.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
        top: target,
        behavior: 'smooth',
    })
}
