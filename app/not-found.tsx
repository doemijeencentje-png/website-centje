import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ContentShell } from "@/components/content/ContentShell";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "Naar de homepage", href: "/" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
];

export default function NotFound() {
  return (
    <ContentShell
      crumbs={[]}
      title="Deze pagina bestaat niet"
      intro="Mogelijk klopt de link niet of is de pagina verplaatst. Hieronder vindt u de belangrijkste pagina's."
    >
      <nav aria-label="Verder naar" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <ul className="flex flex-wrap gap-3">
          {LINKS.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold outline-none transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98] ${
                  index === 0 ? "bg-[#0A0C0A] text-white" : "bg-[#F4F7F5] text-[#0A0C0A]"
                }`}
              >
                {link.label}
                <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </ContentShell>
  );
}
