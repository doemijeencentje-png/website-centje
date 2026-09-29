export type FaqItem = { question: string; answer: string[] };

export type FaqCategory = { id: string; title: string; items: FaqItem[] };

// Elk antwoord is gecontroleerd tegen de app (Centje-back main, sept 2026) en de
// voorwaarden. Bewust niet genoemd: maximumbedragen (app en voorwaarden verschillen
// nog) en spelnamen van anderen (de app toont die ook niet).
// Tussen euroteken en bedrag staat een harde spatie (U+00A0), zodat ze op één regel blijven.

const Q = {
  watIs: {
    question: "Wat is Centje?",
    answer: [
      "Centje is een app om geld terug te vragen van vrienden, met een spelletje erbij. In plaats van een kaal betaalverzoek stuur je een challenge. Jullie spelen hetzelfde spel, en wie beter speelt, betaalt minder.",
    ],
  },
  verschil: {
    question: "Wat is het verschil tussen een individueel verzoek en een Groepscentje?",
    answer: [
      "Met een individueel verzoek speel je tegen één vriend. Met het percentage kies je hoeveel de uitslag uitmaakt.",
      "Met een Groepscentje verdeel je een rekening over 3 tot 10 spelers, jij meegerekend. De ranglijst bepaalt wie wat betaalt: de beste speler betaalt het minst, de slechtste het meest.",
    ],
  },
  geenApp: {
    question: "Moeten mijn vrienden de app hebben?",
    answer: [
      "Nee. Je vrienden openen je link gewoon in de browser, spelen daar het spel en betalen met iDEAL. Een account is niet nodig: ze vullen alleen hun naam en e-mailadres in.",
      "Tip: open een groepslink in een gewoon browservenster, niet in een privévenster.",
    ],
  },
  delen: {
    question: "Hoe deel ik een verzoek?",
    answer: [
      "Na het aanmaken deel je je challenge via WhatsApp, of je laat de QR-code scannen. In het bericht staat waar het verzoek voor is en om welk bedrag het gaat.",
    ],
  },
  geldig: {
    question: "Hoe lang is een challenge geldig?",
    answer: ["Een challenge van een individueel verzoek is standaard 30 dagen geldig."],
  },
  spellen: {
    question: "Welke spellen kan ik spelen?",
    answer: [
      "Bij een verzoek kies je uit korte vaardigheidsspellen die iedereen meteen snapt. In de Arcade staan nog veel meer spellen, van kaartspellen en puzzels tot Centje Kart, ons eigen racespel. In de app zie je ook welke spellen binnenkort komen.",
    ],
  },
  eerlijk: {
    question: "Is het eerlijk?",
    answer: [
      "Ja. Iedereen speelt onder precies dezelfde omstandigheden: hetzelfde level, met één poging. De winnaar wordt bepaald door de score, dus door inzicht, timing en vaardigheid.",
    ],
  },
  pogingen: {
    question: "Hoeveel pogingen heb ik?",
    answer: [
      "Eén. Zo is het voor iedereen gelijk. Oefenen kan in de Arcade, zo vaak als je wilt.",
    ],
  },
  gelijkspel: {
    question: "Wat gebeurt er bij een gelijkspel?",
    answer: [
      "Bij een individueel verzoek beslist bij een gelijke score de afgelegde afstand, als het spel die bijhoudt. Is alles gelijk, dan hoeft niemand te betalen en kun je opnieuw spelen.",
      "Bij een Groepscentje delen spelers met dezelfde score hun plek. Ze betalen dan elk het gemiddelde van die plekken.",
    ],
  },
  arcade: {
    question: "Wat is de Arcade?",
    answer: [
      "In de Arcade speel je alle spellen voor de lol, zonder dat er geld meespeelt. Ideaal om te oefenen voordat het om de rekening gaat.",
    ],
  },
  zelfSpelen: {
    question: "Speel ik zelf ook mee?",
    answer: [
      "Ja. Na het delen van je verzoek speel je direct je eigen beurt. Daarna is het wachten op de rest.",
    ],
  },
  percentage: {
    question: "Hoe werkt het percentage?",
    answer: [
      "Het percentage bepaalt hoeveel de uitslag uitmaakt. Bij € 20 en 33 procent betaalt je vriend € 13,40 als die beter speelt, en € 26,60 als jij beter speelt.",
      "Je kiest het percentage zelf, van 0 tot 100 procent. Standaard staat het op 50 procent.",
    ],
  },
  verdeling: {
    question: "Hoe werkt de verdeling bij een Groepscentje?",
    answer: [
      "Het totaalbedrag wordt verdeeld over de plekken op de ranglijst. Met de variatie, van 30 tot 100 procent, kies je hoe groot het verschil tussen de plekken is.",
      "Voorbeeld: € 100 met vier spelers en 40 procent variatie wordt € 15,00, € 21,67, € 28,33 en € 35,00.",
    ],
  },
  kosten: {
    question: "Wat kost Centje?",
    answer: [
      "Centje downloaden is gratis. Per betaling rekenen we € 0,60 transactiekosten.",
      "Bij een individueel verzoek zijn die kosten altijd voor de winnaar. Wint je vriend, dan komen ze bovenop het bedrag. Win jij, dan gaan ze van je winst af. Bij een Groepscentje worden de kosten verdeeld over iedereen die betaalt. Het bedrag dat je betaalt, zie je altijd vooraf.",
    ],
  },
  organisator: {
    question: "Betaalt de organisator van een Groepscentje mee?",
    answer: [
      "De organisator speelt mee, maar maakt zelf niets over: de anderen betalen hun deel aan de organisator. Op welke plek de organisator ook eindigt, dat bedrag is gewoon het eigen deel van de rekening.",
    ],
  },
  hoeBetalen: {
    question: "Hoe betaal ik?",
    answer: [
      "Met iDEAL, in de vertrouwde omgeving van je eigen bank. Na het spelen zie je meteen wat je betaalt. Tik op Betalen en rond de betaling af in je bank-app.",
    ],
  },
  wanneerGeld: {
    question: "Wanneer staat het geld op mijn rekening?",
    answer: [
      "Na een betaling wordt het geld overgemaakt naar je gekoppelde bankrekening, in veel gevallen de eerstvolgende werkdag.",
    ],
  },
  melding: {
    question: "Krijg ik een melding als er betaald is?",
    answer: [
      "Ja. Je krijgt een pushbericht zodra iemand betaald heeft, en bij een Groepscentje ook zodra iedereen betaald heeft. Ook als je tegenstander gespeeld heeft, laat de app het je weten.",
    ],
  },
  nietBetaald: {
    question: "Wat als iemand nog niet betaald heeft?",
    answer: [
      "In de app zie je per persoon wie er nog moet betalen. Vanuit de app stuur je diegene een vriendelijke herinnering via WhatsApp.",
    ],
  },
  mislukt: {
    question: "Wat als een betaling mislukt?",
    answer: ["Geen probleem. Tik opnieuw op Betalen, dan krijg je een nieuwe betaallink."],
  },
  nodig: {
    question: "Wat heb ik nodig om Centje te gebruiken?",
    answer: [
      "Een iPhone, een e-mailadres en een bankrekening waarmee je met iDEAL kunt betalen. Bij het aanmaken van je account verifieer je eenmalig je bankrekening, je telefoonnummer en je identiteit.",
      "Na een korte controle, meestal binnen een paar uur, kun je centjes sturen en ontvangen.",
    ],
  },
  verificatie: {
    question: "Waarom moet ik mijn identiteit verifiëren?",
    answer: [
      "Omdat je via Centje geld ontvangt, is verificatie wettelijk verplicht, net als bij een bank. Onze betaalpartner Online Payment Platform (OPP) regelt dat veilig.",
      "Je bevestigt je telefoonnummer en je identiteit, bijvoorbeeld met iDIN, en je koppelt je bankrekening met een eenmalige iDEAL-betaling van € 1. Die euro is een eenmalige bijdrage voor de verificatie. Het geheel kost je een paar minuten.",
    ],
  },
  veilig: {
    question: "Is betalen via Centje veilig?",
    answer: [
      "Ja. Je betaalt met iDEAL, via je eigen bank. De betalingen worden verwerkt door Online Payment Platform, een betaalinstelling met een vergunning van De Nederlandsche Bank.",
    ],
  },
  telefoons: {
    question: "Op welke telefoons werkt Centje?",
    answer: [
      "De app is er voor iPhone. Je vrienden hebben de app niet nodig: zij spelen en betalen gewoon in de browser, op hun eigen telefoon.",
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

/** Selectie voor het vragenblok op de homepage. */
export const FAQ_HOME: FaqItem[] = [Q.geenApp, Q.verschil, Q.eerlijk, Q.kosten, Q.hoeBetalen, Q.veilig];
