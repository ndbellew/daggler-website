import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.role}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: "website", images: ["/og.svg"] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/og.svg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f9fa" }, { media: "(prefers-color-scheme: dark)", color: "#080d11" }] };

const themeScript = `try{const t=localStorage.getItem('theme');const d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch{}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Script id="theme" strategy="beforeInteractive">{themeScript}</Script>
        <a href="#main" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-ink px-4 py-2 text-surface focus:translate-y-0">Skip to content</a>
        <div className="flex min-h-screen flex-col"><SiteHeader /><main id="main" className="flex-1">{children}</main><SiteFooter /></div>
      </body>
    </html>
  );
}
