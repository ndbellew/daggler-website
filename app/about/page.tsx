import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "About", description: "Engineering approach and professional focus." };

export default function AboutPage() {
  return <div className="shell pb-24"><PageHeading eyebrow="About" title="Build deliberately. Operate responsibly." description="This page is structured for a grounded professional narrative. The current copy is placeholder guidance, not a biography." /><div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[15rem_1fr]"><h2 className="eyebrow">Working principles</h2><div className="max-w-3xl space-y-8 text-lg leading-8 text-muted"><p><strong className="text-ink">Start with the real constraint.</strong> Replace this with how you frame ambiguous problems and decide what not to build.</p><p><strong className="text-ink">Make systems observable.</strong> Explain your approach to feedback loops, failure modes, and operational ownership.</p><p><strong className="text-ink">Treat security as design input.</strong> Describe how you balance threat, usability, delivery, and maintenance.</p><p><strong className="text-ink">Communicate the tradeoff.</strong> Add a factual note about how you work across functions and document decisions.</p><div className="pt-4"><Link className="button-primary" href="/contact/">Contact</Link></div></div></div></div>;
}
