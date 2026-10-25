import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllContent } from "@/lib/content";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const pdfComponent = fs.readFileSync(path.join(root, "components/pdf-publication.tsx"), "utf8");

function sha256(file: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

describe("PDF-backed writing", () => {
  it("resolves every writing PDF to an unchanged public asset", () => {
    for (const entry of getAllContent("writing")) {
      expect(entry.pdf).toBeDefined();
      expect(fs.existsSync(path.join(publicDirectory, entry.pdf!.slice(1)))).toBe(true);
    }
  });

  it("keeps the three source PDFs distinct", () => {
    const hashes = getAllContent("writing").map((entry) => sha256(path.join(publicDirectory, entry.pdf!.slice(1))));
    expect(new Set(hashes).size).toBe(3);
  });

  it("provides embedded, open, download, and fallback PDF access", () => {
    expect(pdfComponent).toContain('type="application/pdf"');
    expect(pdfComponent).toContain("Open PDF");
    expect(pdfComponent).toContain("Download PDF");
    expect(pdfComponent).toContain("Open the PDF directly");
  });

  it("does not assign missing firewall authorship or date", () => {
    const entry = getAllContent("writing").find((item) => item.slug === "layered-defense-firewall-selection-small-businesses");
    expect(entry?.author).toBeUndefined();
    expect(entry?.date).toBeUndefined();
  });
});
