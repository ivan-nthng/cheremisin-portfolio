declare module 'framer-motion' {
    import { ComponentType, ReactNode } from 'react'

    interface MotionProps {
        initial?: any
        animate?: any
        exit?: any
        whileHover?: any
        whileTap?: any
        transition?: any
        className?: string
        children?: ReactNode
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
