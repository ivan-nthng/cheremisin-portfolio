import React, { useEffect, useRef } from 'react'

export default function AnimatedGradientBackground() {
    const interactiveRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interBubble = interactiveRef.current
        if (!interBubble) return
        let curX = 0
        let curY = 0
        let tgX = 0
        let tgY = 0
        function move() {
            if (!interBubble) return
            curX += (tgX - curX) / 20
            curY += (tgY - curY) / 20
            interBubble.style.transform = `translate(${Math.round(
                curX,
            )}px, ${Math.round(curY)}px)`
            requestAnimationFrame(move)
        }
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

    return (
        <div className="gradient-bg">
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
            <div className="gradients-container">
                <div className="g1" />
                <div className="g2" />
                <div className="g3" />
                <div className="g4" />
                <div className="g5" />
                <div className="interactive" ref={interactiveRef} />
            </div>
        </div>
    )
}
