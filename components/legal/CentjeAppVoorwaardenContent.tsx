import Link from "next/link";
import { LegalSection } from "@/components/LegalSection";
import { CENTJE_EMAIL_DISPLAY } from "@/lib/centje-contact";

const a = "text-[#009652] hover:text-[#007a45] hover:underline underline-offset-2";

export function CentjeAppVoorwaardenContent() {
  return (
    <>
      <LegalSection title="Waarover gaan deze voorwaarden?">
        <p>
          Deze voorwaarden gaan over de Centje-app waarmee je onder andere betaalverzoeken kunt
          klaarzetten en delen via berichtendiensten, zoals sms, WhatsApp of vergelijkbare apps.
        </p>
      </LegalSection>

      <LegalSection title="Centje en de app">
        <p>
          Wij zijn Centje: de dienst wordt aangeboden door de rechthebbende op het merk en de
          software van Centje. De intellectuele eigendomsrechten op de Centje-app berusten bij
          Centje of haar licentiegevers. Hoe online betalingen in de keten lopen, welke technische
          betaalpartij daarbij hoort en welke identificatie daarvoor geldt (zoals een KvK-nummer),
          vind je in het aparte document{" "}
          <Link href="/voorwaarden/betalingen" className={a}>
            Gebruiksvoorwaarden Centje betalingen
          </Link>
          , ook als je alleen een eenmalige betaling doet.
        </p>
        <p>
          Door de app te gebruiken ga je akkoord met deze voorwaarden en met de{" "}
          <Link href="/privacy" className={a}>
            privacyverklaring
          </Link>
          . Wat we met je gegevens doen en met welke partijen we die mogen delen, lees je daar; daar
          hoort geen tweede uitleg bij in dit document.
        </p>
      </LegalSection>

      <LegalSection title="Wat moet ik weten over Centje?">
        <p>
          Met de Centje-app kun je betaalverzoeken klaarzetten en delen via berichtendiensten. Je
          kunt bijvoorbeeld sms, WhatsApp of andere ondersteunde kanalen gebruiken, voor zover
          beschikbaar in de app.
        </p>
        <p>
          Die berichtendiensten zijn geen diensten van Centje. Wij zijn niet verantwoordelijk voor
          de verzending via die kanalen en hebben geen invloed op hoe zij met je gegevens omgaan.
          Zie de voorwaarden en het privacybeleid van de betreffende dienst. Je kunt alleen
          versturen als die dienst beschikbaar is.
        </p>
        <p>
          Je kunt betaalverzoeken onder meer intypen. Gebruik je spraakfuncties van je toestel
          (zoals spraakherkenning van Apple of Google), ben je zelf verantwoordelijk daarvoor; die
          aanbieders hebben eigen voorwaarden en privacyregels.
        </p>
        <p>
          Met de gegevens die je invult, kan automatisch een link of betaalstap ontstaan waarmee een
          betaler jou kan betalen. De betaler heeft daarvoor niet per se de Centje-app nodig.
        </p>
        <p>
          Als de app dat aanbiedt, kun je deelnemen aan acties, extra functies of promoties die daar
          staan beschreven. Niet elke functie is op elk moment beschikbaar.
        </p>
      </LegalSection>

      <LegalSection title="Groepsfuncties en challenges">
        <p>
          Je kunt met andere gebruikers groepsfuncties gebruiken (zoals gedeelde uitgaven of
          challenges). Je moet een uitnodiging accepteren voordat je meedoet, tenzij de app anders
          aangeeft. Uitgaven kun je in euro of andere valuta vastleggen als de app dat ondersteunt.
        </p>
        <p>
          Als alle uitgaven in een groep staan, kun je ze onderling verrekenen met een betaalverzoek.
          Iemand kan in sommige gevallen ook namens jou een verzoek aanmaken om terugbetaling
          makkelijker te maken.
        </p>
        <p>
          Iedereen in de groep kan de uitgaven inzien. Centje controleert niet of alle bedragen
          kloppen; deelnemers checken zelf hun afspraken.
        </p>
        <p>
          Bij vreemde valuta gebruiken we een koers die in de app wordt toegepast op het moment van
          invoer, volgens de regels die daar staan. Door omrekening en afronding kunnen kleine
          verschillen ontstaan. Bedragen op je bankafschrift kunnen afwijken als je bank een andere
          koers hanteert. Getoonde bedragen in de app zijn een indicatie; daar zijn geen rechten aan
          te ontlenen. Centje is niet aansprakelijk voor schade door het gebruik van deze
          groepsfuncties, voor zover de wet dat toestaat.
        </p>
        <p>
          Foto&apos;s of andere uploads in een groep zijn zichtbaar voor deelnemers. Jullie zijn
          zelf verantwoordelijk voor wat je uploadt. Centje kan moderatie toepassen, maar de
          eindverantwoordelijkheid blijft bij deelnemers. Inhoud mag niet beledigend of
          discriminerend zijn. Centje mag inhoud weigeren of verwijderen.
        </p>
        <p>
          Vragen of meldingen:{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Tot slot">
        <p>
          Voor betaalverzoeken kunnen maximumbedragen gelden, zoals in de app vermeld (bijvoorbeeld
          tot € 950 per verzoek, tenzij anders aangegeven).
        </p>
        <p>
          Voor challenges kunnen kosten in rekening worden gebracht, maar alleen bij de winnende
          partij van die challenge — niet bij de verliezer. Hoe hoog dat bedrag is en wanneer het
          verschuldigd is, staat in de app bij de betreffende challenge of uitleg.
        </p>
        <p>
          Daarnaast kunnen er andere kosten gelden die in de app worden vermeld (bijvoorbeeld rond
          identiteits- of betaalcontroles), voor zover daar staat beschreven.
        </p>
        <p>
          Je kunt Centje gebruiken wanneer je telefoonnummer, betaalgegevens en andere vereisten door
          de app worden ondersteund, zoals in de app of veelgestelde vragen staat.
        </p>
      </LegalSection>

      <LegalSection title="Privacyverklaring">
        <p>
          In de aparte{" "}
          <Link href="/privacy" className={a}>
            privacyverklaring
          </Link>{" "}
          lees je hoe we met persoonsgegevens omgaan en wat je rechten zijn. Daar hoort geen tweede,
          langere privacy-tekst in dit document bij.
        </p>
      </LegalSection>

      <LegalSection title="Wijzigingen">
        <p>
          Centje kan gebruiksmogelijkheden beperken of blokkeren, bijvoorbeeld het aantal verzoeken
          of bedragen. We kunnen de app en deze voorwaarden wijzigen. We informeren je waar redelijk
          mogelijk, bijvoorbeeld bij een volgende login. Blijf je de app gebruiken, dan gelden de
          wijzigingen voor jou, voor zover de wet dat toestaat.
        </p>
      </LegalSection>

      <LegalSection title="Stopzetten">
        <p>Je kunt stoppen door de app te verwijderen en je account te sluiten als dat kan.</p>
        <p>
          Centje kan jouw gebruik (tijdelijk) beëindigen. Als dat gepland is en geen acute
          misbruiksituatie is, streven we ernaar je ruim van tevoren te informeren, tenzij de wet of
          de situatie anders vereist. Bij (een vermoeden van) fraude of misbruik mag gebruik direct
          worden stopgezet.
        </p>
      </LegalSection>

      <LegalSection title="Aansprakelijkheid (app)">
        <p>
          Voor schade door derden (zoals betaalpartijen in de keten, banken, berichtendiensten of je
          eigen toestel) of door omstandigheden buiten onze redelijke invloed is Centje niet
          aansprakelijk, voor zover de wet dat toestaat.
        </p>
        <p>
          Centje is niet aansprakelijk voor het verlies van gegevens (bijvoorbeeld door een technische
          storing, een lek, een fout bij een leverancier of door jouw eigen toestel), behalve als de
          wet dwingend anders voorschrijft.
        </p>
        <p>
          Hetzelfde geldt voor andere schade of gevolgen rond gegevens in het kader van het
          app-gebruik, voor zover de wet dat toestaat.
        </p>
      </LegalSection>

      <LegalSection title="Recht en contact">
        <p>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen bij voorkeur in overleg;
          zo nodig de bevoegde rechter en dwingend consumentenrecht waar dat geldt.
        </p>
        <p>
          Vragen:{" "}
          <a href={`mailto:${CENTJE_EMAIL_DISPLAY}`} className={a}>
            {CENTJE_EMAIL_DISPLAY}
          </a>
          .
        </p>
      </LegalSection>

      <p className="text-xs text-neutral-500 leading-relaxed mt-12 pt-8 border-t border-neutral-200 max-w-2xl">
        <span className="font-medium text-neutral-600">Over kans:</span> bij challenges speelt vooral
        je keuze, inzicht en de afspraken in de app een rol; een eventueel kanselement is daardoor
        beperkt. Dit is geen kansspel in de zin van de wet. Je bepaalt zelf of je meedoet en of je
        betaalt.
      </p>
    </>
  );
}
