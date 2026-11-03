'use client'

import { useState, useCallback } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { GalleryItem } from './GalleryItem'
import {
    DossierBar,
    DossierFrame,
    DossierSectionHeading,
} from '@/components/ascii/Dossier'

interface GalleryItemData {
    imageLight?: string
    imageDark?: string
    videoLight?: string
    videoDark?: string
    alt: string
    title: string
    description: string
    neutral?: boolean
}

interface GallerySectionProps {
    items: GalleryItemData[]
}

export function GallerySection({ items }: GallerySectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => {
            const nextIndex = (prev + 1) % items.length
            return nextIndex
        })
    }, [items.length])

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => {
            const prevIndex = (prev - 1 + items.length) % items.length
            return prevIndex
        })
    }, [items.length])

    const handleOpenLightbox = useCallback((index: number) => {
        setCurrentIndex(index)
        setIsLightboxOpen(true)
    }, [])

    const handleCloseLightbox = useCallback(() => {
        setIsLightboxOpen(false)
    }, [])

    return (
        <section className="w-full py-12 sm:py-16">
            <div>
                <DossierBar label="Section" index="05" state="Gallery" />
                <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
                    <RepeatReveal><DossierSectionHeading
                        label="Gallery"
                        title="More screens"
                        description="A closer look at the product in use."
                    /></RepeatReveal>

                    <div className="space-y-6">
                        {items.map((item, index) => (
                            <GalleryItem
                                key={index}
                                {...item}
                                isReversed={index % 2 === 1}
                                onNext={handleNext}
                                onPrevious={handlePrevious}
                                hasNext={index < items.length - 1}
                                hasPrevious={index > 0}
                                isLightboxOpen={
                                    isLightboxOpen && index === currentIndex
                                }
                                onOpenLightbox={() => handleOpenLightbox(index)}
                                onCloseLightbox={handleCloseLightbox}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
