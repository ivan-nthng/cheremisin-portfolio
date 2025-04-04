import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Could not find the requested resource
                </p>
                <Link
                    href="/"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
