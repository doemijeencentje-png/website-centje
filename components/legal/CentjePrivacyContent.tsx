import Link from "next/link";
import { LegalSection } from "@/components/LegalSection";
import { CENTJE_EMAIL_DISPLAY } from "@/lib/centje-contact";

const a = "text-[#009652] hover:text-[#007a45] hover:underline underline-offset-2";

export function CentjePrivacyContent() {
  return (
    <>
      <p className="text-sm text-neutral-600 mb-10 leading-relaxed">
        Deze privacyverklaring geldt voor de Centje-app en de website. Wij verwerken
        persoonsgegevens zoals hieronder beschreven en in lijn met de AVG. Voor het gebruik van de
        dienst gelden ook de{" "}
        <Link href="/voorwaarden/betalingen" className={a}>
          gebruiksvoorwaarden voor betalingen
        </Link>{" "}
        (onder meer over de betaalpartner) en de{" "}
        <Link href="/voorwaarden/app" className={a}>
          gebruiksvoorwaarden van de app
        </Link>
        .
      </p>

      <LegalSection title="Wat is Centje?">
        <p>Met Centje kun je onder meer:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>betaalverzoeken versturen en ontvangen;</li>
          <li>een eenmalige betaling doen via een link of betaalstap;</li>
          <li>
            groepsfuncties gebruiken, zoals gedeelde uitgaven of challenges, voor zover beschikbaar in
            de app.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Jouw persoonsgegevens">
        <p>
          Wij gaan zorgvuldig om met je gegevens. Hieronder lees je welke gegevens dat kunnen zijn,
          waarvoor wij ze gebruiken en wat je rechten zijn.
        </p>
      </LegalSection>

      <LegalSection title="Contact over privacy">
        <p>
          Vragen over privacy:{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          . Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
        </p>
      </LegalSection>

      <LegalSection title="Wat zijn persoonsgegevens?">
        <p>
          Dat zijn gegevens die direct of indirect over jou gaan, zoals naam, e-mailadres,
          telefoonnummer, leeftijd, bank- of betaalgegevens, IP-adres, apparaat- en gebruiksgegevens.
        </p>
      </LegalSection>

      <LegalSection title="Waar mogen we gegevens voor gebruiken (grondslagen)?">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-neutral-800">Overeenkomst:</strong> om de dienst te leveren, je
            account te beheren, betaalverzoeken te ondersteunen en vragen te beantwoorden.
          </li>
          <li>
            <strong className="text-neutral-800">Wettelijke verplichting:</strong> bijvoorbeeld rond
            fraudepreventie of fiscale bewaarplicht, voor zover van toepassing.
          </li>
          <li>
            <strong className="text-neutral-800">Toestemming:</strong> voor bijvoorbeeld bepaalde
            marketing of niet-noodzakelijke cookies, als wij daar om vragen.
          </li>
          <li>
            <strong className="text-neutral-800">Gerechtvaardigd belang:</strong> voor beveiliging,
            fraudepreventie, productverbetering en statistiek, met afweging van jouw belangen.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Welke gegevens gebruiken we waarvoor?">
        <p>
          <strong className="text-neutral-800">Eenmalige betaling:</strong> onder meer IBAN, naam,
          e-mail (voor bevestiging of communicatie), IP- en apparaatgegevens, en technische gegevens
          van je browser of apparaat die nodig zijn voor de betaling.
        </p>
        <p>
          <strong className="text-neutral-800">Gebruik van de app:</strong> onder meer
          contactgegevens, naam (om aan anderen te tonen bij verzoeken), IBAN waar nodig, IP- en
          apparaatgegevens, technische app- en loggegevens, inhoud van verzoeken en groepen, en
          media die je uploadt, voor zover je dat doet.
        </p>
      </LegalSection>

      <LegalSection title="Cookies en vergelijkbare technieken">
        <p>
          Wij kunnen cookies of vergelijkbare technieken gebruiken voor functionaliteit, analyse of
          — waar toegestaan — voor gepersonaliseerde inhoud of advertenties. Waar de wet om vraagt,
          vragen wij toestemming.
        </p>
      </LegalSection>

      <LegalSection title="Andere partijen">
        <p>
          Voor betalingen werken wij samen met een betaalpartner. Die ontvangt de gegevens die voor
          de betaling nodig zijn. Zie ook de{" "}
          <Link href="/voorwaarden/betalingen" className={a}>
            gebruiksvoorwaarden voor betalingen
          </Link>
          . Verder kunnen IT-leveranciers gegevens verwerken onder afspraken (bijvoorbeeld als
          verwerker).
        </p>
      </LegalSection>

      <LegalSection title="Direct marketing en berichten">
        <p>
          Wij kunnen je serviceberichten sturen die nodig zijn voor de dienst. Voor promotionele
          berichten of pushmeldingen gelden de instellingen in de app en — waar nodig — jouw
          toestemming.
        </p>
      </LegalSection>

      <LegalSection title="Social media">
        <p>
          Via social media kunnen wij contact hebben met gebruikers. Dan kunnen gegevens worden
          verwerkt volgens deze verklaring én het beleid van dat platform.
        </p>
      </LegalSection>

      <LegalSection title="Profilering">
        <p>
          Wij kunnen gegevens combineren om segmenten te maken of de dienst te personaliseren en,
          waar toegestaan, relevante aanbiedingen te tonen. Je kunt bezwaar maken of toestemming
          intrekken waar de wet dat toelaat.
        </p>
      </LegalSection>

      <LegalSection title="Beveiliging en bewaartermijnen">
        <p>
          Wij nemen passende maatregelen om gegevens te beschermen. Geen systeem is volledig
          risicovrij; ook jij kunt helpen met een veilig toestel en sterke toegang. Verdenk je
          misbruik, meld het via{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          .
        </p>
        <p>
          Centje is niet aansprakelijk voor het verlies van gegevens (bijvoorbeeld door storing,
          lek, fout bij een leverancier of door jouw eigen apparatuur), behalve als de wet dwingend
          anders voorschrijft.
        </p>
        <p>
          Wij bewaren gegevens zolang dat nodig is voor de doelen, tenzij de wet een langere bewaring
          verplicht. Bij geschillen kan langer bewaren nodig zijn tot afhandeling.
        </p>
      </LegalSection>

      <LegalSection title="Jouw rechten">
        <p>
          Je hebt recht op inzage, correctie, verwijdering, beperking, bezwaar en dataportabiliteit
          waar de AVG dat voorschrijft. Niet alles kan altijd worden gewist, bijvoorbeeld bij
          wettelijke bewaarplicht. Verzoeken:{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          . Let op veiligheid als je gegevens deelt met anderen.
        </p>
      </LegalSection>

      <LegalSection title="Verband met de voorwaarden">
        <p>
          De{" "}
          <Link href="/voorwaarden" className={a}>
            gebruiksvoorwaarden
          </Link>{" "}
          (app en betalingen) regelen het gebruik van de dienst. Deze privacyverklaring regelt
          alleen gegevens — wij herhalen de voorwaarden hier niet.
        </p>
      </LegalSection>

      <LegalSection title="Wijzigingen">
        <p>
          Deze verklaring kan wijzigen als de dienst verandert. Wij informeren je waar passend.
          Raadpleeg ze af en toe opnieuw.
        </p>
      </LegalSection>
    </>
  );
}
