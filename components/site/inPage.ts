import type { FlowId } from "../how-it-works/flows";

/** Event waarmee menu-links de speelvorm in "Hoe het werkt" kiezen. */
export const MODE_EVENT = "centje:speelvorm";

/** Ankers die direct een speelvorm openen. */
export const MODE_BY_HASH: Record<string, FlowId> = {
  individueel: "individueel",
  groepscentje: "groep",
};

/**
 * Het anker van een link als die naar een plek op de huidige pagina wijst, anders null.
 * "/#stappen" telt alleen op de homepage; "#download" op elke pagina.
 */
export function inPageId(href: string, onHome: boolean): string | null {
  if (href.startsWith("#")) return href.slice(1);
  if (onHome && href.startsWith("/#")) return href.slice(2);
  return null;
}

/** Klik op een menulink: ankers op deze pagina zelf afhandelen, de rest laat Next.js navigeren. */
export function followLink(event: React.MouseEvent, href: string, onHome: boolean) {
  const id = inPageId(href, onHome);
  if (id && scrollToId(id)) event.preventDefault();
}

/** Soepel naar een anker scrollen en, bij een speelvorm-anker, die speelvorm kiezen. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  const mode = MODE_BY_HASH[id];
  if (mode) window.dispatchEvent(new CustomEvent<FlowId>(MODE_EVENT, { detail: mode }));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
