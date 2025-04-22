'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface BentoCardProps {
    title: string
    description: string
    index: number
}

const BentoCard: React.FC<BentoCardProps> = ({ title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="bg-blue-100/50 dark:bg-blue-900/50 rounded-2xl p-6 sm:p-8 relative"
    >
        <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
            <Check className="w-5 h-5 text-green-500" />
        </div>
        <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold font-poppins text-blue-900 dark:text-blue-100">
                {title}
            </h3>
            <p className="text-sm sm:text-base text-blue-800/80 dark:text-blue-200/80 font-mono">
                {description}
            </p>
        </div>
    </motion.div>
)

export default function ProjectBento() {
    const improvements = [
        {
            title: 'Context-Aware Interface',
            description:
                'Incoming requests auto-populate with relevant ride, payment, and user history data.',
        },
        {
            title: 'AI-Powered Suggestions',
            description:
                'Predictive actions help operators solve cases faster with minimal cognitive effort.',
        },
        {
            title: 'Scenario-Based Widgets',
            description:
                "Each request type triggers a dynamic layout showing only what's needed: fare breakdowns, map routes, payment logs, etc.",
        },
        {
            title: 'Pre-filtering Logic',
            description:
                'Non-actionable requests (32% of total) are automatically triaged before reaching an operator.',
        },
    ]

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-24 sm:py-32 space-y-8 sm:space-y-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="space-y-4"
            >
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-blue-900 dark:text-blue-100">
                    What We Did
                </h2>
                <p className="text-base sm:text-lg xl:w-1/2 lg:w-2/3 text-blue-800/80 dark:text-blue-200/80 font-mono">
                    Using insights from the Solver View and Support Request
                    Analysis, we focused entirely on optimizing the top 4 most
                    frequent scenarios. Instead of scaling the team, we scaled
                    the interface.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {improvements.map((item, index) => (
                    <BentoCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        index={index}
                    />
                ))}
            </div>
        </motion.section>
    )
}
