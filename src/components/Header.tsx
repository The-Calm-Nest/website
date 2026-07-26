const links = [
  { href: "#about", label: "Om oss" },
  { href: "#menu", label: "Ukens meny" },
  { href: "#farm-shop", label: "Gårdsbutikk" },
  { href: "#ordering", label: "Bestilling" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f0e7]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#home"
          className="font-serif text-lg uppercase tracking-[0.14em]"
        >
          The Calm Nest
        </a>

        <nav className="hidden gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.16em] hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#ordering"
          className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
        >
          Bestill
        </a>
      </div>
    </header>
  );
}