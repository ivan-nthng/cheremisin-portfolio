'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import {
    DossierBar,
    DossierFrame,
    DossierMediaViewport,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

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
            <div className="py-12 sm:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="aspect-[16/9] border border-border bg-surface-muted" />
                    <div className="animate-pulse space-y-4 border border-border px-4 py-4">
                        <div className="h-4 w-24 bg-surface-muted" />
                        <div className="h-10 w-full bg-surface-muted" />
                        <div className="h-12 w-full bg-surface-muted" />
                        <div className="h-40 w-full bg-surface-muted" />
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
        <div className="py-12 sm:py-16">
            <DossierFrame>
                <DossierBar label="Section" index="10" state="Code states" />
                <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.24 }}
                    >
                        <DossierMediaViewport
                            label="img 01"
                            title={alt}
                            note="light + dark"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden border border-border bg-background">
                                <Image
                                    src={currentImage}
                                    alt={alt}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                                    priority
                                />
                            </div>
                        </DossierMediaViewport>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.24, delay: 0.04 }}
                        className="space-y-4 border border-border px-4 py-4"
                    >
                        <DossierSectionHeading
                            label="Code / note"
                            title={header}
                            description={description}
                        />

                        <div className="relative">
                            <select
                                value={selectedSize.name}
                                onChange={(e) => {
                                    const newSize = sizes.find(
                                        (s) => s.name === e.target.value,
                                    )
                                    if (newSize) setSelectedSize(newSize)
                                }}
                                className="w-full appearance-none border border-border bg-surface px-4 py-3 pr-10 text-sm text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-accent/30"
                            >
                                {sizes.map((size) => (
                                    <option key={size.name} value={size.name}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        </div>

                        <motion.div
                            key={`${selectedSize.name}-${currentTheme}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            <pre
                                className={cn(
                                    'overflow-x-auto border p-4 text-xs',
                                    currentTheme === 'dark'
                                        ? 'border-border bg-black text-surface'
                                        : 'border-border-strong bg-foreground text-background',
                                )}
                            >
                                <code>{currentCode}</code>
                            </pre>

                            {selectedSize.tokens ? (
                                <div className="space-y-2 border border-border px-4 py-4 text-xs text-muted">
                                    <h4 className="text-[11px] uppercase tracking-[0.28em] text-foreground">
                                        Token values
                                    </h4>
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
                            ) : null}
                        </motion.div>
                    </motion.div>
                </div>
            </DossierFrame>
        </div>
    )
}
