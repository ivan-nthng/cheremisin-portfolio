'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TabSectionProps {
    processContent: React.ReactNode
    resultContent: React.ReactNode
    devContent: React.ReactNode
    hideProcess?: boolean
    hideResult?: boolean
    hideDev?: boolean
}

const TabSection: React.FC<TabSectionProps> = ({
    processContent,
    resultContent,
    devContent,
    hideProcess = false,
    hideResult = false,
    hideDev = false,
}) => {
    const [activeTab, setActiveTab] = React.useState<
        'process' | 'result' | 'dev'
    >('result')
    const [hasScrolled, setHasScrolled] = React.useState(false)
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setHasScrolled(scrollPosition > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleTabChange = (tab: 'process' | 'result' | 'dev') => {
        setActiveTab(tab)

        // Wait for the next render cycle to ensure content is updated
        setTimeout(() => {
            if (contentRef.current) {
                // Get the header height (64px = 16px * 4)
                const headerHeight = 64
                // Add extra padding (24px)
                const extraPadding = 24

                // Calculate the scroll position
                const scrollPosition =
                    contentRef.current.offsetTop - headerHeight - extraPadding

                // Smooth scroll to the content
                window.scrollTo({
                    top: scrollPosition,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                })
            }
        }, 50)
    }

    const availableTabs = ['result', 'process', 'dev'].filter(
        (tab) =>
            !(
                (tab === 'process' && hideProcess) ||
                (tab === 'result' && hideResult) ||
                (tab === 'dev' && hideDev)
            ),
    )
    const tabLabels: Record<'process' | 'result' | 'dev', string> = {
        process: 'Process',
        result: 'Results',
        dev: 'Build',
    }

    return (
        <>
            {/* Content Section */}
            <section className="w-full" ref={contentRef}>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12">
                        <div key={activeTab}>
                            {activeTab === 'process'
                                ? processContent
                                : activeTab === 'result'
                                ? resultContent
                                : devContent}
                        </div>
                    </div>
                </div>
            </section>

            {/* Fixed Tab Navigation */}
            <div
                inert={!hasScrolled}
                aria-hidden={!hasScrolled}
                style={{ visibility: hasScrolled ? 'visible' : 'hidden' }}
                className={cn(
                    'fixed z-[var(--layer-chrome)] pointer-events-none w-full',
                    'sm:bottom-6 sm:left-0 sm:right-0',
                    'bottom-4 left-0 right-0',
                )}
            >
                <div className="relative mx-auto w-full max-w-[var(--case-width-wide)] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12 flex justify-center">
                            <div className="pointer-events-auto flex gap-2 border-[length:var(--stroke-thin)] border-border-strong bg-[color:var(--surface-tabbar)] p-2 backdrop-blur-sm">
                                {availableTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() =>
                                            handleTabChange(
                                                tab as
                                                    | 'process'
                                                    | 'result'
                                                    | 'dev',
                                            )
                                        }
                                        className={cn(
                                            'relative border-[length:var(--stroke-thin)] px-3 py-2 text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-control)] transition-colors duration-[var(--motion-fast-duration)] focus:outline-none focus:ring-[length:var(--stroke-focus)] focus:ring-[color:var(--focus-ring-color)]',
                                            {
                                                'border-border-strong bg-foreground text-background':
                                                    activeTab === tab,
                                                'border-border bg-surface text-muted hover:bg-surface-muted hover:text-foreground':
                                                    activeTab !== tab,
                                            },
                                        )}
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        aria-controls={`${tab}-panel`}
                                        tabIndex={activeTab === tab ? 0 : -1}
                                    >
                                        {tabLabels[tab as 'process' | 'result' | 'dev']}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TabSection
