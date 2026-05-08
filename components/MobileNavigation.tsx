const navItems = [
  { href: "#overview", label: "Home" },
  { href: "#checklist", label: "Checklist" },
  { href: "#quests", label: "Quests" },
  { href: "#info", label: "Info" },
];

export function MobileNavigation() {
  return (
    <nav
      aria-label="Primary sections"
      className="fixed inset-x-3 bottom-3 z-50 rounded-3xl bg-slate-950/95 p-2 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex min-h-12 items-center justify-center rounded-2xl px-2 text-center text-xs font-bold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
