'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Skill {
    name: string
    level: number
    category: 'frontend' | 'backend' | 'other'
}

const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'TypeScript', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    // Backend
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'Express', level: 80, category: 'backend' },
    { name: 'MongoDB', level: 75, category: 'backend' },
    { name: 'PostgreSQL', level: 70, category: 'backend' },
    // Other
    { name: 'Git', level: 90, category: 'other' },
    { name: 'Docker', level: 70, category: 'other' },
    { name: 'AWS', level: 65, category: 'other' },
    { name: 'CI/CD', level: 75, category: 'other' },
]

const About: FC = () => {
    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        About Me
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Get to know me better
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80"
                            alt="About me"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Who I Am
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                I'm a passionate Full Stack Developer with a
                                strong foundation in web development and a keen
                                eye for creating exceptional user experiences.
                                With several years of experience in building
                                modern web applications, I specialize in
                                creating scalable and maintainable solutions
                                using cutting-edge technologies.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                My Journey
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                My journey in software development began with a
                                curiosity for creating things that live on the
                                internet. Over the years, I've worked on various
                                projects ranging from small business websites to
                                complex enterprise applications, always focusing
                                on delivering high-quality, performant
                                solutions.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Skills
                            </h3>
                            <div className="space-y-6">
                                {['frontend', 'backend', 'other'].map(
                                    (category) => (
                                        <div key={category}>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3 capitalize">
                                                {category}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {skills
                                                    .filter(
                                                        (skill) =>
                                                            skill.category ===
                                                            category,
                                                    )
                                                    .map((skill) => (
                                                        <div key={skill.name}>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    {skill.name}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        skill.level
                                                                    }
                                                                    %
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                <motion.div
                                                                    initial={{
                                                                        width: 0,
                                                                    }}
                                                                    whileInView={{
                                                                        width: `${skill.level}%`,
                                                                    }}
                                                                    viewport={{
                                                                        once: true,
                                                                    }}
                                                                    transition={{
                                                                        duration: 1,
                                                                        delay: 0.5,
                                                                    }}
                                                                    className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
