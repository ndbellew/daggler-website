import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { PageHeading } from "@/components/page-heading";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = { title: "Writing", description: "Technical papers and documents about software, security, and systems engineering." };

export default function WritingPage() {
  const writing = getAllContent("writing");
  return <div className="shell pb-24"><PageHeading eyebrow="Papers and technical writing" title="Documents, presented in context." description="Source-grounded summaries with each original PDF available to read, open, or download." /><div className="grid gap-5 md:grid-cols-2">{writing.map((entry) => <ContentCard key={entry.slug} entry={entry} kind="writing" />)}</div></div>;
}
