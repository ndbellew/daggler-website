import Link from "next/link";
import { ArrowUpRight, LinkedinIcon } from "@/components/icons";
import { ContentCard } from "@/components/content-card";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  const projects = getAllContent("projects").filter((item) => item.featured).slice(0, 2);
  const writing = getAllContent("writing").slice(0, 2);
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 sm:py-32">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 font-mono text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> 7+ YEARS IN PRODUCTION SOFTWARE</div>
          <div className="max-w-4xl">
            <p className="eyebrow">Backend · Distributed Systems · Cloud · Security</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Senior Software Engineer building <span className="text-accent">production systems.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{siteConfig.description}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/projects/" className="button-primary">Explore projects <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/resume/" className="button-secondary">View résumé</Link>
              <a href={siteConfig.social.linkedin} className="icon-button" aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <div className="mb-12 max-w-xl"><p className="eyebrow">Capabilities</p><h2 className="section-title mt-4">Across the engineering stack</h2><p className="mt-4 text-muted">Experience spanning architecture, implementation, deployment, production troubleshooting, and long-term support.</p></div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {siteConfig.specialties.map((item) => <article key={item.code} className="bg-panel p-6 sm:p-8"><span className="font-mono text-xs text-accent">/{item.code}</span><h3 className="mt-8 text-lg font-semibold">{item.name}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p></article>)}
        </div>
      </section>

      <section className="border-y border-line bg-panel/50"><div className="shell py-20 sm:py-28"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Selected work</p><h2 className="section-title mt-4">Featured projects</h2></div><Link className="hidden text-sm text-muted hover:text-accent sm:block" href="/projects/">All projects →</Link></div><div className="grid gap-5 md:grid-cols-2">{projects.map((entry) => <ContentCard key={entry.slug} entry={entry} kind="projects" />)}</div></div></section>

      <section className="shell py-20 sm:py-28"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Field notes</p><h2 className="section-title mt-4">Recent writing</h2></div><Link className="hidden text-sm text-muted hover:text-accent sm:block" href="/writing/">All writing →</Link></div><div className="grid gap-5 md:grid-cols-2">{writing.map((entry) => <ContentCard key={entry.slug} entry={entry} kind="writing" />)}</div></section>

      <section className="shell pb-20 sm:pb-28"><div className="rounded-3xl border border-line bg-ink p-8 text-surface sm:p-12 dark:bg-panel dark:text-ink"><p className="font-mono text-xs uppercase tracking-[.2em] text-accent">Start a conversation</p><div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Have a complex engineering problem worth unpacking?</h2><Link className="shrink-0 rounded-lg bg-surface px-5 py-3 text-sm font-medium text-ink dark:bg-ink dark:text-surface" href="/contact/">Get in touch</Link></div></div></section>
    </>
  );
}
