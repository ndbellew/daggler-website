import Link from "next/link";
import { navigation, siteConfig } from "@/site.config";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-line/70 bg-surface/85 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3 font-semibold tracking-tight" aria-label={`${siteConfig.name} home`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-panel font-mono text-xs text-accent transition group-hover:border-accent">YN</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-1 sm:gap-2">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
