import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted">Placeholder portfolio. Replace all sample content before publishing.</p>
        </div>
        <div className="flex items-center gap-3">
          <a className="icon-button" href={siteConfig.social.github} aria-label="GitHub"><GithubIcon className="h-4 w-4" /></a>
          <a className="icon-button" href={siteConfig.social.linkedin} aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4" /></a>
          <Link className="text-sm text-muted hover:text-ink" href="/contact/">Contact</Link>
          <span className="text-xs text-muted">© {new Date().getUTCFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
