import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowUpRight, GithubIcon } from "@/components/icons";
import { formatDate, getAllContent, getContent } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getAllContent("projects").map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getContent("projects", (await params).slug);
  return entry ? { title: entry.title, description: entry.description } : {};
}

export default async function ProjectPage({ params }: Props) {
  const entry = getContent("projects", (await params).slug);
  if (!entry) notFound();
  return (
    <article className="shell py-16 sm:py-24">
      <Link href="/projects/" className="no-print font-mono text-xs text-muted hover:text-accent">← PROJECTS</Link>
      <header className="mt-10 max-w-4xl border-b border-line pb-12">
        <div className="flex flex-wrap gap-2">{entry.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h1 className="mt-7 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">{entry.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{entry.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-muted">{entry.date && <span>{formatDate(entry.date)}</span>}<span>{entry.status}</span>{entry.placeholder && <span className="text-accent">SAMPLE CONTENT</span>}</div>
        {(entry.repository || entry.demo) && <div className="no-print mt-8 flex flex-wrap gap-3">
          {entry.repository && <a className="button-secondary" href={entry.repository} target="_blank" rel="noreferrer"><GithubIcon className="h-4 w-4" />View repository <ArrowUpRight className="h-4 w-4" /></a>}
          {entry.demo && <a className="button-secondary" href={entry.demo} target="_blank" rel="noreferrer">Open demo <ArrowUpRight className="h-4 w-4" /></a>}
        </div>}
      </header>
      <div className="prose prose-slate mt-12 max-w-3xl dark:prose-invert"><MDXRemote source={entry.source} /></div>
    </article>
  );
}
