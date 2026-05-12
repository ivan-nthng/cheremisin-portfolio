'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LogoHolder() {
    return (
        <Link href="/" className="flex items-center gap-3">
            <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-xl font-bold text-primary-800 dark:text-primary-100">
                    IC
                </span>
            </motion.div>
            <motion.span
                className="text-xl font-heading font-bold text-primary-800 dark:text-primary-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Portfolio
            </motion.span>
        </Link>
    )
}
