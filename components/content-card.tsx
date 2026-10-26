import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { ArrowUpRight } from "@/components/icons";

export function ContentCard({ entry, kind }: { entry: ContentMeta; kind: "projects" | "writing" }) {
  const label = kind === "writing"
    ? entry.documentType ?? "Writing"
    : entry.placeholder ? "SAMPLE" : entry.status ?? "PROJECT";
  const displayYear = entry.year ?? entry.date?.slice(0, 4);

  return (
    <article className="card group relative flex h-full flex-col p-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight"><Link className="after:absolute after:inset-0" href={`/${kind}/${entry.slug}/`}>{entry.title}</Link></h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{entry.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-muted">
        <span>{label}</span>
        {displayYear && <span>{displayYear}</span>}
      </div>
    </article>
  );
}
