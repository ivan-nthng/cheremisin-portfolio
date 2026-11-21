import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** Read invariant CSS presentation inputs for numeric animation APIs. The
 * original value also preserves SSR and the document's stylesheet-free state. */
export function cssNumber(token: `--${string}`, original: number, element?: Element) {
    if (typeof window === 'undefined') return original
    const value = Number.parseFloat(getComputedStyle(element ?? document.documentElement).getPropertyValue(token))
    return Number.isFinite(value) ? value : original
}
