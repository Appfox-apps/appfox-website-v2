import Image from "next/image";
import Link from "next/link";
import { INLINE_LINK_RE, type PostBlock } from "@/data/posts";

const linkClass =
  "font-medium text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-[3px] transition-colors hover:text-brand-700 hover:decoration-brand-300";

/**
 * Renders block text, turning inline `[anchor](href)` markup into links.
 * Content stays plain strings in data/posts.ts (JSON-LD-safe); only this
 * renderer knows about the link syntax.
 */
function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(new RegExp(INLINE_LINK_RE.source, "g"))) {
    const [raw, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} target="_blank" rel="noopener" className={linkClass}>
          {label}
        </a>
      )
    );
    last = start + raw.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

/**
 * Renders a post's structured blocks into the design-system's editorial
 * typography. Content is plain strings (plus `[anchor](href)` link markup and
 * `img` blocks) so the same data can feed JSON-LD without escaping surprises.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-14 first:mt-0 max-w-[34ch] text-[1.75rem]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-10 first:mt-0">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="till mt-px shrink-0 text-marigold-700">
                      —
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="till mt-px shrink-0 text-marigold-700">
                      {j + 1}.
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="font-display mt-10 border-l-2 border-marigold-500 pl-5 text-[1.375rem] leading-snug text-ink-900 italic"
              >
                {block.text}
              </blockquote>
            );
          case "img":
            return (
              <figure key={i} className="mt-8 first:mt-0">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  sizes="(min-width: 768px) 68ch, 100vw"
                  className="h-auto w-full rounded-xl border border-paper-edge"
                />
                {block.caption ? (
                  <figcaption className="till mt-3 text-[0.8125rem] text-ink-500">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "p":
          default:
            return (
              <p key={i} className="mt-6 first:mt-0 text-lg leading-relaxed text-ink-700">
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
