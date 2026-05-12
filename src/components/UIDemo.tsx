'use client'

import React from 'react'
import { motion } from 'framer-motion'
import cn from 'classnames'
import {
    ArrowRight,
    ArrowLeft,
    Send,
    Mail,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
} from 'lucide-react'

type ButtonState =
    | 'Default'
    | 'Hover'
    | 'Focused'
    | 'Pushed'
    | 'Loading'
    | 'Disabled'
type ButtonStyle = 'Default' | 'Accent' | 'Error' | 'Success'
type IconOption = 'None' | 'Arrow' | 'Send' | 'Mail' | 'Chevron'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface UIButtonProps {
    state: ButtonState
    style: ButtonStyle
    size: ButtonSize
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    label: string
}

const getIcon = (iconType: IconOption, size: ButtonSize) => {
    const sizeMap = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
    }
    const className = `${sizeMap[size]} text-current`

    switch (iconType) {
        case 'Arrow':
            return {
                left: <ArrowLeft className={className} />,
                right: <ArrowRight className={className} />,
            }
        case 'Send':
            return {
                left: <Send className={className} />,
                right: <Send className={className} />,
            }
        case 'Mail':
            return {
                left: <Mail className={className} />,
                right: <Mail className={className} />,
            }
        case 'Chevron':
            return {
                left: <ChevronLeft className={className} />,
                right: <ChevronRight className={className} />,
            }
        default:
            return { left: null, right: null }
    }
}

const UIButton: React.FC<UIButtonProps> = ({
    state,
    style,
    size,
    leftIcon,
    rightIcon,
    label,
}) => {
    const sizeClasses = {
        sm: 'px-3 py-2 text-[11px] gap-1.5',
        md: 'px-4 py-2 text-xs gap-2',
        lg: 'px-5 py-3 text-sm gap-2.5',
        xl: 'px-6 py-3 text-sm gap-3',
    }

    const baseClasses = cn(
        'inline-flex items-center border font-mono uppercase tracking-[0.18em] transition-all duration-200',
        sizeClasses[size],
    )

    const getStyleClasses = () => {
        switch (style) {
            case 'Accent':
                return 'border-border-strong bg-accent text-foreground hover:bg-foreground hover:text-background'
            case 'Error':
                return 'border-border-strong bg-red-700 text-white hover:bg-red-800'
            case 'Success':
                return 'border-border-strong bg-green-700 text-white hover:bg-green-800'
            default:
                return 'border-border-strong bg-foreground text-background hover:bg-accent hover:text-foreground'
        }
    }

    const getStateClasses = () => {
        switch (state) {
            case 'Hover':
                return 'shadow-md scale-[1.02]'
            case 'Focused':
                return 'ring-2 ring-offset-2 ring-blue-500'
            case 'Pushed':
                return 'scale-95'
            case 'Disabled':
                return 'opacity-50 cursor-not-allowed'
            default:
                return ''
        }
    }

    return (
        <button
            className={cn(
                baseClasses,
                getStyleClasses(),
                getStateClasses(),
                state === 'Loading' && 'cursor-wait',
            )}
            disabled={state === 'Disabled'}
        >
            {leftIcon}
            {state === 'Loading' ? (
                <span className="flex items-center gap-2">
                    <motion.span
                        className={cn(
                            'border-2 border-white border-t-transparent rounded-full',
                            size === 'sm' && 'w-3.5 h-3.5',
                            size === 'md' && 'w-4 h-4',
                            size === 'lg' && 'w-5 h-5',
                            size === 'xl' && 'w-6 h-6',
                        )}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                    {label}
                </span>
            ) : (
                label
            )}
            {rightIcon}
        </button>
    )
}

