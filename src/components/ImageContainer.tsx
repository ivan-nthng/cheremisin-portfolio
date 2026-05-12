'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AsciiAssetFallback } from '@/components/ascii/AsciiAssetFallback'

/**
 * Props interface for the ImageContainer component
 * @property {string} image - The URL path to the image to display
 * @property {string} alt - Alt text for accessibility
 * @property {() => void} onImageClick - Callback function triggered when the image is clicked
 */
interface ImageContainerProps {
    image: string
    alt: string
    onImageClick: () => void
}

/**
 * ImageContainer Component
 *
 * A responsive container for displaying images with interactive features:
 * - Hover effects with scaling and brightness adjustment
 * - Interactive tooltip that follows the cursor
 * - Click handler for opening a lightbox or modal
 * - Responsive design with aspect ratio preservation
 * - Theme-aware styling with light/dark mode support
 *
 * @param {ImageContainerProps} props - Component properties
 * @returns {JSX.Element} The rendered image container
 */
export function ImageContainer({
    image,
    alt,
    onImageClick,
}: ImageContainerProps) {
    const [hasError, setHasError] = useState(false)
    const canOpen = Boolean(image) && !hasError

    return (
        <button
            type="button"
            className="group relative mx-auto block w-full text-left"
            onClick={canOpen ? onImageClick : undefined}
            aria-label={canOpen ? `Open ${alt}` : `${alt} unavailable`}
            disabled={!canOpen}
        >
            <div className="relative overflow-hidden border border-border bg-background transition-colors duration-200 group-hover:bg-surface group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-accent/30">
                {canOpen ? (
                    <img
                        src={image}
                        alt={alt}
                        className="h-auto w-full max-w-full object-contain transition-opacity duration-200 group-hover:opacity-95"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <AsciiAssetFallback
                        title="Preview unavailable"
                        label={alt}
                        kind="img"
                        compact
                    />
                )}
            </div>

            {canOpen ? (
                <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 border border-border bg-background/92 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <MagnifyingGlassIcon className="h-4 w-4 flex-shrink-0" />
                    <span>Inspect</span>
                </div>
            ) : null}
        </button>
    )
}
