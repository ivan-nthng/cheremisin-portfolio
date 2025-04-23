import { HTMLMotionProps } from 'framer-motion'

declare module 'framer-motion' {
    import { ComponentType, ReactNode } from 'react'

    export interface MotionProps extends HTMLMotionProps<'div'> {
        ref?: React.RefObject<HTMLDivElement>
        style?: React.CSSProperties
        onHoverStart?: () => void
        onHoverEnd?: () => void
        onClick?: () => void
        variants?: any
        whileInView?: any
        viewport?: any
    }

    export const motion: {
        div: ComponentType<MotionProps>
        button: ComponentType<MotionProps>
        header: ComponentType<MotionProps>
        h1: ComponentType<MotionProps>
        h2: ComponentType<MotionProps>
        h3: ComponentType<MotionProps>
        p: ComponentType<MotionProps>
        span: ComponentType<MotionProps>
        section: ComponentType<MotionProps>
        nav: ComponentType<MotionProps>
        ul: ComponentType<MotionProps>
        li: ComponentType<MotionProps>
        a: ComponentType<MotionProps>
    }

    interface AnimatePresenceProps {
        children?: ReactNode
    }

    export const AnimatePresence: ComponentType<AnimatePresenceProps>
}
