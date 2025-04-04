'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabSectionProps {
    processContent: React.ReactNode
    resultContent: React.ReactNode
}

const TabSection: React.FC<TabSectionProps> = ({
    processContent,
    resultContent,
}) => {
    const [activeTab, setActiveTab] = React.useState<'process' | 'result'>(
        'process',
    )
    const [hasScrolled, setHasScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setHasScrolled(scrollPosition > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Content Section */}
            <section className="w-full">
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
                                : resultContent}
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
                    'sm:bottom-8 sm:left-0 sm:right-0', // Position for larger screens
                    'bottom-[4.5rem] left-0 right-0', // Position for small screens
                )}
            >
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                        <div className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12 flex justify-center">
                            <div className="flex gap-2 p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg pointer-events-auto">
                                {['process', 'result'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() =>
                                            setActiveTab(
                                                tab as 'process' | 'result',
                                            )
                                        }
                                        className={cn(
                                            'relative px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                            {
                                                'text-blue-900 dark:text-blue-100 bg-blue-100/50 dark:bg-blue-900/50':
                                                    activeTab === tab,
                                                'text-blue-600/60 dark:text-blue-400/60 hover:text-blue-900 dark:hover:text-blue-100':
                                                    activeTab !== tab,
                                            },
                                        )}
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        aria-controls={`${tab}-panel`}
                                        tabIndex={activeTab === tab ? 0 : -1}
                                    >
                                        {tab.charAt(0).toUpperCase() +
                                            tab.slice(1)}
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
