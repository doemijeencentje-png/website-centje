export type FaqItem = { question: string; answer: string[] };

export type FaqCategory = { id: string; title: string; items: FaqItem[] };

// Elk antwoord is gecontroleerd tegen de app (Centje-back main, sept 2026) en de
// voorwaarden. Bewust niet noemen (wens Lodewijk): transactiekosten, rekenvoorbeelden
// of hoe bedragen berekend worden. Ook niet: maximumbedragen (app en voorwaarden
// verschillen nog) en spelnamen van anderen (de app toont die ook niet).
// Toon: formeel (u-vorm), kort en zakelijk.
// Tussen euroteken en bedrag staat een harde spatie (U+00A0), zodat ze op één regel blijven.

const Q = {
  watIs: {
    question: "Wat is Centje?",
    answer: [
      "Centje is een app waarmee u geld terugvraagt van vrienden, met een spel erbij. In plaats van een gewoon betaalverzoek verstuurt u een challenge. Beide partijen spelen hetzelfde spel en wie beter speelt, betaalt minder.",
    ],
  },
  verschil: {
    question: "Wat is het verschil tussen een individueel verzoek en een Groepscentje?",
    answer: [
      "Bij een individueel verzoek speelt u tegen één persoon. Met het percentage bepaalt u hoeveel de uitslag uitmaakt.",
      "Met een Groepscentje verdeelt u een rekening over 3 tot 10 deelnemers, uzelf meegerekend. De ranglijst bepaalt wie welk deel betaalt: de beste speler het minst, de laagst geëindigde speler het meest.",
    ],
  },
  geenApp: {
    question: "Moeten mijn vrienden de app hebben?",
    answer: [
      "Nee. Uw vrienden openen uw link in de browser, spelen daar het spel en betalen met iDEAL. Een account is niet nodig; zij vullen alleen hun naam en e-mailadres in.",
      "Advies: open een groepslink in een gewoon browservenster, niet in een privévenster.",
    ],
  },
  delen: {
    question: "Hoe deel ik een verzoek?",
    answer: [
      "Na het aanmaken deelt u de challenge via WhatsApp, of u laat de QR-code scannen. In het bericht staat waarvoor het verzoek is en om welk bedrag het gaat.",
    ],
  },
  geldig: {
    question: "Hoe lang is een challenge geldig?",
    answer: ["Een challenge van een individueel verzoek is standaard 30 dagen geldig."],
  },
  spellen: {
    question: "Welke spellen kan ik spelen?",
    answer: [
      "Alle spellen in Centje ontwikkelen wij zelf. Er zijn skillgames, waarin timing en behendigheid centraal staan, en denkspellen, waarin inzicht de doorslag geeft.",
      "Bij een verzoek kiest u uit korte skillgames die iedereen direct begrijpt. In de Arcade speelt u alle spellen vrijblijvend, ook de denkspellen.",
    ],
  },
  eerlijk: {
    question: "Is het eerlijk?",
    answer: [
      "Ja. Iedereen speelt onder dezelfde omstandigheden: hetzelfde level, met één poging. De score bepaalt de winnaar, dus inzicht, timing en vaardigheid.",
    ],
  },
  pogingen: {
    question: "Hoeveel pogingen heb ik?",
    answer: ["Eén. Zo is het voor iedereen gelijk. Oefenen kan in de Arcade, zo vaak u wilt."],
  },
  gelijkspel: {
    question: "Wat gebeurt er bij een gelijkspel?",
    answer: [
      "Bij een individueel verzoek beslist bij een gelijke score de afgelegde afstand, als het spel die bijhoudt. Is alles gelijk, dan hoeft niemand te betalen en kunt u opnieuw spelen.",
      "Bij een Groepscentje delen spelers met dezelfde score hun plaats op de ranglijst.",
    ],
  },
  arcade: {
    question: "Wat is de Arcade?",
    answer: [
      "In de Arcade speelt u alle spellen vrijblijvend, zonder dat er geld mee gemoeid is. Zo oefent u voordat het om de rekening gaat.",
    ],
  },
  zelfSpelen: {
    question: "Speel ik zelf ook mee?",
    answer: [
      "Ja. Na het delen van uw verzoek speelt u direct uw eigen beurt. Daarna wacht u op de overige deelnemers.",
    ],
  },
  percentage: {
    question: "Hoe werkt het percentage?",
    answer: [
      "Met het percentage bepaalt u hoeveel de uitslag uitmaakt. Hoe hoger het percentage, hoe groter het verschil tussen winnen en verliezen.",
      "Tijdens het instellen ziet u in de app direct wat u ontvangt als de ander beter of slechter speelt dan u.",
    ],
  },
  verdeling: {
    question: "Hoe werkt de verdeling bij een Groepscentje?",
    answer: [
      "De ranglijst bepaalt wie welk deel betaalt: de beste speler het minst, de laagst geëindigde speler het meest. Met de variatie bepaalt u hoe groot de verschillen tussen de plaatsen zijn.",
      "Tijdens het instellen van het Groepscentje ziet u direct wat elke plaats betaalt.",
    ],
  },
  kosten: {
    question: "Wat kost Centje?",
    answer: [
      "Centje downloaden is gratis. Bij het aanmaken van uw account betaalt u eenmalig € 1 voor de verificatie.",
      "Dit bedrag betaalt u met iDEAL, vanaf de bankrekening waarop u uw geld wilt ontvangen. Zo bevestigt u in één keer dat die rekening van u is, en komt uw geld altijd op de juiste rekening terecht.",
      "Wat u bij een verzoek afrekent, ziet u altijd vooraf in de app.",
    ],
  },
  organisator: {
    question: "Betaalt de organisator van een Groepscentje mee?",
    answer: [
      "De organisator speelt mee, maar betaalt niets aan zichzelf. De overige deelnemers betalen hun deel aan de organisator.",
      "Uw eigen plaats als organisator bepaalt wel hoeveel u terugkrijgt. Eindigt u hoger, dan is uw eigen deel van de rekening kleiner en ontvangt u meer. Eindigt u lager, dan is uw eigen deel groter en ontvangt u minder.",
    ],
  },
  hoeBetalen: {
    question: "Hoe betaal ik?",
    answer: [
      "Met iDEAL, in de vertrouwde omgeving van uw eigen bank. Na het spelen ziet u direct wat u betaalt. Tik op Betalen en rond de betaling af in uw bank-app.",
    ],
  },
  wanneerGeld: {
    question: "Wanneer staat het geld op mijn rekening?",
    answer: [
      "Na een betaling wordt het geld direct overgemaakt naar uw gekoppelde bankrekening. Binnen enkele seconden staat het erop. Alleen bij een storing bij de ontvangende of verzendende bank kan het langer duren.",
    ],
  },
  melding: {
    question: "Krijg ik een melding als er betaald is?",
    answer: [
      "Ja. U ontvangt een pushbericht zodra iemand heeft betaald, en bij een Groepscentje ook zodra iedereen heeft betaald. Ook wanneer uw tegenstander heeft gespeeld, laat de app dit weten.",
    ],
  },
  nietBetaald: {
    question: "Wat als iemand nog niet betaald heeft?",
    answer: [
      "In de app ziet u per persoon wie nog moet betalen. Vanuit de app stuurt u diegene een herinnering via WhatsApp.",
    ],
  },
  mislukt: {
    question: "Wat als een betaling mislukt?",
    answer: ["Tik opnieuw op Betalen; u ontvangt dan een nieuwe betaallink."],
  },
  nodig: {
    question: "Wat heb ik nodig om Centje te gebruiken?",
    answer: [
      "Een iPhone, een e-mailadres en een bankrekening waarmee u met iDEAL kunt betalen. Bij het aanmaken van uw account verifieert u eenmalig uw bankrekening, uw telefoonnummer en uw identiteit.",
      "Na een korte controle, meestal binnen enkele uren, kunt u betaalverzoeken versturen en ontvangen.",
    ],
  },
  verificatie: {
    question: "Waarom moet ik mijn account verifiëren?",
    answer: [
      "Omdat u via Centje geld ontvangt, is verificatie wettelijk verplicht, net als bij een bank. Dit heet KYC (know your customer). Zo weet onze betaalpartner Online Payment Platform zeker wie er achter elk account zit; dat maakt Centje veilig voor iedereen.",
      "U bevestigt uw telefoonnummer en uw identiteit, bijvoorbeeld met iDIN, en u koppelt uw bankrekening met de eenmalige iDEAL-betaling van € 1. In totaal kost dit enkele minuten.",
    ],
  },
  veilig: {
    question: "Is betalen via Centje veilig?",
    answer: [
      "Ja. U betaalt met iDEAL, via uw eigen bank. De betalingen worden verwerkt door Online Payment Platform, een betaalinstelling met een vergunning van De Nederlandsche Bank.",
    ],
  },
  telefoons: {
    question: "Op welke telefoons werkt Centje?",
    answer: [
      "De app is beschikbaar voor iPhone. Uw vrienden hebben de app niet nodig: zij spelen en betalen in de browser, op hun eigen telefoon.",
    ],
  },
} satisfies Record<string, FaqItem>;

