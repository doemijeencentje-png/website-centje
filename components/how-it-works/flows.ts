export type FlowId = "individueel" | "groep";

export interface FlowStep {
  title: string;
  text: string;
  image: string;
  alt: string;
}

export interface Flow {
  id: FlowId;
  label: string;
  summary: string;
  steps: FlowStep[];
}

// Alle schermen zijn echte app-schermen met verzonnen demodata (Sanne, Tim, Noor, Daan).
// Toon: formeel (u-vorm), zakelijk en kort.
export const FLOWS: Flow[] = [
  {
    id: "individueel",
    label: "Individueel verzoek",
    summary:
      "U stuurt één persoon een betaalverzoek met een spel. Wie beter speelt, betaalt het kleinste deel.",
    steps: [
      {
        title: "Start een verzoek",
        text: "Tik op de groene plus en kies Individueel verzoek.",
        image: "/app/individueel-1-start.webp",
        alt: "Centje-app met het menu Nieuw verzoek: Individueel verzoek of Groepscentje",
      },
      {
        title: "Kies bedrag en percentage",
        text: "Hoe hoger het percentage, hoe groter het verschil tussen winnen en verliezen. U ziet direct wat u ontvangt.",
        image: "/app/individueel-2-bedrag.webp",
        alt: "Scherm Nieuw verzoek met een bedrag van 20 euro en een percentage van 33 procent",
      },
      {
        title: "Kies een spel",
        text: "Beide spelers spelen hetzelfde spel, met één poging per persoon.",
        image: "/app/individueel-3-spel.webp",
        alt: "Scherm Kies je spel met een geselecteerd spel",
      },
      {
        title: "Deel het verzoek",
        text: "Verstuur het via WhatsApp of laat de QR-code scannen. De ontvanger heeft de app niet nodig.",
        image: "/app/individueel-4-delen.webp",
        alt: "Scherm Deel je challenge met een QR-code en een WhatsApp-knop",
      },
      {
        title: "Speel en betaal",
        text: "Wint de ontvanger, dan betaalt die minder. Wint u, dan betaalt die meer. Afrekenen gebeurt met iDEAL.",
        image: "/app/individueel-5-uitslag.webp",
        alt: "Uitslagscherm Gewonnen met de scores 34 tegen 41 en te betalen 14 euro",
      },
    ],
  },
  {
    id: "groep",
    label: "Groepscentje",
    summary:
      "Iedereen speelt hetzelfde spel. De beste speler betaalt het minst, de laagst geëindigde speler het meest.",
    steps: [
      {
        title: "Start een Groepscentje",
        text: "Geef het een naam, vul het totaalbedrag in en kies het aantal deelnemers: 3 tot 10, uzelf meegerekend.",
        image: "/app/groep-1-start.webp",
        alt: "Scherm Maak Groepscentje met de titel Pizza-avond, 100 euro en 4 spelers",
      },
      {
        title: "Kies de verdeling",
        text: "Met de variatie bepaalt u hoe groot het verschil tussen de plaatsen is. U ziet direct wat elke plaats betaalt.",
        image: "/app/groep-2-verdeling.webp",
        alt: "Variatie van 40 procent: de eerste plek betaalt 15 euro, de vierde plek 35 euro",
      },
      {
        title: "Kies een spel",
        text: "Iedereen speelt hetzelfde spel en krijgt één poging.",
        image: "/app/groep-3-spel.webp",
        alt: "Scherm Kies je spel voor het Groepscentje",
      },
      {
        title: "Deel met de groep",
        text: "Eén link voor de hele groep. Wie de link opent, kiest een naam en speelt mee. Een account is niet nodig.",
        image: "/app/groep-4-delen.webp",
        alt: "Scherm Deel je link met de QR-code van het Groepscentje Pizza-avond",
      },
      {
        title: "De ranglijst beslist",
        text: "Zodra iedereen heeft gespeeld, is de verdeling bekend. Hoe hoger de plaats, hoe kleiner het deel. U ontvangt het totaalbedrag.",
        image: "/app/groep-5-ranglijst.webp",
        alt: "Ranglijst De pot is verdeeld met Tim op de eerste plek",
      },
    ],
  },
];
