export default function AppLayout({
  sidebar,
  navbar,
  children,
  sidebarCollapsed,
}) {
  return (
    <div className="flex 
                    h-screen 
                    bg-[#0d1117] 
                    text-white 
                    overflow-hidden">

      {/* Sidebar */}
      <aside className={`
    border-r
    border-[#2a2a2a]
    flex-shrink-0

    transition-all
    duration-300
    ease-in-out

    ${sidebarCollapsed ? "w-20" : "w-72"}
  `}>
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-14
                           lg:h-16 
                           border-b 
                           border-[#2a2a2a]
                           flex-shrink-0">
          {navbar}
        </header>

        {/* Page Content */}
        <section className="flex-1
                            overflow-y-auto
                            overflow-x-hidden">
          {children}
        </section>

      </main>

    </div>
  );
}