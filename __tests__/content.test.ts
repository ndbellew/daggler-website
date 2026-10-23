import { describe, expect, it } from "vitest";
import { formatDate, getAllContent, getContent, parseFrontmatter } from "@/lib/content";

describe("content library", () => {
  it("parses supported frontmatter types", () => {
    const result = parseFrontmatter(`---\ntitle: Example\ntags: [One, Two]\nfeatured: true\n---\n# Body`, "example.mdx");
    expect(result.data).toEqual({ title: "Example", tags: ["One", "Two"], featured: true });
    expect(result.source).toBe("# Body");
  });

  it("loads and sorts project content", () => {
    const entries = getAllContent("projects");
    expect(entries.length).toBeGreaterThanOrEqual(3);
    expect(entries.every((entry) => entry.placeholder)).toBe(true);
    expect(Date.parse(entries[0].date)).toBeGreaterThanOrEqual(Date.parse(entries.at(-1)!.date));
  });

  it("resolves a known slug and formats dates consistently", () => {
    expect(getContent("writing", "designing-for-failure")?.title).toContain("Failure");
    expect(formatDate("2026-02-12")).toBe("Feb 12, 2026");
  });

  it("rejects content without frontmatter", () => {
    expect(() => parseFrontmatter("# Missing", "bad.mdx")).toThrow("missing frontmatter");
  });
});
