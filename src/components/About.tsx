'use client'

import React from 'react'

export default function About() {
    return (
        <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 dark:text-white">
                        About Me
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-mono">
                        I'm passionate about creating intuitive and efficient
                        interfaces that solve real business problems.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-8">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-heading text-gray-900 dark:text-white mb-4">
                            Experience
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-mono">
                            Over 5 years of experience in product design,
                            working with startups and established companies.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-heading text-gray-900 dark:text-white mb-4">
                            Skills
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-mono">
                            Proficient in UX research, wireframing, prototyping,
                            and design systems.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-heading text-gray-900 dark:text-white mb-4">
                            Approach
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-mono">
                            Data-driven design decisions combined with strong
                            user empathy and business understanding.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
