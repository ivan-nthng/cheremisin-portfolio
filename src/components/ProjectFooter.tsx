import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Calendar, Instagram, Star } from 'lucide-react'

interface TeamMember {
    role: string
}

interface ProjectFooterProps {
    team: TeamMember[]
    technologies: string[]
    email?: string
    linkedin?: string
    github?: string
    instagram?: string
    bookingLink?: string
}

export function ProjectFooter({
    team,
    technologies,
    email = 'ivan@cheremisin.co.uk',
    linkedin = 'https://www.linkedin.com/in/icheremisin/',
    github = 'https://github.com/ivan-nthng',
    instagram = 'https://www.instagram.com/cheremisin.co.uk/',
    bookingLink = 'https://calendly.com/icheremisin/30min',
}: ProjectFooterProps) {
    // Count technology occurrences to determine star visibility
    const technologyCounts = technologies.reduce((acc, tech) => {
        acc[tech] = (acc[tech] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    // Get star opacity based on usage count (matching Projects.tsx logic)
    const getStarOpacity = (count: number) => {
        if (count >= 5) return 1
        if (count === 4) return 0.8
        if (count === 3) return 0.6
        if (count === 2) return 0.4
        return 0
    }

    return (
        <div className="relative py-16 sm:py-20 md:py-24 border-t border-b border-blue-200/30 dark:border-blue-800/30">
            <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    {/* Header - Full width */}
                    <motion.div
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-12 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-blue-900 dark:text-blue-100">
                            Thanks for watching!
                        </h1>
                    </motion.div>

                    {/* Team Column */}
                    <motion.div
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100 mb-6">
                            Team
                        </h3>
                        <ul className="space-y-2">
                            {team.map((member, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-blue-800/80 dark:text-blue-200/80"
                                >
                                    {member.role}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Technologies Column */}
                    <motion.div
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100 mb-6">
                            Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm bg-blue-100/80 dark:bg-blue-200/20 text-primary-700 dark:text-primary-200 rounded flex items-center gap-1"
                                >
                                    {technologyCounts[tech] > 1 && (
                                        <Star
                                            className="w-3 h-3"
                                            style={{
                                                opacity: getStarOpacity(
                                                    technologyCounts[tech],
                                                ),
                                            }}
                                        />
                                    )}
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contacts Column */}
                    <motion.div
                        className="col-span-2 sm:col-span-4 md:col-span-8 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-100 mb-6">
                            Contacts
                        </h3>
                        <div className="space-y-4">
                            {/* Email */}
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-2 text-sm text-blue-800/80 dark:text-blue-200/80 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span>{email}</span>
                            </a>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>

                            {/* Book Call Button */}
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium hover:bg-blue-200/50 dark:hover:bg-blue-800/50 transition-colors"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Book a Call</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
