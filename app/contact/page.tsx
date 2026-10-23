import type { Metadata } from "next";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "Contact", description: "Contact and professional profile links." };

export default function ContactPage() {
  return <div className="shell pb-24"><PageHeading eyebrow="Contact" title="Let’s discuss the problem." description="This static site does not collect form data. Use the direct contact option below after replacing the placeholder address." /><div className="grid gap-5 md:grid-cols-3"><a className="card p-6" href={`mailto:${siteConfig.email}`}><span className="eyebrow">Email</span><p className="mt-8 font-medium">{siteConfig.email}</p><p className="mt-2 text-sm text-muted">Direct correspondence</p></a><a className="card p-6" href={siteConfig.social.github}><GithubIcon className="h-5 w-5 text-accent" /><p className="mt-8 font-medium">GitHub</p><p className="mt-2 text-sm text-muted">Code and collaboration</p></a><a className="card p-6" href={siteConfig.social.linkedin}><LinkedinIcon className="h-5 w-5 text-accent" /><p className="mt-8 font-medium">LinkedIn</p><p className="mt-2 text-sm text-muted">Professional profile</p></a></div></div>;
}
