import { cn } from '@/lib/utils'

interface AsciiAssetFallbackProps {
    title?: string
    label?: string
    kind?: 'img' | 'vid' | 'asset'
    className?: string
    compact?: boolean
}

const FALLBACK_ART = String.raw`   .----------.
   |  x    x  |
   |    __    |
   |  \____/  |
   '----------'`

export function AsciiAssetFallback({
    title = 'No preview available',
    label = 'missing asset',
    kind = 'asset',
    className,
    compact = false,
}: AsciiAssetFallbackProps) {
    return (
        <div
            className={cn(
                'flex h-full min-h-[220px] w-full items-center justify-center bg-background px-4 py-6 text-center',
                compact ? 'min-h-[180px] py-4' : null,
                className,
            )}
        >
            <div className="space-y-3">
                <pre
                    aria-hidden="true"
                    className="mx-auto w-fit text-[10px] leading-4 text-muted sm:text-[11px]"
                >
                    {FALLBACK_ART}
                </pre>
                <div className="text-[11px] uppercase tracking-[0.28em] text-foreground">
                    {title}
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    :: {kind} / {label}
                </div>
            </div>
        </div>
    )
}
