import React from 'react'
import clsx from 'clsx'

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    children?: React.ReactNode
    className?: string
    href?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    [x: string]: any
}

const base =
    'inline-flex items-center justify-center gap-2 border border-border-strong px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50 select-none'

const variantClasses = {
    primary:
        'bg-foreground text-background hover:bg-accent hover:text-foreground active:bg-foreground/90',
    secondary:
        'bg-surface text-foreground hover:bg-surface-muted active:bg-foreground active:text-background',
    ghost: 'border-border bg-transparent text-foreground hover:bg-surface-muted active:bg-surface',
}

const sizeClasses = {
    sm: 'px-3 py-2 text-[11px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-5 py-3 text-sm',
}

export function Button({
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    children,
    className,
    href,
    onClick,
    ...props
}: ButtonProps) {
    const isIconOnly = !children && (iconLeft || iconRight)
    const Comp = href ? 'a' : 'button'
    return (
        <Comp
            type={href ? undefined : 'button'}
            href={href}
            onClick={onClick}
            className={clsx(
                base,
                variantClasses[variant],
                sizeClasses[size],
                isIconOnly && 'p-2',
                className,
            )}
            {...props}
        >
            {iconLeft && (
                <span
                    className={clsx(
                        'flex items-center',
                        !children && !iconRight && 'mx-auto',
                    )}
                >
                    {iconLeft}
                </span>
            )}
            {children && <span>{children}</span>}
            {iconRight && (
                <span
                    className={clsx(
                        'flex items-center',
                        !children && !iconLeft && 'mx-auto',
                    )}
                >
                    {iconRight}
                </span>
            )}
        </Comp>
    )
}

export default Button
