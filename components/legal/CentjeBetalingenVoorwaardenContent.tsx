import Link from "next/link";
import { LegalSection } from "@/components/LegalSection";
import { CENTJE_EMAIL_DISPLAY, OPP_KVK_NUMBER } from "@/lib/centje-contact";

const a = "text-[#009652] hover:text-[#007a45] hover:underline underline-offset-2";

export function CentjeBetalingenVoorwaardenContent() {
  return (
    <>
      <LegalSection title="Waarover gaan deze voorwaarden?">
        <p>
          Deze voorwaarden gelden voor een eenmalige betaling via Centje wanneer iemand jou een
          betaallink of betaalverzoek stuurt. Ze gaan niet over het algemene gebruik van de
          Centje-app — dat staat in de{" "}
          <Link href="/voorwaarden/app" className={a}>
            gebruiksvoorwaarden van de app
          </Link>
          .
        </p>
        <p>
          Centje verzorgt de gebruikerservaring en het verzoek. De technische verwerking van de
          betaling verloopt via OPP (Online Payment Platform; KvK-nummer {OPP_KVK_NUMBER}) en jouw
          bank, bijvoorbeeld via iDEAL of een vergelijkbare route (open banking).
        </p>
      </LegalSection>

      <LegalSection title="Hoe werkt een betaling via Centje?">
        <p>
          Je kunt betalen als je via een link of verzoek bent uitgenodigd. Afhankelijk van de route
          kan dat via iDEAL of door een betaling te starten in je eigen bankomgeving.
        </p>
        <p>
          Bij iDEAL betaal je in de regel aan de faciliterende partij, die het bedrag doorstuurt;
          bij een directe bankoverschrijving kan de status aan de aanvrager worden doorgegeven,
          afhankelijk van de gekozen methode en de bank.
        </p>
        <p>
          Door de betaling af te ronden, ga je akkoord met de gekozen methode en route, en met de
          voorwaarden van de betrokken betaalpartij voor zover van toepassing.
        </p>
      </LegalSection>

      <LegalSection title="Wanneer ontvangt de ander de betaling?">
        <p>
          Dat hangt af van de betaalmethode en de verwerking door banken. Wij streven ernaar dat dit
          snel verloopt, in veel gevallen de eerstvolgende werkdag, tenzij je bank of de provider
          anders aangeeft.
        </p>
      </LegalSection>

      <LegalSection title="IBAN-naamcheck">
        <p>
          Het kan zijn dat er een naam-IBAN-controle wordt getoond (bijvoorbeeld een indicatie dat
          naam en rekening bij elkaar horen). Dat is een hulpmiddel; er zijn geen rechten aan te
          ontlenen. Ook zonder zichtbare &quot;vinkje&quot;-indicatie kan de betaling doorgaan als de
          app of de betaalstap dat toelaat.
        </p>
      </LegalSection>

      <LegalSection title="Kosten">
        <p>
          Voor deze eenmalige betaling worden door Centje in beginsel geen extra kosten in rekening
          gebracht, tenzij dit expliciet op de betaalpagina of in de app staat. Je bank of
          betaalprovider kan eigen tarieven hebben.
        </p>
        <p>
          Kosten die horen bij challenges (alleen voor de winnende partij) staan in de
          gebruiksvoorwaarden van de app, niet in dit document.
        </p>
        <p>
          Voor identiteits- en herkenningscontroles (KYC) die in het kader van OPP nodig zijn, kunnen
          wij eenmalig kosten in rekening brengen. Dat kan onder meer gelden bij het begin van het
          gebruik van de app rond de eerste betaling, en bij een uitgebreidere KYC wanneer het totaal
          aan bedragen dat je via de Centje-app hebt verstuurd € 1.500 overschrijdt (tenzij in de app
          een ander bedrag of moment staat aangegeven). Hoe hoog eventuele kosten zijn, zie je waar
          dat in de app of op de betaalstap wordt getoond. Die kosten zijn voor jouw eigen rekening.
        </p>
      </LegalSection>

      <LegalSection title="Waarvoor is Centje (niet) verantwoordelijk?">
        <p>
          De precieze aansprakelijkheid in de keten hangt af van de gekozen methode en de rol van OPP,
          banken en jouzelf. In algemene zin: Centje is niet verantwoordelijk voor vertragingen,
          misrouting of problemen die uitsluitend bij jouw bank, de bank van de ontvanger of bij OPP
          ontstaan, voor zover de wet dat toestaat.
        </p>
        <p>
          Centje is niet aansprakelijk voor het verlies van gegevens in het kader van deze
          betaalstap, behalve als de wet dwingend anders voorschrijft.
        </p>
        <p>
          Komt een betaling niet aan, dan moet je waar nodig bij je eigen bank of bij de bank van de
          ontvanger navragen doen. Voor schade door niet-bijgeschreven bedragen op het verkeerde IBAN
          gelden de regels van de betrokken betaalpartijen en de wet.
        </p>
      </LegalSection>

      <LegalSection title="Klachten over de betaling">
        <p>
          Neem bij klachten over deze betaling contact op via{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Toepasselijk recht">
        <p>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan
          de bevoegde rechter, met inachtneming van dwingend consumentenrecht.
        </p>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          Hoe we met persoonsgegevens omgaan, lees je alleen in de{" "}
          <Link href="/privacy" className={a}>
            privacyverklaring
          </Link>
          . Die herhalen we hier niet.
        </p>
      </LegalSection>

      <LegalSection title="Wijzigingen">
        <p>
          Centje en OPP kunnen deze voorwaarden wijzigen. De actuele versie staat op de Centje-site
          of in de app. Gebruik je de betaalstap na een wijziging, dan ga je akkoord met de versie
          die dan geldt, voor zover de wet dat toelaat.
        </p>
      </LegalSection>
    </>
  );
}
