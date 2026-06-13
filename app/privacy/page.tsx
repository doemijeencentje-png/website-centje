import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjePrivacyContent } from "@/components/legal/CentjePrivacyContent";

export const metadata: Metadata = {
  title: "Privacyverklaring — Centje",
  description: "Privacyverklaring van Centje.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell headerVariant="hub" pageTitle="Privacyverklaring" lastUpdated="21 maart 2026">
      <CentjePrivacyContent />
    </LegalPageShell>
  );
}
