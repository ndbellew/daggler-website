import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { PageHeading } from "@/components/page-heading";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = { title: "Writing", description: "Technical notes about software, security, AI, and systems engineering." };

export default function WritingPage() {
  const writing = getAllContent("writing");
  return <div className="shell pb-24"><PageHeading eyebrow="Technical writing" title="Notes from the workbench." description="Clear explanations of engineering choices, operational lessons, and useful patterns. All current entries are sample content." /><div className="grid gap-5 md:grid-cols-2">{writing.map((entry) => <ContentCard key={entry.slug} entry={entry} kind="writing" />)}</div></div>;
}
