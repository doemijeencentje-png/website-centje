import Image from "next/image";
import { IPhoneFrame } from "../IPhoneFrame";
import type { ArticleBlock } from "./articleTypes";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="text-[17px] leading-[1.75] text-neutral-700">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className="mt-5 first:mt-0">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={key}
                className="font-heading mt-12 text-balance text-[26px] font-extrabold leading-[1.1] text-[#0A0C0A] sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={key} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="relative pl-6">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-2 w-2 rounded-full bg-[#00D26A]" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={key} className="mt-6 space-y-4">
                {block.items.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00D26A] text-sm font-bold tabular-nums text-[#0A0C0A]">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-[#0A0C0A]">{item.title}</span>
                      <span className="block">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "phone":
            return (
              <figure key={key} className="my-10 flex flex-col items-center">
                <div className="w-[220px] sm:w-[240px]">
                  <IPhoneFrame>
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      quality={90}
                      sizes="240px"
                      className="object-cover object-top"
                    />
                  </IPhoneFrame>
                </div>
                <figcaption className="mt-4 max-w-sm text-center text-sm leading-relaxed text-neutral-500">
                  {block.caption}
                </figcaption>
              </figure>
            );
          case "photo":
            return (
              <figure key={key} className="my-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#0A0C0A]">
                  <Image src={block.src} alt={block.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "example":
            return (
              <div key={key} className="my-8 rounded-[24px] bg-[#F3F6F4] p-6 ring-1 ring-[#E3EAE6] sm:p-7">
                <p className="font-heading text-lg font-extrabold leading-tight text-[#0A0C0A]">{block.title}</p>
                <dl className="mt-4 divide-y divide-[#E3EAE6]">
                  {block.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-6 py-2.5">
                      <dt className="text-[15px] text-neutral-600">{row.label}</dt>
                      <dd className="shrink-0 text-[15px] font-semibold tabular-nums text-[#0A0C0A]">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                {block.note ? <p className="mt-3 text-sm leading-relaxed text-neutral-500">{block.note}</p> : null}
              </div>
            );
          case "tip":
            return (
              <aside key={key} className="my-8 rounded-r-[20px] border-l-4 border-[#00D26A] bg-[#F3F6F4] px-6 py-5">
                <p className="font-semibold text-[#0A0C0A]">{block.title}</p>
                <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-700">{block.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
