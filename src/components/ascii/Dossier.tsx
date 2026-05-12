import type { ReactNode } from 'react'
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
                'mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-4 pb-16 pt-28 sm:gap-14 sm:px-6 sm:pb-24 lg:px-8 lg:pt-32',
                className,
            )}
        >
            {children}
        </div>
    )
}

export function DossierFrame({ children, className }: DossierFrameProps) {
    return (
        <section
            className={cn(
                'overflow-hidden border-y border-border bg-transparent',
                className,
            )}
        >
            {children}
        </section>
    )
}

export function DossierBar({
    label,
    index,
    state,
    className,
}: DossierBarProps) {
    return (
        <div
            className={cn(
                'flex min-h-10 flex-wrap items-center justify-between gap-2 border-b border-dashed border-border px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-muted sm:px-6',
                className,
            )}
        >
            <div className="flex flex-wrap items-center gap-2">
                {index ? <span>[{index}]</span> : null}
                <span>{label}</span>
            </div>
            {state ? (
                <div className="flex flex-wrap items-center gap-2 text-right">
                    <span className="text-border">::</span>
                    <span>{state}</span>
                </div>
            ) : null}
        </div>
    )
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
            <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                {label}
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl space-y-4">
                    <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                        {title}
                    </h2>
                    {description ? (
                        <div className="max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
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
                'grid gap-x-6 gap-y-4 border-t border-dashed border-border pt-4 sm:grid-cols-2 lg:grid-cols-4',
                className,
            )}
        >
            {items.map((item, index) => (
                <div
                    key={`${item.label}-${index}`}
                    className="flex min-h-16 flex-col gap-2"
                >
                    <span className="terminal-divider">
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
        <div className={cn('border-y border-border', className)}>
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-b border-dashed border-border px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-muted">
                <span>[{label}]</span>
                <span className="text-foreground">{title}</span>
            </div>
            <div
                className={cn(
                    'bg-surface-muted/30 p-2 sm:p-3',
                    viewportClassName,
                )}
            >
                {children}
            </div>
            {note ? (
                <div className="border-t border-dashed border-border px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-muted">
                    :: {note}
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
                'flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted',
                className,
            )}
        >
            {items.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                    <span>[{item}]</span>
                    {index < items.length - 1 ? (
                        <span className="text-border">/</span>
                    ) : null}
                </span>
            ))}
        </div>
    )
}
