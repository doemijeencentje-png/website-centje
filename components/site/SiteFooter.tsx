"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { followLink } from "./inPage";
import { Logo } from "./Logo";

// Bewust geen juridische links: die staan sinds 9-9-2026 niet meer op de site (de pagina's zelf
// blijven bereikbaar voor de app en de App Store).
const LINKS = [
  { label: "Hoe het werkt", href: "/#stappen" },
  { label: "Veilig betalen", href: "/#veilig" },
  { label: "Ons verhaal", href: "/#over-ons" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
  { label: "Adverteren", href: "/adverteren" },
];

/** Eén rustige voettekst: logo, één rij links en de ondertekening. */
export function SiteFooter() {
  const onHome = usePathname() === "/";

  return (
    <footer data-kop="donker" className="bg-[#0A0C0A] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
        <Logo />

        <nav aria-label="Voettekst" className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => followLink(event, link.href, onHome)}
                  className="inline-block rounded py-2 text-base text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-center text-sm text-white/45" suppressHydrationWarning>
          © {new Date().getFullYear()} Centje · Betalingen via Online Payment Platform
        </p>
      </div>
    </footer>
  );
}
