import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Update this list to change the phrases
const PHRASES = [
    'SaaS Products',
    'AI Tools',
    'B2B Platforms',
    'Design Systems',
    'User Research',
]

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function TypewriterTagBuilder() {
    const [typed, setTyped] = useState('')
    const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    const [isTyping, setIsTyping] = useState(true)
    const [isPressed, setIsPressed] = useState(false)
    const typingTimeout = useRef<NodeJS.Timeout | null>(null)

    // Typewriter effect
    useEffect(() => {
        let cancelled = false
        async function typePhrase() {
            setIsTyping(true)
            setIsPressed(false)
            const phrase = PHRASES[currentPhraseIdx]
            for (let i = 1; i <= phrase.length; i++) {
                if (cancelled) return
                setTyped(phrase.slice(0, i))
                await sleep(60)
            }
            await sleep(500) // Wait 0.5s after typing
            if (cancelled) return
            setIsPressed(true) // Pressed state
            await sleep(200) // Short pressed state
            if (cancelled) return
            setTags((prev) => [...prev, phrase])
            setIsTyping(false)
            setTyped('')
        }
        if (isTyping) {
            typePhrase()
        }
        return () => {
            cancelled = true
        }
        // eslint-disable-next-line
    }, [currentPhraseIdx, tags.length])

    // Advance to next phrase after tag is added
    useEffect(() => {
        if (!isTyping && tags.length <= PHRASES.length && tags.length > 0) {
            if (tags.length === PHRASES.length) {
                // All tags shown, wait 2s, then animate out and restart
                setTimeout(() => {
                    setTags([])
                    setCurrentPhraseIdx(0)
                    setIsTyping(true)
                }, 2000)
            } else {
                typingTimeout.current = setTimeout(() => {
                    setCurrentPhraseIdx((idx) => idx + 1)
                    setIsTyping(true)
                }, 600)
            }
        }
        return () => {
            if (typingTimeout.current) clearTimeout(typingTimeout.current)
        }
        // eslint-disable-next-line
    }, [isTyping, tags])

    // Remove tag handler
    const handleRemoveTag = (idx: number) => {
        setTags((prev) => prev.filter((_, i) => i !== idx))
    }

    return (
        <div className="w-full h-full flex items-center justify-start">
            <div className="w-full max-w-lg md:max-w-xl flex flex-col items-start">
                {/* Input Label */}
                <label className="mb-2 text-sm font-medium text-primary-500 dark:text-primary-400 select-none">
                    My focus areas
                </label>
                {/* Fake input box styled like ProjectCard input */}
                <div
                    className={`w-full border bg-blue-50/80 dark:bg-blue-900/80 border-blue-200 dark:border-blue-600 rounded-xl px-4 py-2 font-mono text-primary-900 dark:text-primary-100 text-base sm:text-lg min-h-[2.5rem] flex items-center transition-colors duration-200 ${
                        isPressed
                            ? 'bg-blue-200/80 dark:bg-blue-800/80 border-blue-500 dark:border-blue-600'
                            : ''
                    }`}
                    style={{ minHeight: '2.5rem' }}
                >
                    <span className="whitespace-pre">{typed}</span>
                    {/* Blinking cursor */}
                    <span
                        className="ml-0.5"
                        style={{
                            display: 'inline-block',
                            width: '0.7ch',
                        }}
                    >
                        <span
                            className="inline-block align-middle"
                            style={{
                                height: '1.6em',
                                width: '0.12em',
                                marginLeft: '-0.1em',
                                background: 'rgba(59, 130, 246, 0.7)', // blue-500/70
                                borderRadius: '2px',
                                animation: 'blink-cursor 1s steps(1) infinite',
                                verticalAlign: 'middle',
                            }}
                        />
                    </span>
                    <style>{`
                        @keyframes blink-cursor {
                            0%, 49% { opacity: 1; }
                            50%, 100% { opacity: 0; }
                        }
                    `}</style>
                </div>
                {/* Tags row styled like ProjectCard tags, with animation */}
                <div className="flex flex-wrap gap-2 mt-4 w-full">
                    <AnimatePresence initial={false}>
                        {tags.map((tag, idx) => (
                            <motion.span
                                key={tag + idx}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 16 }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                                className="px-2 py-1 text-sm bg-blue-50/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    className="ml-2 text-primary-400 hover:text-red-500 focus:outline-none"
                                    onClick={() => handleRemoveTag(idx)}
                                    aria-label={`Remove ${tag}`}
                                    tabIndex={0}
                                    type="button"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
