# Engineering Portfolio

A static, content-driven engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and MDX. Phase 1 includes a landing page, project case studies, technical writing, a web/print resume, about and contact pages, SEO metadata, sitemap, robots rules, tests, production Docker packaging, and gated RamNode deployment through GHCR.

Identity and résumé content are sourced from Nathan Bellew's provided 2026 résumé. Project case studies and writing entries remain clearly labeled sample content and must be replaced before publishing.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Customize

1. Keep identity and résumé details synchronized between `site.config.ts`, `app/resume/page.tsx`, and `public/resume.pdf`.
2. Replace the sample MDX files in `content/projects` and `content/writing`.
3. Replace the abstract social image in `public/og.svg` if desired.
4. Review metadata and deployment settings before publishing.

MDX frontmatter schemas and authoring conventions are documented in [docs/content.md](docs/content.md). Deployment instructions are in [docs/deployment.md](docs/deployment.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run lint` | ESLint checks |
| `npm run typecheck` | TypeScript checks |
| `npm test` | Unit tests |
| `npm run build` | Static export to `out/` |

## Delivery

- `.github/workflows/ci.yml` runs linting, type checking, tests, the static build, Compose validation, and a container smoke test on pushes and pull requests.
- `.github/workflows/deploy-production.yml` runs only after a successful `main` CI push, publishes the commit-SHA image to GHCR, and deploys it to RamNode through the protected `production` environment.
- `compose.yaml` starts the current `frontend` service with `docker compose up --build`, persists Caddy certificate data, and leaves a clear path for future backend and database services.
- `compose.production.yaml` pulls the immutable GHCR image without building on the server and publishes ports 80 and 443.
- `Dockerfile` packages the static export in an unprivileged Caddy image. Compose maps local HTTP to host port `8080`; production can expose automatic HTTPS on `443`.
- `Caddyfile` serves static routes directly and reserves `/api/*` for a future `BACKEND_UPSTREAM`.

See [docs/deployment.md](docs/deployment.md) for local Docker commands, production environment setup, GHCR authentication, and RamNode deployment operations.

## Architecture

- Server components render the site; client JavaScript is limited to theme and print controls.
- `lib/content.ts` reads local MDX at build time, validates frontmatter, and provides sorted content metadata.
- Dynamic project and writing routes use `generateStaticParams`, so every route is included in the static export.
- No database, authentication, API routes, analytics, cookies, or external font requests are used.

## Resume PDF

The résumé page provides **View PDF**, **Download résumé**, and **Print / save PDF** actions. `public/resume.pdf` is the authoritative supplied document; the web résumé mirrors its professional content while intentionally omitting the phone number. Print styles remove navigation and controls.

## License

Code is available under the [MIT License](LICENSE). Sample project and writing content should be replaced before publication.
