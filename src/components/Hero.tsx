'use client'

import React from 'react'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="container mx-auto px-6 py-12 md:py-24">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
                <div className="col-span-4 md:col-span-5 lg:col-span-6 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Hi! I'm <span className="text-blue-500">Ivan</span>
                        <br />
                        Product Designer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl">
                        I'm a product designer, focusing on complex business
                        tools such as SaaS products, project management
                        services, dashboards, and data visualization. My goal is
                        to help people do their jobs in the best possible way.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="#projects"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-3 lg:col-span-6 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-lg">
                        <Image
                            src="/hero-illustration.svg"
                            alt="Hero Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
