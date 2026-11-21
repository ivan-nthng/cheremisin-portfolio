'use client'

import { motion } from 'framer-motion'

export default function ComingSoonCard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative h-full rounded-2xl overflow-hidden border border-blue-100/50 dark:border-blue-800/50 backdrop-blur-sm"
        >
            <div className="p-6 sm:p-8 h-full flex items-center justify-center">
                <p className="text-md sm:text-md font-medium text-blue-900/60 dark:text-blue-100/60">
                    More Projects Coming Soon
                </p>
            </div>
        </motion.div>
    )
}
