'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function LogoHolder() {
    const [rotation, setRotation] = useState(0)
    const lastScrollY = useRef(0)
    const animationFrameId = useRef<number>()

    useEffect(() => {
        const animate = () => {
            const currentScrollY = window.scrollY
            const speed = Math.abs(currentScrollY - lastScrollY.current)
            lastScrollY.current = currentScrollY

            setRotation((prev) => prev + speed * 0.5)
            animationFrameId.current = requestAnimationFrame(animate)
        }

        animationFrameId.current = requestAnimationFrame(animate)

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [])

    return (
        <motion.div
            animate={{ rotate: rotation }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            className="w-8 h-8"
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0C99.3462 0 128 28.6538 128 64Z"
                    fill="white"
                />
                <path
                    d="M64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0ZM97.248 68.464H73.024L90.144 85.584L83.728 92L66.608 74.88V99.104H57.52V74.88L40.4 92L33.984 85.584L55.648 63.92L33.984 42.256L40.4 35.84L57.52 52.96V28.736H66.608V59.376H97.248V68.464Z"
                    className="fill-blue-700 dark:fill-blue-500"
                />
            </svg>
        </motion.div>
    )
}
