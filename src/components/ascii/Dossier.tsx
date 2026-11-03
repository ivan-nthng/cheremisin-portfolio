import type { ReactNode } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { cn } from '@/lib/utils'

interface DossierPageProps {
    children: ReactNode
    className?: string
}

interface DossierFrameProps {
    children: ReactNode
    className?: string
}

interface DossierBarProps {
    label: string
    index?: string
    state?: string
    className?: string
}

interface DossierSectionHeadingProps {
    label: string
    title: string
    description?: ReactNode
    className?: string
    actions?: ReactNode
}

interface DossierMetaItem {
    label: string
    value: ReactNode
}

interface DossierMetaStripProps {
    items: DossierMetaItem[]
    className?: string
}

interface DossierMediaViewportProps {
    children: ReactNode
    label: string
    title: string
    note?: string
    className?: string
    viewportClassName?: string
}

export function DossierPage({ children, className }: DossierPageProps) {
    return (
        <div
            className={cn(
                'mx-auto flex w-full max-w-[var(--case-width-compact)] flex-col gap-10 px-6 pb-16 sm:gap-14 sm:pb-24',
                className,
            )}
        >
            {children}
        </div>
    )
}

export function DossierFrame({ children, className }: DossierFrameProps) {
    return (
        <RepeatReveal
            className={cn(
                'min-w-0 overflow-clip bg-transparent',
                className,
            )}
        >
            {children}
        </RepeatReveal>
    )
}

export function DossierBar({
    label,
    index,
    state,
    className,
}: DossierBarProps) {
    // Historical numbering/state chrome is retired; authored section headings remain.
    return null
}

export function DossierSectionHeading({
    label,
    title,
    description,
    className,
    actions,
}: DossierSectionHeadingProps) {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <div className="text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                {label}
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl space-y-4">
                    <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                        {title}
                    </h2>
                    {description ? (
                        <div className="max-w-2xl text-sm leading-7 text-muted sm:text-[length:var(--type-description-size)]">
                            {description}
                        </div>
                    ) : null}
                </div>
                {actions ? <div className="shrink-0">{actions}</div> : null}
            </div>
        </div>
    )
}

export function DossierMetaStrip({
    items,
    className,
}: DossierMetaStripProps) {
    return (
        <div
            className={cn(
                'grid gap-x-6 gap-y-4 border-t-[length:var(--stroke-thin)] border-dashed border-border pt-4 sm:grid-cols-2 lg:grid-cols-4',
                className,
            )}
        >
            {items.map((item, index) => (
                <div
                    key={`${item.label}-${index}`}
                    className="flex min-h-16 flex-col gap-2"
                >
                    <span className="case-caption">
                        {item.label}
                    </span>
                    <div className="text-sm leading-6 text-foreground">
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    )
}

export function DossierMediaViewport({
    children,
    label,
    title,
    note,
    className,
    viewportClassName,
}: DossierMediaViewportProps) {
    return (
        <div className={cn('border-y-[length:var(--stroke-thin)] border-border', className)}>
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-b-[length:var(--stroke-thin)] border-dashed border-border px-4 py-2 text-[length:var(--type-micro-size)] uppercase tracking-[var(--tracking-case-label)] text-muted">
                <span>{label}</span>
                <span className="text-foreground">{title}</span>
            </div>
            <div
                className={cn(
                    'bg-[color:var(--surface-media-frame)] p-2 sm:p-3',
                    viewportClassName,
                )}
            >
                {children}
            </div>
            {note ? (
                <div className="border-t-[length:var(--stroke-thin)] border-dashed border-border px-4 py-2 text-[length:var(--type-micro-size)] uppercase tracking-[var(--tracking-media-note)] text-muted">
                    {note}
                </div>
            ) : null}
        </div>
    )
}

export function DossierTagList({
    items,
    className,
}: {
    items: string[]
    className?: string
}) {
    return (
        <div
            className={cn(
                'flex flex-wrap items-center gap-x-3 gap-y-2 text-[length:var(--type-meta-size)] uppercase tracking-[var(--tracking-tag)] text-muted',
                className,
            )}
        >
            {items.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                    <span>{item}</span>
                    {index < items.length - 1 ? (
                        <span className="text-border">/</span>
                    ) : null}
                </span>
            ))}
        </div>
    )
}
