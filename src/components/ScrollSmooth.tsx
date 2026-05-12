'use client'

import { useEffect } from 'react'

export default function ScrollSmooth() {
    useEffect(() => {
        // Add scroll-smooth class to html element
        document.documentElement.classList.add('scroll-smooth')
    }, [])

    return null
}
