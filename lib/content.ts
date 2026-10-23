import "server-only";

import fs from "node:fs";
import path from "node:path";

export type ContentKind = "projects" | "writing";

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  placeholder: boolean;
  year?: string;
  status?: string;
};

export type ContentEntry = ContentMeta & { source: string };

const contentRoot = path.join(process.cwd(), "content");

function assertString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: frontmatter field "${field}" must be a non-empty string`);
  }
  return value;
}

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^['\"]|['\"]$/g, ""))
      .filter(Boolean);
  }
  return value.replace(/^['\"]|['\"]$/g, "");
}

export function parseFrontmatter(fileContents: string, file = "content"): {
  data: Record<string, unknown>;
  source: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(fileContents);
  if (!match) throw new Error(`${file}: missing frontmatter block`);

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${file}: invalid frontmatter line "${line}"`);
    data[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }

  return { data, source: fileContents.slice(match[0].length).trim() };
}

function toEntry(slug: string, raw: string, file: string): ContentEntry {
  const { data, source } = parseFrontmatter(raw, file);
  const tags = data.tags;
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    throw new Error(`${file}: frontmatter field "tags" must be a string array`);
  }
  const date = assertString(data.date, "date", file);
  if (Number.isNaN(Date.parse(date))) throw new Error(`${file}: date must be valid ISO date text`);

  return {
    slug,
    title: assertString(data.title, "title", file),
    description: assertString(data.description, "description", file),
    date,
    tags,
    featured: data.featured === true,
    placeholder: data.placeholder === true,
    year: typeof data.year === "string" ? data.year : undefined,
    status: typeof data.status === "string" ? data.status : undefined,
    source,
  };
}

export function getAllContent(kind: ContentKind): ContentEntry[] {
  const directory = path.join(contentRoot, kind);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(directory, file);
      return toEntry(file.replace(/\.mdx$/, ""), fs.readFileSync(fullPath, "utf8"), fullPath);
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getContent(kind: ContentKind, slug: string): ContentEntry | undefined {
  return getAllContent(kind).find((entry) => entry.slug === slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
