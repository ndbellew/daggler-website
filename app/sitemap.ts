import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects/", "/writing/", "/resume/", "/about/", "/contact/"];
  const content = (["projects", "writing"] as const).flatMap((kind) => getAllContent(kind).map((entry) => ({ url: `${siteConfig.url}/${kind}/${entry.slug}/`, lastModified: new Date(entry.date) })));
  return [...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })), ...content];
}
