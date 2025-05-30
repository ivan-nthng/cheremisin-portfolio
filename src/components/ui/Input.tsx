'use client'

import React from 'react'
import clsx from 'clsx'

export type InputProps = {
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    type?: string
    [x: string]: any
}

export function Input({
    placeholder,
    value,
    onChange,
    className,
    type = 'text',
    ...props
}: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={clsx(
                'w-full px-3 py-1.5 border border-black text-base font-normal text-black bg-white rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-black transition-colors',
                className,
            )}
            {...props}
        />
    )
}

export default Input
