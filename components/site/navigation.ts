import { GameController, User, UsersThree, type Icon } from "@phosphor-icons/react";

export type SubItem = { label: string; text: string; href: string; icon: Icon };

export type TopItem = {
  label: string;
  /** Voluit in het mobiele menu, waar ruimte genoeg is. */
  longLabel?: string;
  href: string;
  /** Secties op de homepage die dit item actief maken tijdens het scrollen. */
  sections?: string[];
  /** Pagina (beginpad) die dit item actief maakt. */
  page?: string;
};

export const HOW_IT_WORKS_LABEL = "Hoe het werkt";
export const HOW_IT_WORKS_SECTIONS = ["stappen", "spellen"];

export const HOW_IT_WORKS: SubItem[] = [
  {
    label: "Individueel verzoek",
    text: "Daag één vriend uit. Wie beter speelt, betaalt minder.",
    href: "/#individueel",
    icon: User,
  },
  {
    label: "Groepscentje",
    text: "Verdeel de rekening met 3 tot 10 spelers.",
    href: "/#groepscentje",
    icon: UsersThree,
  },
  {
    label: "Spellen en Arcade",
    text: "Korte spellen, voor iedereen gelijk.",
    href: "/#spellen",
    icon: GameController,
  },
];

export const TOP_ITEMS: TopItem[] = [
  { label: "Veilig betalen", href: "/#veilig", sections: ["veilig"] },
  { label: "Ons verhaal", href: "/#over-ons", sections: ["over-ons"] },
  {
    label: "Vragen",
    longLabel: "Veelgestelde vragen",
    href: "/veelgestelde-vragen",
    sections: ["vragen"],
    page: "/veelgestelde-vragen",
  },
  { label: "Adverteren", href: "/adverteren", page: "/adverteren" },
];

export const HOME_SECTIONS = ["stappen", "spellen", "veilig", "over-ons", "vragen"];

export const LEGAL_LINKS = [
  { label: "Voorwaarden", href: "/voorwaarden" },
  { label: "Privacy", href: "/privacy" },
];
