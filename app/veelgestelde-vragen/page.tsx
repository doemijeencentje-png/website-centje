import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentShell } from "@/components/content/ContentShell";
import { FaqExplorer } from "@/components/content/FaqExplorer";
import { JsonLd } from "@/components/content/JsonLd";
import { FAQ } from "@/components/content/faq";

export const metadata: Metadata = pageMetadata({
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over Centje: hoe een challenge werkt, Groepscentje, de spellen, betalen met iDEAL en veiligheid.",
  path: "/veelgestelde-vragen",
});

export default function VeelgesteldeVragenPage() {
  return (
    <ContentShell
      crumbs={[{ label: "Veelgestelde vragen", href: "/veelgestelde-vragen" }]}
      title="Veelgestelde vragen"
      intro="Alles over challenges, Groepscentjes, de spellen en betalen. Kort en duidelijk, zodat je snel verder kunt."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.flatMap((category) =>
            category.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
            })),
          ),
        }}
      />
      <FaqExplorer categories={FAQ} />
    </ContentShell>
  );
}
