export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="max-w-3xl py-16 sm:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
      <p className="mt-6 text-lg leading-8 text-muted sm:text-xl">{description}</p>
    </header>
  );
}
