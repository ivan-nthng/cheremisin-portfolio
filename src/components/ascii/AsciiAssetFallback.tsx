import { cn } from '@/lib/utils'

interface AsciiAssetFallbackProps {
    title?: string
    label?: string
    kind?: 'img' | 'vid' | 'asset'
    className?: string
    compact?: boolean
}

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
                'flex h-full min-h-[var(--media-placeholder-min)] w-full items-center justify-center bg-background px-4 py-6 text-center',
                compact ? 'min-h-[var(--media-placeholder-compact-min)] py-4' : null,
                className,
            )}
        >
            <div className="space-y-3">
                <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-foreground">
                    {title}
                </div>
                <div className="text-[length:var(--type-micro-size)] uppercase tracking-[var(--tracking-media-note)] text-muted">
                    {kind} / {label}
                </div>
            </div>
        </div>
    )
}
