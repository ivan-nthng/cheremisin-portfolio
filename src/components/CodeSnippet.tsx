'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface CodeState {
    name: string
    code: string
    lightImage: string
    darkImage: string
    tokens?: {
        padding: string
        borderRadius: string
        fontSize: string
    }
}

interface CodeSnippetProps {
    header: string
    description: string
    alt: string
    sizes: {
        name: string
        code: string
        lightImage: string
        darkImage: string
        tokens: {
            padding: string
            borderRadius: string
            fontSize: string
        }
    }[]
}

export function CodeSnippet({
    header,
    description,
    alt,
    sizes,
}: CodeSnippetProps) {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [currentCode, setCurrentCode] = useState('')

    // Handle mounting
    useEffect(() => {
        setMounted(true)
    }, [])

    // Update code when theme or size changes
    useEffect(() => {
        if (!mounted) return

        const currentTheme = theme === 'system' ? systemTheme : theme
        const code = selectedSize.code.replace(
            /theme: '[^']*'/,
            `theme: '${currentTheme === 'dark' ? 'dark' : 'light'}'`,
        )
        setCurrentCode(code)
    }, [theme, systemTheme, selectedSize, mounted])

    // Handle initial SSR render
    if (!mounted) {
        return (
            <div className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7">
                        <div className="lg:sticky lg:top-24">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50" />
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="animate-pulse">
                            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                            <div className="h-20 w-full bg-gray-200 dark:bg-gray-800 rounded mb-6" />
                            <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                            <div className="h-40 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const currentTheme = theme === 'system' ? systemTheme : theme
    const currentImage =
        currentTheme === 'dark'
            ? selectedSize.darkImage
            : selectedSize.lightImage

    return (
        <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Image Column (9/12 width on large screens, full width on small) */}
                <div className="lg:col-span-7">
                    <div className="lg:sticky lg:top-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50"
                        >
                            <Image
                                src={currentImage}
                                alt={alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Content Column (3/12 width on large screens, full width on small) */}
                <div className="lg:col-span-5 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100">
                            {header}
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/80 mb-6">
                            {description}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-4 relative">
                            <select
                                value={selectedSize.name}
                                onChange={(e) => {
                                    const newSize = sizes.find(
                                        (s) => s.name === e.target.value,
                                    )
                                    if (newSize) setSelectedSize(newSize)
                                }}
                                className="w-full pl-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-blue-200/50 dark:border-blue-800/50 text-blue-900 dark:text-blue-100 font-mono text-sm transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none pr-10"
                            >
                                {sizes.map((size) => (
                                    <option key={size.name} value={size.name}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 dark:text-blue-600" />
                        </div>

                        {/* Code Snippet */}
                        <motion.div
                            key={`${selectedSize.name}-${currentTheme}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative space-y-4"
                        >
                            <pre
                                className={cn(
                                    'p-4 rounded-lg overflow-x-auto',
                                    currentTheme === 'dark'
                                        ? 'bg-gray-950'
                                        : 'bg-gray-900',
                                )}
                            >
                                <code className="text-xs text-blue-100 font-mono">
                                    {currentCode}
                                </code>
                            </pre>

                            {/* Token Values */}
                            {selectedSize.tokens && (
                                <div className="space-y-2 p-4 rounded-lg bg-blue-50/80 dark:bg-blue-950/80">
                                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                        Token Values
                                    </h4>
                                    <div className="space-y-1 text-xs text-blue-800/80 dark:text-blue-200/80 font-mono">
                                        <p>
                                            --button-padding:{' '}
                                            {selectedSize.tokens.padding}
                                        </p>
                                        <p>
                                            --button-radius:{' '}
                                            {selectedSize.tokens.borderRadius}
                                        </p>
                                        <p>
                                            --button-font-size:{' '}
                                            {selectedSize.tokens.fontSize}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
