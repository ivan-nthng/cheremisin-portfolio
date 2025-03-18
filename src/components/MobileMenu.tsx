'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    navItems: Array<{ name: string; href: string }>
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden"
                >
                    <div className="flex justify-end p-4">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>
                    <nav className="flex flex-col items-center space-y-8 mt-8">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="text-2xl font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobileMenu
