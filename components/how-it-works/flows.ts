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
  tagline: string;
  summary: string;
  photo: { src: string; position: string };
  steps: FlowStep[];
}

// Alle schermen zijn echte app-schermen met verzonnen demodata (Sanne, Tim, Noor, Daan).
export const FLOWS: Flow[] = [
  {
    id: "individueel",
    label: "Individueel verzoek",
    tagline: "Jij tegen je maat",
    summary:
      "Stuur één vriend een challenge. Speelt je vriend beter, dan betaalt die minder. Speel jij beter, dan krijg je meer.",
    photo: {
      src: "/foto/vrienden-bank.jpg",
      position: "50% 25%",
    },
    steps: [
      {
        title: "Start een verzoek",
        text: "Tik op de groene plus en kies Individueel verzoek.",
        image: "/app/individueel-1-start.webp",
        alt: "Centje-app met het menu Nieuw verzoek: Individueel verzoek of Groepscentje",
      },
      {
        title: "Kies bedrag en percentage",
        text: "Hoe hoger het percentage, hoe groter het verschil tussen winnen en verliezen. Je ziet meteen wat je ontvangt.",
        image: "/app/individueel-2-bedrag.webp",
        alt: "Scherm Nieuw verzoek met een bedrag van 20 euro en een percentage van 33 procent",
      },
      {
        title: "Kies een spel",
        text: "Jullie spelen allebei hetzelfde spel, met één poging per persoon.",
        image: "/app/individueel-3-spel.webp",
        alt: "Scherm Kies je spel met een geselecteerd spel",
      },
      {
        title: "Deel de challenge",
        text: "Stuur hem via WhatsApp of laat de QR-code scannen. Je vriend heeft de app niet nodig.",
        image: "/app/individueel-4-delen.webp",
        alt: "Scherm Deel je challenge met een QR-code en een WhatsApp-knop",
      },
      {
        title: "Speel en betaal",
        text: "Jullie spelen allebei. Wint je vriend, dan betaalt die minder. Win jij, dan betaalt die meer. Afrekenen gaat met iDEAL.",
        image: "/app/individueel-5-uitslag.webp",
        alt: "Uitslagscherm Gewonnen met de scores 34 tegen 41 en te betalen 14 euro",
      },
    ],
  },
  {
    id: "groep",
    label: "Groepscentje",
    tagline: "Met de hele groep",
    summary:
      "Iedereen speelt hetzelfde spel. De beste speler betaalt het minst, de slechtste het meest.",
    photo: {
      src: "/foto/groep-gracht.jpg",
      position: "50% 30%",
    },
    steps: [
      {
        title: "Start een Groepscentje",
        text: "Geef het een naam, vul het totaalbedrag in en kies met hoeveel jullie zijn: van 3 tot 10 spelers, jij telt mee.",
        image: "/app/groep-1-start.webp",
        alt: "Scherm Maak Groepscentje met de titel Pizza-avond, 100 euro en 4 spelers",
      },
      {
        title: "Kies de verdeling",
        text: "Met de variatie bepaal je hoe groot het verschil tussen de plekken is. Je ziet meteen wat elke plek betaalt.",
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
        text: "Eén link voor de hele groep. Wie klikt, kiest een eigen naam en speelt mee. Een account is niet nodig.",
        image: "/app/groep-4-delen.webp",
        alt: "Scherm Deel je link met de QR-code van het Groepscentje Pizza-avond",
      },
      {
        title: "De ranglijst beslist",
        text: "Heeft iedereen gespeeld, dan is de pot verdeeld. Hoe hoger je eindigt, hoe minder je betaalt. Jij ontvangt de pot.",
        image: "/app/groep-5-ranglijst.webp",
        alt: "Ranglijst De pot is verdeeld met Tim op de eerste plek",
      },
    ],
  },
];
