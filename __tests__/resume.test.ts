import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const resumePage = fs.readFileSync(path.join(root, "app/resume/page.tsx"), "utf8");
const siteConfig = fs.readFileSync(path.join(root, "site.config.ts"), "utf8");

describe("résumé publishing", () => {
  it("publishes the supplied PDF under the stable public path", () => {
    expect(fs.existsSync(path.join(root, "public/resume.pdf"))).toBe(true);
    expect(fs.existsSync(path.join(root, "public/Nathan D Bellew Resume 2026 Cleared.pdf"))).toBe(false);
  });

  it("offers view, download, and print actions", () => {
    expect(resumePage).toContain("View PDF");
    expect(resumePage).toContain("Download résumé");
    expect(resumePage).toContain('href="/resume.pdf"');
    expect(resumePage).toContain('download="Nathan-Bellew-Resume.pdf"');
    expect(resumePage).toContain("<PrintButton />");
  });

  it("contains authoritative identity and employment details", () => {
    expect(siteConfig).toContain('name: "Nathan Bellew"');
    expect(resumePage).toContain("Integrity Communications Solutions, Inc.");
    expect(resumePage).toContain("Lockheed Martin");
    expect(resumePage).toContain("Colorado Mesa University");
  });

  it("does not publish the résumé phone number in webpage source", () => {
    expect(`${resumePage}\n${siteConfig}`).not.toContain("7193935160");
  });
});
