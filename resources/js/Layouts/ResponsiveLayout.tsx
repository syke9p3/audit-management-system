export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {children}
        </div>
    )
}