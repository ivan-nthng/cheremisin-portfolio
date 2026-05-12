'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
                    behavior: 'smooth',
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
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'process'
                                ? processContent
                                : activeTab === 'result'
                                ? resultContent
                                : devContent}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Fixed Tab Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{
                    opacity: hasScrolled ? 1 : 0,
                    y: hasScrolled ? 0 : 100,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    'fixed z-50 pointer-events-none w-full',
                    'sm:bottom-6 sm:left-0 sm:right-0',
                    'bottom-4 left-0 right-0',
                )}
            >
                <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12 flex justify-center">
                            <div className="pointer-events-auto flex gap-2 border border-border-strong bg-background/96 p-2 backdrop-blur-sm">
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
                                            'relative border px-3 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/30',
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
                                        [{tabLabels[tab as 'process' | 'result' | 'dev'].charAt(0)}]{' '}
                                        {tabLabels[tab as 'process' | 'result' | 'dev']}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default TabSection
