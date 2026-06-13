import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden en privacy — Centje",
  description:
    "Gebruiksvoorwaarden app, gebruiksvoorwaarden Centje betalingen en privacyverklaring.",
};

const linkClass =
  "text-sm font-medium text-[#009652] hover:text-[#007a45] hover:underline underline-offset-2";

export default function VoorwaardenHubPage() {
  return (
    <LegalPageShell
      headerVariant="hub"
      pageTitle="Gebruiksvoorwaarden en privacy"
      lastUpdated="21 maart 2026"
    >
      <p className="text-sm text-neutral-600 mb-12 leading-relaxed">
        Hieronder staan drie aparte documenten. Ze horen bij elkaar, maar elk heeft een eigen
        onderwerp, zodat we informatie niet onnodig herhalen.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-2">Gebruiksvoorwaarden app</h2>
          <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
            Alles over het gebruik van de Centje-app: betaalverzoeken, berichtendiensten,
            groepsfuncties, bedragen, wijzigingen en stopzetting.
          </p>
          <Link href="/voorwaarden/app" className={linkClass}>
            Lees de gebruiksvoorwaarden van de app
          </Link>
        </section>

        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-2">
            Gebruiksvoorwaarden Centje betalingen
          </h2>
          <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
            Alleen voor een eenmalige betaling wanneer iemand jou een betaallink of verzoek stuurt
            (bijvoorbeeld via iDEAL of een vergelijkbare route in je bankomgeving). Dit stuk gaat
            niet over het dagelijks gebruik van de app zelf — dat staat hierboven.
          </p>
          <Link href="/voorwaarden/betalingen" className={linkClass}>
            Lees de gebruiksvoorwaarden voor betalingen
          </Link>
        </section>

        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-2">Privacyverklaring</h2>
          <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
            Hoe we met persoonsgegevens omgaan, welke grondslagen we gebruiken en wat je rechten
            zijn. Gegevens en privacy staan niet nog een keer uitgewerkt in de gebruiksvoorwaarden;
            je vindt ze hier.
          </p>
          <Link href="/privacy" className={linkClass}>
            Lees de privacyverklaring
          </Link>
        </section>
      </div>
    </LegalPageShell>
  );
}
