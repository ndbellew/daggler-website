import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "Resume", description: "Web and printable resume." };

const experience = [
  { role: "Your recent engineering role", company: "Company placeholder", period: "20XX — Present", bullets: ["Replace with a concise description of ownership, scope, and measurable impact.", "Describe a technically difficult decision without disclosing confidential information.", "Quantify reliability, performance, cost, security, or delivery outcomes where verifiable."] },
  { role: "Your previous engineering role", company: "Company placeholder", period: "20XX — 20XX", bullets: ["Replace with evidence of collaboration and engineering execution.", "Describe systems, methods, or responsibilities using only accurate details."] },
];

const skills = ["Languages — replace", "Application architecture — replace", "Cloud & infrastructure — replace", "Security — replace", "AI/ML — replace", "Observability — replace"];

export default function ResumePage() {
  return (
    <div className="shell py-12 sm:py-20">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm"><p><strong>Template resume:</strong> replace every placeholder before publishing.</p><PrintButton /></div>
      <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Resume</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">{siteConfig.name}</h1><p className="mt-2 text-lg text-muted">{siteConfig.role}</p></div>
        <address className="not-italic text-sm leading-6 text-muted sm:text-right"><p>{siteConfig.location}</p><a className="hover:text-accent" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p className="no-print"><Link className="hover:text-accent" href="/">Portfolio home</Link></p></address>
      </header>
      <div className="grid gap-12 py-10 lg:grid-cols-[1fr_15rem]">
        <div className="space-y-12">
          <section><h2 className="eyebrow">Profile</h2><p className="mt-4 max-w-3xl leading-7 text-muted">Replace this text with a factual professional summary covering your experience level, the problems you solve, and the environments in which you work best.</p></section>
          <section><h2 className="eyebrow">Experience</h2><div className="mt-6 space-y-9">{experience.map((job) => <article key={job.role} className="break-inside-avoid"><div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"><div><h3 className="font-semibold">{job.role}</h3><p className="text-sm text-muted">{job.company}</p></div><p className="font-mono text-xs text-muted">{job.period}</p></div><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>
          <section><h2 className="eyebrow">Selected projects</h2><p className="mt-4 leading-7 text-muted">Add two or three relevant, verifiable projects with your role and their outcomes. Detailed case studies can link to the project archive.</p></section>
        </div>
        <aside className="space-y-10">
          <section><h2 className="eyebrow">Skills</h2><ul className="mt-4 space-y-3 text-sm text-muted">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>
          <section><h2 className="eyebrow">Education</h2><p className="mt-4 text-sm leading-6 text-muted">Degree or credential placeholder<br />Institution placeholder<br />Year placeholder</p></section>
          <section><h2 className="eyebrow">Links</h2><ul className="mt-4 space-y-2 text-sm text-muted"><li><a className="hover:text-accent" href={siteConfig.social.github}>GitHub</a></li><li><a className="hover:text-accent" href={siteConfig.social.linkedin}>LinkedIn</a></li></ul></section>
        </aside>
      </div>
    </div>
  );
}
