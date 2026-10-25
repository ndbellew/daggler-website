import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { PageHeading } from "@/components/page-heading";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "Selected engineering case studies and project notes." };

export default function ProjectsPage() {
  const projects = getAllContent("projects");
  return <div className="shell pb-24"><PageHeading eyebrow="Project archive" title="Work, explained in context." description="Selected projects with implementation details, current limitations, and source links." /><div className="grid gap-5 md:grid-cols-2">{projects.map((entry) => <ContentCard key={entry.slug} entry={entry} kind="projects" />)}</div></div>;
}
