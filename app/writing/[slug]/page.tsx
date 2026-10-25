import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PdfPublication } from "@/components/pdf-publication";
import { formatDate, getAllContent, getContent } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getAllContent("writing").map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getContent("writing", (await params).slug);
  return entry ? { title: entry.title, description: entry.description } : {};
}

export default async function WritingPage({ params }: Props) {
  const entry = getContent("writing", (await params).slug);
  if (!entry) notFound();
  return (
    <article className="shell py-16 sm:py-24">
      <Link href="/writing/" className="no-print font-mono text-xs text-muted hover:text-accent">← WRITING</Link>
      <header className="mt-10 max-w-4xl border-b border-line pb-12">
        <div className="flex flex-wrap gap-2">{entry.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h1 className="mt-7 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">{entry.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{entry.description}</p>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs text-muted">
          {entry.documentType && <span>{entry.documentType}</span>}
          {entry.author && <span>By {entry.author}</span>}
          {entry.date && <time dateTime={entry.date}>{formatDate(entry.date)}</time>}
          {entry.placeholder && <span className="text-accent">SAMPLE ARTICLE</span>}
        </div>
      </header>
      <div className="prose prose-slate mt-12 max-w-3xl dark:prose-invert"><MDXRemote source={entry.source} /></div>
      {entry.pdf && <PdfPublication path={entry.pdf} title={entry.title} />}
    </article>
  );
}
