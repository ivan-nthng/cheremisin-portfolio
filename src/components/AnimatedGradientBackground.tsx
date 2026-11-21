import React, { useEffect, useRef, useState } from 'react'

// AnimatedGradientBackground renders a full-screen animated, interactive gradient background
// with multiple moving blobs and a gooey SVG filter effect.
export default function AnimatedGradientBackground() {
    // Ref for the interactive blob that follows the mouse
    const interactiveRef = useRef<HTMLDivElement>(null)
    // State for controlling opacity on scroll
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        // Mouse-following logic for the interactive blob
        const interBubble = interactiveRef.current
        if (!interBubble) return
        let curX = 0
        let curY = 0
        let tgX = 0
        let tgY = 0
        function move() {
            // Smoothly interpolate the blob's position toward the mouse
            if (!interBubble) return
            curX += (tgX - curX) / 20
            curY += (tgY - curY) / 20
            interBubble.style.transform = `translate(${Math.round(
                curX,
            )}px, ${Math.round(curY)}px)`
            requestAnimationFrame(move)
        }
        // Update target position on mouse move
        const mouseHandler = (event: MouseEvent) => {
            tgX = event.clientX
            tgY = event.clientY
        }
        window.addEventListener('mousemove', mouseHandler)
        move()
        return () => {
            window.removeEventListener('mousemove', mouseHandler)
        }
    }, [])

    useEffect(() => {
        // Fade out the background when the user scrolls down
        const handleScroll = () => {
            setOpacity(window.scrollY === 0 ? 1 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        // Main background container
        <div
            className="gradient-bg"
            style={{
                opacity,
                transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: opacity === 0 ? 'none' : undefined,
            }}
        >
            {/* SVG filter for gooey blending of blobs */}
            <svg>
                <filter id="goo">
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="20"
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </svg>
            {/* Container for all animated gradient blobs */}
            <div className="gradients-container">
                {/* Main blue blob, moves vertically */}
                <div className="g1" />
                {/* Purple/pink blob, moves in a circle (reverse) */}
                <div className="g2" />
                {/* Cyan blob, moves in a large circle */}
                <div className="g3" />
                {/* Red blob, moves horizontally */}
                <div className="g4" />
                {/* Yellow blob, moves in a large circle */}
                <div className="g5" />
                {/* Interactive blob that follows the mouse */}
                <div className="interactive" ref={interactiveRef} />
            </div>
        </div>
    )
}
