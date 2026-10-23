import Link from "next/link";

export default function NotFound() {
  return <div className="shell grid min-h-[60vh] place-items-center py-20 text-center"><div><p className="eyebrow">404 / Not found</p><h1 className="mt-5 text-5xl font-semibold tracking-tight">No signal here.</h1><p className="mt-4 text-muted">The page may have moved or never existed.</p><Link className="button-primary mt-8" href="/">Return home</Link></div></div>;
}
