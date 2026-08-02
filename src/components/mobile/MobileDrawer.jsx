import { X } from "lucide-react";

export default function MobileDrawer({
    open,
    onClose,
    children,
}) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0
                    bg-black/40
                    backdrop-blur-sm
                    transition-opacity
                    duration-300
                    z-40

                    ${open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`
                    fixed
                    top-0
                    left-0

                    h-screen
                    w-72

                    bg-[#1f2937]/90
                    backdrop-blur-2xl

                    border-r
                    border-white/10

                    shadow-2xl

                    z-50

                    transform
                    transition-transform
                    duration-300

                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"}
                `}
            >

                <div className="flex items-center justify-between p-4 border-b border-white/10">

                    <h2 className="text-xl font-bold">
                        Habit Tracker
                    </h2>

                    <button
    onClick={onClose}
    className="
        text-2xl
        text-gray-300
        hover:text-white
        transition-colors
    "
>
    ✕
</button>

                </div>

                <div className="overflow-y-auto h-full">

                    {children}

                </div>

            </aside>
        </>
    );
}