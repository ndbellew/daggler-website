import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "About", description: siteConfig.description };

export default function AboutPage() {
  return (
    <div className="shell pb-24">
      <PageHeading
        eyebrow="About"
        title={`${siteConfig.name} — ${siteConfig.role}`}
        description={siteConfig.summary}
      />
      <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[15rem_1fr]">
        <h2 className="eyebrow">Professional focus</h2>
        <div className="max-w-3xl space-y-8 text-lg leading-8 text-muted">
          <p><strong className="text-ink">Own systems end to end.</strong> Experience spans architecture and implementation through CI/CD, deployment, production troubleshooting, and long-term support.</p>
          <p><strong className="text-ink">Design reliable production software.</strong> Engineering standards emphasize reliability, scalability, maintainability, security, and automated testing.</p>
          <p><strong className="text-ink">Work across the stack.</strong> Production troubleshooting has covered application software, Docker containers, Linux systems, networking, cloud infrastructure, and integrated hardware.</p>
          <p><strong className="text-ink">Lead and mentor engineers.</strong> Technical leadership includes defining engineering standards, establishing ownership and development practices, and translating product requirements into production systems.</p>
          <div className="pt-4"><Link className="button-primary" href="/contact/">Contact</Link></div>
        </div>
      </div>
    </div>
  );
}
