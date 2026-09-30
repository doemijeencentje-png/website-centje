"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { followLink } from "./inPage";
import { Logo } from "./Logo";

// Bewust geen juridische links: die staan sinds 9-9-2026 niet meer op de site (de pagina's zelf
// blijven bereikbaar voor de app en de App Store).
const COLUMNS = [
  {
    title: "Centje",
    links: [
      { label: "Hoe het werkt", href: "/#stappen" },
      { label: "Individueel verzoek", href: "/#individueel" },
      { label: "Groepscentje", href: "/#groepscentje" },
      { label: "Spellen en Arcade", href: "/#spellen" },
    ],
  },
  {
    title: "Hulp",
    links: [
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
      { label: "Veilig betalen", href: "/#veilig" },
      { label: "Wat kost Centje?", href: "/#kosten" },
      { label: "Ons verhaal", href: "/#over-ons" },
    ],
  },
  {
    title: "Zakelijk",
    links: [{ label: "Adverteren", href: "/adverteren" }],
  },
];

export function SiteFooter() {
  const onHome = usePathname() === "/";

  return (
    <footer data-kop="donker" className="bg-[#0A0C0A] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-14 pt-4 sm:pt-8 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-white/55">
              De app die betaalverzoeken leuker maakt met een spelletje.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-labelledby={`voet-${column.title}`}>
              <h2 id={`voet-${column.title}`} className="text-sm font-semibold text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(event) => followLink(event, link.href, onHome)}
                      className="rounded text-[15px] text-white/60 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Centje</p>
          <p>Betalingen via Online Payment Platform</p>
        </div>
      </div>
    </footer>
  );
}
