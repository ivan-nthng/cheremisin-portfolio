'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GalleryItem } from './GalleryItem'

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
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    // Set up intersection observer to detect when the section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update visibility state based on intersection
                setIsVisible(entry.isIntersecting)
            },
            {
                threshold: 0.25,
                rootMargin: '-50px 0px',
            },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

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
        <section ref={sectionRef} className="w-full py-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-16">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12"
                    >
                        <GalleryItem
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
                            isVisible={isVisible}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
