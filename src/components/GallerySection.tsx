'use client'

import { GalleryItem } from './GalleryItem'

interface GalleryItemData {
    imageLight?: string
    imageDark?: string
    videoLight?: string
    videoDark?: string
    alt: string
    title: string
    description: string
}

interface GallerySectionProps {
    items: GalleryItemData[]
}

export function GallerySection({ items }: GallerySectionProps) {
    return (
        <section className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-16 md:gap-24">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12"
                    >
                        <GalleryItem {...item} isReversed={index % 2 === 1} />
                    </div>
                ))}
            </div>
        </section>
    )
}
