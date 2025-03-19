'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    navItems: Array<{ name: string; href: string }>
}

export default function MobileMenu({
    isOpen,
    onClose,
    navItems,
}: MobileMenuProps) {
    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-gray-900"
        >
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 active:scale-90 transition-transform"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                </div>

                <nav className="mt-8">
                    <ul className="space-y-6">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={onClose}
                                    style={{
                                        fontFamily: 'var(--font-poppins)',
                                        fontWeight: 700,
                                    }}
                                    className="block text-2xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </motion.div>
    )
}
