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
    'inline-flex items-center justify-center gap-2 rounded-[2px] px-3 py-1.5 text-base font-normal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 disabled:opacity-50 disabled:pointer-events-none select-none'

const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-600',
    secondary:
        'border border-black text-black bg-white hover:bg-gray-100 active:bg-black active:text-white',
    ghost: 'text-black bg-transparent hover:bg-gray-100 active:bg-black active:text-white border-none',
}

const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-md px-5 py-2.5',
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
