

export default function BottomNavigation({
    page,
    setPage,
    setSidebarCollapsed,
    setMobileMenuOpen
}) {

    return (

        <div
            className="
            md:hidden
            fixed
            bottom-0
            left-0
            right-0
            h-16

            bg-[#202634]/90
            backdrop-blur-xl

            border-t
            border-white/10

            flex
            justify-around
            items-center

            z-50
        ">

            <button
                onClick={() => setPage("calendar")}
                className={`flex flex-col items-center text-xs
                ${page === "calendar"
                    ? "text-green-400"
                    : "text-white/70"
                }`}
            >
                <span className="text-xl">📅</span>
                Calendar
            </button>

            <button
                onClick={() => setPage("analytics")}
                className={`flex flex-col items-center text-xs
                ${page === "analytics"
                    ? "text-green-400"
                    : "text-white/70"
                }`}
            >
                <span className="text-xl">📊</span>
                Analytics
            </button>

            <button
                className="flex flex-col items-center text-xs text-white/70"
            >
                <span className="text-xl">🍅</span>
                Focus
            </button>

            <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex flex-col items-center text-xs text-white/70"
            >
                <span className="text-xl">☰</span>
                Menu
            </button>

        </div>

    );

}