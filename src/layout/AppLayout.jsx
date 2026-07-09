export default function AppLayout({
  sidebar,
  navbar,
  children,
}) {
  return (
    <div className="flex h-screen bg-[#0d1117] text-white overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 border-r border-[#2a2a2a] flex-shrink-0">
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 border-b border-[#2a2a2a]">
          {navbar}
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-auto">
          {children}
        </section>

      </main>

    </div>
  );
}