export const FAQ: FaqCategory[] = [
  {
    id: "zo-werkt-het",
    title: "Zo werkt Centje",
    items: [Q.watIs, Q.verschil, Q.geenApp, Q.delen, Q.geldig],
  },
  {
    id: "spelen",
    title: "Spelen",
    items: [Q.spellen, Q.eerlijk, Q.pogingen, Q.gelijkspel, Q.zelfSpelen, Q.arcade],
  },
  {
    id: "bedragen-en-kosten",
    title: "Bedragen en kosten",
    items: [Q.percentage, Q.verdeling, Q.kosten, Q.organisator],
  },
  {
    id: "betalen",
    title: "Betalen en ontvangen",
    items: [Q.hoeBetalen, Q.wanneerGeld, Q.melding, Q.nietBetaald, Q.mislukt],
  },
  {
    id: "account-en-veiligheid",
    title: "Account en veiligheid",
    items: [Q.nodig, Q.verificatie, Q.veilig, Q.telefoons],
  },
];

/**
 * Selectie voor het vragenblok op de homepage. Vult aan wat de secties erboven al
 * uitleggen (geen app nodig, eerlijk spel, veilig betalen, de kosten).
 */
export const FAQ_HOME: FaqItem[] = [Q.spellen, Q.gelijkspel, Q.organisator, Q.nietBetaald, Q.verificatie, Q.telefoons];
