export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Loading...
                </p>
            </div>
        </div>
    )
}
