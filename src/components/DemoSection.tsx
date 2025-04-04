'use client'

import React from 'react'
import Image from 'next/image'
import {
    motion,
    useMotionValue,
    useSpring,
    useScroll,
    useTransform,
} from 'framer-motion'

interface DemoSectionProps {
    title: string
    description: string
    image: string
}

const MotionDiv = motion.div as React.ComponentType<
    React.HTMLAttributes<HTMLDivElement> & {
        variants?: any
        initial?: any
        animate?: any
        transition?: any
        style?: any
        ref?: any
    }
>

export default function DemoSection({
    title,
    description,
    image,
}: DemoSectionProps) {
    const sectionRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isExiting, setIsExiting] = React.useState(false)

    // Magnetic animation values
    const magneticX = useMotionValue(0)
    const magneticY = useMotionValue(0)
    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(magneticX, springConfig)
    const springY = useSpring(magneticY, springConfig)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0],
    )
    const scrollY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [100, 0, 0, -100],
    )
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.8],
    )

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setIsExiting(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                staggerChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: 'easeIn',
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    }

    const imageVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
        exit: {
            opacity: 0,
            y: 100,
            transition: {
                duration: 0.5,
                ease: 'easeIn',
            },
        },
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = event.clientX - centerX
        const distanceY = event.clientY - centerY

        magneticX.set(distanceX * 0.1)
        magneticY.set(distanceY * 0.1)
    }

    const handleMouseLeave = () => {
        magneticX.set(0)
        magneticY.set(0)
    }

    return (
        <MotionDiv
            ref={sectionRef}
            style={{ opacity, y: scrollY, scale }}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="relative min-h-screen w-full bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-sm"
        >
            {/* Content Container */}
            <div className="container mx-auto px-6 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Left Side Content */}
                    <MotionDiv
                        variants={itemVariants}
                        className="flex flex-col justify-center space-y-6 sm:space-y-8"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-800 dark:text-primary-100">
                            {title}
                        </h2>
                        <p className="text-lg sm:text-xl text-primary-600 dark:text-primary-300">
                            {description}
                        </p>
                    </MotionDiv>

                    {/* Right Side Image */}
                    <MotionDiv
                        variants={imageVariants}
                        style={{
                            x: springX,
                            y: springY,
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full h-full"
                    >
                        <div className="absolute bottom-0 right-0 w-full h-full">
                            <Image
                                src={image}
                                alt="City Demo"
                                width={1200}
                                height={800}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </MotionDiv>
    )
}
