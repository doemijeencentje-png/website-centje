import type { Article } from "./articleTypes";

// Alle bedragen en regels volgen de app (Centje-back main, sept 2026).
// Tussen euroteken en bedrag staat een harde spatie (U+00A0), zodat ze op één regel blijven.

export const ARTICLES: Article[] = [
  {
    slug: "zo-werkt-het-percentage",
    title: "Zo werkt het percentage bij een individueel verzoek",
    description:
      "Met het percentage kies je hoeveel het spelletje uitmaakt. Uitleg met rekenvoorbeelden, zodat je precies weet wat je vriend betaalt.",
    category: "Uitleg",
    published: "2026-09-29",
    cover: {
      src: "/foto/samen.jpg",
      alt: "Twee vrienden op een terras met de rekening en een groene Centje-munt",
      position: "30% 40%",
    },
    blocks: [
      {
        type: "p",
        text: "Bij een individueel verzoek stuur je één vriend een challenge. Jullie spelen hetzelfde spel, en de uitslag bepaalt wat je vriend betaalt. Hoeveel verschil dat maakt, kies je zelf met het percentage.",
      },
      { type: "h2", text: "Wat het percentage doet" },
      {
        type: "p",
        text: "Het percentage bepaalt hoe ver het bedrag omhoog of omlaag kan gaan. Stel: je vriend is je € 20 schuldig en je kiest 33 procent. Speelt je vriend beter dan jij, dan gaat er 33 procent af. Speel jij beter, dan komt er 33 procent bij.",
      },
      {
        type: "example",
        title: "Voorbeeld: € 20 met 33 procent",
        rows: [
          { label: "Je vriend speelt beter", value: "€ 13,40" },
          { label: "Jij speelt beter", value: "€ 26,60" },
        ],
        note: "Wint je vriend, dan komt daar € 0,60 transactiekosten bij. In dit voorbeeld betaalt je vriend dan € 14,00 in plaats van € 20.",
      },
      {
        type: "p",
        text: "De transactiekosten zijn altijd voor de winnaar. Verliest je vriend, dan betaalt die dus alleen het hogere bedrag. Win jij, dan gaan de kosten van jouw winst af.",
      },
      { type: "h2", text: "Van rustig tot spannend" },
      {
        type: "example",
        title: "€ 20 bij verschillende percentages",
        rows: [
          { label: "25 procent", value: "€ 15,00 of € 25,00" },
          { label: "50 procent", value: "€ 10,00 of € 30,00" },
          { label: "75 procent", value: "€ 5,00 of € 35,00" },
        ],
        note: "Het eerste bedrag geldt als je vriend beter speelt, het tweede als jij beter speelt.",
      },
      { type: "h2", text: "Welk percentage kies je?" },
      {
        type: "list",
        items: [
          "Rond de 25 procent: een klein verschil. Fijn als het vooral om de gezelligheid gaat.",
          "50 procent: de standaard in de app. Winnen of verliezen maakt duidelijk verschil.",
          "Hoger dan 50 procent: voor wie van spanning houdt. Bij 100 procent betaalt je vriend niets als die wint, en het dubbele als die verliest.",
        ],
      },
      {
        type: "tip",
        title: "Tip bij kleine bedragen",
        text: "Kies bij een klein bedrag liever een wat hoger percentage, zodat winnen ook echt iets oplevert. Is het verschil kleiner dan de transactiekosten, dan laat de app dat meteen zien.",
      },
      { type: "h2", text: "Zo komt de uitslag tot stand" },
      {
        type: "p",
        text: "Jullie spelen allebei hetzelfde spel, elk met één poging. Wie de hoogste score haalt, wint. Bij een gelijke score beslist de afgelegde afstand, als het spel die bijhoudt. Is alles gelijk, dan hoeft niemand te betalen en kun je opnieuw spelen.",
      },
      {
        type: "phone",
        src: "/app/individueel-5-uitslag.webp",
        alt: "Uitslagscherm Gewonnen met de scores 34 tegen 41 en te betalen 14 euro",
        caption: "Gewonnen: je vriend betaalt € 14,00 in plaats van € 20.",
      },
      {
        type: "p",
        text: "Je vriend heeft de app niet nodig. De challenge opent gewoon in de browser, en betalen gaat met iDEAL.",
      },
    ],
    related: ["wat-is-een-groepscentje", "geld-terugvragen-zonder-ongemak"],
  },
  {
    slug: "wat-is-een-groepscentje",
    title: "Wat is een Groepscentje? Uitleg met rekenvoorbeeld",
    description:
      "Met een Groepscentje verdeel je een rekening met de hele groep via één spel. Zo werkt de verdeling, met een voorbeeld van € 100 voor vier personen.",
    category: "Uitleg",
    published: "2026-09-29",
    cover: {
      src: "/foto/groep.jpg",
      alt: "Vrienden aan tafel op een terras aan de gracht met pizza",
      position: "50% 42%",
    },
    blocks: [
      {
        type: "p",
        text: "Met een Groepscentje verdeel je een gezamenlijke rekening over de hele groep. Iedereen speelt hetzelfde spel, en de ranglijst bepaalt wie wat betaalt: wie het best speelt, betaalt het minst.",
      },
      { type: "h2", text: "Zo start je een Groepscentje" },
      {
        type: "steps",
        items: [
          { title: "Tik op de groene plus", text: "Kies Groepscentje in het menu Nieuw verzoek." },
          { title: "Vul de gegevens in", text: "Een naam, het totaalbedrag en het aantal spelers: van 3 tot 10, jij telt mee." },
          { title: "Kies de variatie", text: "Daarmee bepaal je hoe groot het verschil tussen de plekken is. Je ziet meteen wat elke plek betaalt." },
          { title: "Kies een spel en deel de link", text: "Eén link voor de hele groep, via WhatsApp of met de QR-code." },
        ],
      },
      { type: "h2", text: "Rekenvoorbeeld: € 100 met vier spelers" },
      {
        type: "p",
        text: "Stel: jullie hebben met z'n vieren voor € 100 gegeten. Zonder spel betaalt iedereen € 25. Met een variatie van 40 procent ziet de verdeling er zo uit:",
      },
      {
        type: "example",
        title: "€ 100, vier spelers, variatie 40 procent",
        rows: [
          { label: "1e plaats", value: "€ 15,00" },
          { label: "2e plaats", value: "€ 21,67" },
          { label: "3e plaats", value: "€ 28,33" },
          { label: "4e plaats", value: "€ 35,00" },
        ],
        note: "Samen precies € 100. Voor wie betaalt, komt er een kleine transactievergoeding bij. Die zie je in de app voordat je betaalt.",
      },
      {
        type: "phone",
        src: "/app/groep-2-verdeling.webp",
        alt: "Variatie van 40 procent: de eerste plek betaalt 15 euro, de vierde plek 35 euro",
        caption: "De verdeling zie je al tijdens het instellen.",
      },
      { type: "h2", text: "Jij organiseert, jij ontvangt" },
      {
        type: "p",
        text: "Als organisator speel je gewoon mee, maar je maakt zelf niets over: de anderen betalen hun deel aan jou. Eindig je bijvoorbeeld op de derde plek, dan is dat bedrag jouw eigen deel van de rekening.",
      },
      {
        type: "p",
        text: "Je vrienden hebben geen account nodig. Ze openen de link, vullen hun naam in en spelen mee. Zodra iedereen gespeeld heeft, is de pot verdeeld en rekent iedereen af met iDEAL.",
      },
      {
        type: "phone",
        src: "/app/groep-5-ranglijst.webp",
        alt: "Ranglijst De pot is verdeeld met Tim op de eerste plek",
        caption: "Tim eindigde als eerste en betaalt het minst.",
      },
      { type: "h2", text: "Welke variatie past bij jullie?" },
      {
        type: "list",
        items: [
          "30 procent: kleine verschillen, iedereen betaalt ongeveer hetzelfde.",
          "50 procent: de standaard. Duidelijk verschil tussen de eerste en de laatste plek.",
          "Tot 100 procent: voor fanatieke groepen. De winnaar betaalt dan heel weinig, de laatste flink meer.",
        ],
      },
      {
        type: "tip",
        title: "Tip",
        text: "Spreek de variatie van tevoren af, dan weet iedereen waar het om gaat.",
      },
    ],
    related: ["rekening-splitsen-met-vrienden", "zo-werkt-het-percentage"],
  },
  {
    slug: "rekening-splitsen-met-vrienden",
    title: "Rekening splitsen met vrienden: zo houd je het leuk",
    description:
      "Etentje, terras of weekendje weg? Met deze tips verdeel je de rekening zonder gedoe, en met een spelletje wordt het ook nog leuk.",
    category: "Tips",
    published: "2026-09-29",
    cover: {
      src: "/foto/rekening.jpg",
      alt: "Vrienden aan tafel op een terras aan de gracht; één van hen slaat de handen voor zijn hoofd terwijl de rest lacht",
      position: "50% 38%",
    },
    blocks: [
      {
        type: "p",
        text: "De avond was top, en dan komt de rekening. Wie betaalt wat, wie had er nog een extra drankje, en wie stuurt straks het verzoek? Met een paar simpele afspraken blijft het gezellig.",
      },
      { type: "h2", text: "1. Laat één persoon afrekenen" },
      {
        type: "p",
        text: "Voor de bediening is het het makkelijkst als één persoon de hele rekening betaalt. Daarna verdeel je het bedrag onderling. Zo sta je niet met z'n allen bij de kassa.",
      },
      { type: "h2", text: "2. Spreek de verdeling vooraf af" },
      {
        type: "p",
        text: "Gelijk delen is het eenvoudigst. Heeft iemand duidelijk meer besteld, trek dat er dan eerst af en verdeel de rest. Dan hoeft niemand achteraf te rekenen.",
      },
      { type: "h2", text: "3. Stuur het verzoek meteen" },
      {
        type: "p",
        text: "Het voelt het meest ontspannen als het verzoek nog dezelfde avond binnenkomt. Iedereen weet dan nog waar het over gaat. Met Centje stuur je één link in de groepsapp en is het geregeld.",
      },
      { type: "h2", text: "4. Maak er een spelletje van" },
      {
        type: "p",
        text: "Met een Groepscentje wordt afrekenen het laatste potje van de avond. Iedereen speelt hetzelfde spel met één poging, en de ranglijst bepaalt de verdeling: wie het best speelt, betaalt het minst.",
      },
      { type: "h2", text: "5. Kies een variatie die bij de groep past" },
      {
        type: "p",
        text: "Een etentje met collega's vraagt om iets anders dan een avond met vrienden die van een uitdaging houden. Met de variatie kies je hoe groot de verschillen zijn: van 30 procent voor kleine verschillen tot 100 procent voor echte fanatiekelingen.",
      },
      { type: "h2", text: "6. Houd het overzicht" },
      {
        type: "p",
        text: "In de app zie je per persoon wat er betaald is en wie nog moet. Is iemand het vergeten, dan stuur je vanuit de app een vriendelijke herinnering via WhatsApp.",
      },
      {
        type: "phone",
        src: "/app/ontvanger.webp",
        alt: "Overzicht van een Groepscentje met per vriend het bedrag en of er al betaald is",
        caption: "Per vriend zie je het bedrag en of er al betaald is.",
      },
      {
        type: "tip",
        title: "Handig om te weten",
        text: "Je vrienden hebben de app niet nodig. Ze spelen en betalen gewoon via de link.",
      },
    ],
    related: ["wat-is-een-groepscentje", "geld-terugvragen-zonder-ongemak"],
  },
  {
    slug: "geld-terugvragen-zonder-ongemak",
    title: "Geld terugvragen van vrienden, zonder ongemakkelijk gedoe",
    description:
      "Geld terugvragen voelt soms ongemakkelijk, ook bij kleine bedragen. Zo pak je het vriendelijk aan, en zo maakt een challenge het luchtiger.",
    category: "Tips",
    published: "2026-09-29",
    cover: {
      src: "/foto/spelen.jpg",
      alt: "Een groep vrienden speelt aan tafel op hun telefoon",
      position: "50% 40%",
    },
    blocks: [
      {
        type: "p",
        text: "Je schoot de taxi voor, betaalde de boodschappen of kocht de concertkaartjes. Logisch dat je dat geld terug wilt, en toch voelt vragen soms ongemakkelijk. Dat is heel normaal, en met een paar handvatten wordt het een stuk makkelijker.",
      },
      { type: "h2", text: "Waarom het soms lastig voelt" },
      {
        type: "p",
        text: "Bij vrienden wil je niet zakelijk overkomen. Juist bij kleine bedragen twijfel je of het de moeite waard is om erover te beginnen. Maar een duidelijk verzoek voorkomt dat het blijft hangen, en dat is uiteindelijk prettiger voor iedereen.",
      },
      { type: "h2", text: "Zo vraag je het vriendelijk" },
      {
        type: "list",
        items: [
          "Wees duidelijk over waar het voor is, bijvoorbeeld 'etentje zaterdag'.",
          "Stuur het verzoek snel, dan weet iedereen nog waar het over gaat.",
          "Houd de toon luchtig. Een betaalverzoek is geen verwijt.",
          "Geef mensen even de tijd, en stuur daarna eventueel één vriendelijke herinnering.",
        ],
      },
      { type: "h2", text: "Maak er een challenge van" },
      {
        type: "p",
        text: "Met Centje stuur je geen kaal verzoek, maar een uitnodiging voor een spelletje. Je vriend speelt hetzelfde spel als jij. Speelt je vriend beter, dan betaalt die minder. Speel jij beter, dan krijg je meer. Zo wordt het verzoek een grapje tussen jullie, in plaats van een herinnering aan geld.",
      },
      {
        type: "phone",
        src: "/app/individueel-4-delen.webp",
        alt: "Scherm Deel je challenge met een QR-code en een WhatsApp-knop",
        caption: "Deel de challenge via WhatsApp of laat de QR-code scannen.",
      },
      {
        type: "p",
        text: "In het bericht staat ook waar het voor is. Dat vul je in bij 'Waar is het voor?', bijvoorbeeld 'Etentje'. Je vriend opent de link, speelt in de browser en betaalt met iDEAL. Een account of de app is niet nodig.",
      },
      { type: "h2", text: "En als het even duurt?" },
      {
        type: "p",
        text: "Heeft je vriend nog niet gespeeld? In je overzicht zie je dat meteen bij 'Wacht op tegenstander'. Een kort berichtje is meestal genoeg.",
      },
      {
        type: "tip",
        title: "Tip",
        text: "Kies een percentage dat bij de situatie past. Bij een klein bedrag werkt een wat hoger percentage vaak het leukst, omdat winnen dan echt iets uitmaakt.",
      },
    ],
    related: ["zo-werkt-het-percentage", "rekening-splitsen-met-vrienden"],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