export default function UIDemo() {
    const [buttonState, setButtonState] = React.useState<ButtonState>('Default')
    const [buttonStyle, setButtonStyle] = React.useState<ButtonStyle>('Default')
    const [buttonSize, setButtonSize] = React.useState<ButtonSize>('md')
    const [leftIconType, setLeftIconType] = React.useState<IconOption>('None')
    const [rightIconType, setRightIconType] = React.useState<IconOption>('None')

    const leftIcons = getIcon(leftIconType, buttonSize)
    const rightIcons = getIcon(rightIconType, buttonSize)
    const leftIconComponent = leftIconType === 'None' ? null : leftIcons.left
    const rightIconComponent =
        rightIconType === 'None' ? null : rightIcons.right

    const inputClasses =
        'w-full appearance-none border border-border bg-surface px-4 py-3 pr-10 text-sm text-foreground transition-colors duration-200 hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50'

    return (
        <section className="w-full">
            <div className="space-y-8 sm:space-y-6">
                <div className="xl:w-1/2 lg:w-2/3 space-y-4 pb-8">
                    <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-foreground">
                        Button Component Logic
                    </h2>
                    <p className="text-sm leading-7 text-muted">
                        All components support four size presets, paddings, font
                        sizes, and icon dimensions are controlled by a single
                        semantic variable — auto-adjusted per component size.
                        This ensures consistency and scalability across the
                        system.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
                    {/* Left side - Button preview */}
                    <div className="md:col-span-3 border border-border bg-surface p-8 sm:p-12 flex items-center justify-center">
                        <div className="transform md:scale-[2] transition-transform duration-300">
                            <UIButton
                                state={buttonState}
                                style={buttonStyle}
                                size={buttonSize}
                                label="Button"
                                leftIcon={leftIconComponent}
                                rightIcon={rightIconComponent}
                            />
                        </div>
                    </div>

                    {/* Right side - Configuration form */}
                    <div className="md:col-span-1 space-y-6">
                        {/* State selector */}
                        <div className="space-y-3 relative">
                            <label className="block text-[11px] uppercase tracking-[0.24em] text-muted">
                                State
                            </label>
                            <div className="relative">
                                <select
                                    value={buttonState}
                                    onChange={(e) =>
                                        setButtonState(
                                            e.target.value as ButtonState,
                                        )
                                    }
                                    className={inputClasses}
                                >
                                    <option>Default</option>
                                    <option>Hover</option>
                                    <option>Focused</option>
                                    <option>Pushed</option>
                                    <option>Loading</option>
                                    <option>Disabled</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            </div>
                        </div>

                        {/* Style selector */}
                        <div className="space-y-3 relative">
                            <label className="block text-[11px] uppercase tracking-[0.24em] text-muted">
                                Style
                            </label>
                            <div className="relative">
                                <select
                                    value={buttonStyle}
                                    onChange={(e) =>
                                        setButtonStyle(
                                            e.target.value as ButtonStyle,
                                        )
                                    }
                                    className={inputClasses}
                                >
                                    <option>Default</option>
                                    <option>Accent</option>
                                    <option>Error</option>
                                    <option>Success</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            </div>
                        </div>

                        {/* Size selector */}
                        <div className="space-y-3 relative">
                            <label className="block text-[11px] uppercase tracking-[0.24em] text-muted">
                                Size
                            </label>
                            <div className="relative">
                                <select
                                    value={buttonSize}
                                    onChange={(e) =>
                                        setButtonSize(
                                            e.target.value as ButtonSize,
                                        )
                                    }
                                    className={inputClasses}
                                >
                                    <option>sm</option>
                                    <option>md</option>
                                    <option>lg</option>
                                    <option>xl</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            </div>
                        </div>

                        {/* Icon selectors */}
                        <div className="space-y-3 relative">
                            <label className="block text-[11px] uppercase tracking-[0.24em] text-muted">
                                Left Icon
                            </label>
                            <div className="relative">
                                <select
                                    value={leftIconType}
                                    onChange={(e) =>
                                        setLeftIconType(
                                            e.target.value as IconOption,
                                        )
                                    }
                                    className={inputClasses}
                                >
                                    <option>None</option>
                                    <option>Arrow</option>
                                    <option>Send</option>
                                    <option>Mail</option>
                                    <option>Chevron</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            </div>
                        </div>

                        <div className="space-y-3 relative">
                            <label className="block text-[11px] uppercase tracking-[0.24em] text-muted">
                                Right Icon
                            </label>
                            <div className="relative">
                                <select
                                    value={rightIconType}
                                    onChange={(e) =>
                                        setRightIconType(
                                            e.target.value as IconOption,
                                        )
                                    }
                                    className={inputClasses}
                                >
                                    <option>None</option>
                                    <option>Arrow</option>
                                    <option>Send</option>
                                    <option>Mail</option>
                                    <option>Chevron</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
