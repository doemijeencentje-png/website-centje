import type { Article } from "./articleTypes";

const MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function readingMinutes(article: Article) {
  const words = article.blocks
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
          return block.text;
        case "list":
          return block.items.join(" ");
        case "steps":
          return block.items.map((item) => `${item.title} ${item.text}`).join(" ");
        case "tip":
          return `${block.title} ${block.text}`;
        case "example":
          return block.rows.map((row) => `${row.label} ${row.value}`).join(" ");
        default:
          return "";
      }
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}
