import { describe, expect, it } from "vitest";
import { formatDate, getAllContent, getContent, parseFrontmatter } from "@/lib/content";

describe("content library", () => {
  it("parses supported frontmatter types", () => {
    const result = parseFrontmatter(`---\ntitle: Example\ntags: [One, Two]\nfeatured: true\n---\n# Body`, "example.mdx");
    expect(result.data).toEqual({ title: "Example", tags: ["One", "Two"], featured: true });
    expect(result.source).toBe("# Body");
  });

  it("loads only approved, non-placeholder project content", () => {
    const entries = getAllContent("projects");
    expect(entries).toHaveLength(2);
    expect(entries.map((entry) => entry.slug).sort()).toEqual(["daggler-website", "world-generator"]);
    expect(entries.every((entry) => entry.featured && !entry.placeholder)).toBe(true);
    expect(entries.every((entry) => entry.repository?.startsWith("https://github.com/ndbellew/"))).toBe(true);
    expect(Date.parse(entries[0].date!)).toBeGreaterThanOrEqual(Date.parse(entries.at(-1)!.date!));
  });

  it("loads distinct PDF-backed writing and sorts undated documents last", () => {
    const entries = getAllContent("writing");
    expect(entries).toHaveLength(3);
    expect(entries.map((entry) => entry.slug)).toEqual([
      "the-bellew-norrie-method",
      "all-in-one-security-locking-operating-system",
      "layered-defense-firewall-selection-small-businesses",
    ]);
    expect(entries.every((entry) => entry.pdf?.endsWith(".pdf") && !entry.placeholder)).toBe(true);
    expect(entries.at(-1)?.date).toBeUndefined();
    expect(entries.at(-1)?.author).toBeUndefined();
    expect(formatDate("2026-02-12")).toBe("Feb 12, 2026");
  });

  it("resolves approved project metadata", () => {
    expect(getContent("projects", "world-generator")?.repository).toBe("https://github.com/ndbellew/World-Generator");
    expect(getContent("projects", "daggler-website")?.repository).toBe("https://github.com/ndbellew/daggler-website");
  });

  it("resolves writing PDF metadata without inventing missing attribution", () => {
    expect(getContent("writing", "all-in-one-security-locking-operating-system")?.author).toBe("Nathan Bellew");
    expect(getContent("writing", "the-bellew-norrie-method")?.pdf).toBe("/The_Bellew_Norrie_Method.pdf");
    expect(getContent("writing", "layered-defense-firewall-selection-small-businesses")).toMatchObject({
      title: "Layered Defense and Firewall Selection for Small Businesses",
      documentType: "Document",
      pdf: "/choosing_a_firewall.pdf",
      date: undefined,
      author: undefined,
    });
  });

  it("rejects content without frontmatter", () => {
    expect(() => parseFrontmatter("# Missing", "bad.mdx")).toThrow("missing frontmatter");
  });
});
