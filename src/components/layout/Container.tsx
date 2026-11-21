export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12">
            {children}
        </div>
    )
}
