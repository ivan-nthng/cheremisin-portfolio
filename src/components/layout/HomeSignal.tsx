'use client'

import { useEffect, useMemo, useState } from 'react'
import { useScramble } from 'use-scramble'

const SIGNAL_FRAMES = [
    String.raw`  .---------------------------.
  | FILE 00 / INDEX          |
  | -----------------------  |
  |      .-""""""-.          |
  |    .'  _  _    '.        |
  |   /   /_\/_\     \       |
  |   |   \_/\_/     |       |
  |   |    /__\      |       |
  |   \   .____.    /        |
  |    '._ route _.'         |
  |    status: read idle     |
  '---------------------------'`,
    String.raw`  .---------------------------.
  | FILE 00 / INDEX          |
  | -----------------------  |
  |      .-""""""-.          |
  |    .'  _  _    '.        |
  |   /   / oo \     \       |
  |   |   \_==_/     |       |
  |   |    /__\      |       |
  |   \   .____.    /        |
  |    '._ route _.'         |
  |    status: read live     |
  '---------------------------'`,
    String.raw`  .---------------------------.
  | FILE 00 / INDEX          |
  | -----------------------  |
  |      .-""""""-.          |
  |    .'  _  _    '.        |
  |   /   / -- \     \       |
  |   |   \_/\_/     |       |
  |   |    /__\      |       |
  |   \   .____.    /        |
  |    '._ route _.'         |
  |    status: read sync     |
  '---------------------------'`,
] as const

const SIGNAL_MESSAGES = [
    'Welcome. Start with the projects or open the manifesto.',
    'Use the page to browse work, process, and outcomes.',
    'Each project focuses on the problem, the decisions, and the result.',
    'The goal is simple: make complex products easier to use.',
] as const

const SIGNAL_PROMPTS = [
    'ready',
    'browsing',
    'projects',
    'focus',
] as const

export function HomeSignal() {
    const [frameIndex, setFrameIndex] = useState(0)
    const [messageIndex, setMessageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const activeMessage = useMemo(() => {
        return isHovered
            ? 'Open a project or read the manifesto.'
            : SIGNAL_MESSAGES[messageIndex]
    }, [isHovered, messageIndex])

    const activePrompt = useMemo(() => {
        return isHovered
            ? 'hello'
            : SIGNAL_PROMPTS[messageIndex]
    }, [isHovered, messageIndex])

    const { ref: messageRef, replay: replayMessage } = useScramble({
        text: activeMessage,
        speed: 0.75,
        tick: 2,
        step: 1,
        scramble: 2,
        seed: 2,
        chance: 0.85,
        range: [45, 95],
        overdrive: 95,
    })

    const { ref: promptRef, replay: replayPrompt } = useScramble({
        text: activePrompt,
        speed: 0.8,
        tick: 2,
        step: 1,
        scramble: 3,
        seed: 1,
        chance: 0.9,
        range: [45, 95],
        overdrive: 95,
    })

    useEffect(() => {
        const interval = window.setInterval(() => {
            setFrameIndex((current) => (current + 1) % SIGNAL_FRAMES.length)
            setMessageIndex((current) => (current + 1) % SIGNAL_MESSAGES.length)
        }, 1400)

        return () => window.clearInterval(interval)
    }, [])

    useEffect(() => {
        replayMessage()
        replayPrompt()
    }, [activeMessage, activePrompt, replayMessage, replayPrompt])

    return (
        <div
            className="border-t border-dashed border-border pt-4 text-foreground"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-[11px] uppercase tracking-[0.28em] text-muted">
                Preview
            </div>
            <pre
                aria-hidden="true"
                className="mt-4 overflow-x-auto text-[10px] leading-5 text-foreground sm:text-[11px]"
            >
                {SIGNAL_FRAMES[frameIndex]}
            </pre>
            <div className="mt-4 space-y-2 border-t border-dashed border-border pt-3">
                <p
                    ref={promptRef}
                    className="text-[11px] uppercase tracking-[0.22em] text-muted"
                />
                <p
                    ref={messageRef}
                    className="min-h-[2.75rem] text-sm leading-6 text-foreground"
                />
            </div>
        </div>
    )
}
