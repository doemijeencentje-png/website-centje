export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "phone"; src: string; alt: string; caption: string }
  | { type: "photo"; src: string; alt: string; caption?: string }
  | { type: "example"; title: string; rows: { label: string; value: string }[]; note?: string }
  | { type: "tip"; title: string; text: string };

export interface Article {
  slug: string;
  title: string;
  /** Voor meta description en de kaart op het overzicht. */
  description: string;
  category: string;
  /** ISO-datum (JJJJ-MM-DD). */
  published: string;
  updated?: string;
  cover: { src: string; alt: string; position?: string };
  blocks: ArticleBlock[];
  related: string[];
}
