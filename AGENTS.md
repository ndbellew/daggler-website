# Repository guidance

## Commands

- `npm run dev` starts the local development server.
- `npm run lint`, `npm run typecheck`, and `npm test` are the required fast checks.
- `npm run build` must produce a deployable static site in `out/`.

## Architecture

- Use the Next.js App Router, React Server Components by default, and TypeScript.
- Keep personal details in `site.config.ts`; never invent biography or experience data.
- Store project and article source in `content/projects` and `content/writing` as MDX.
- Keep content loading server-only in `lib/content.ts` and compatible with static export.
- Avoid new runtime dependencies unless they remove meaningful maintenance or security risk.

## Quality

- Preserve keyboard navigation, visible focus states, semantic headings, and reduced-motion support.
- Do not add secrets, analytics, authentication, databases, or server-only deployment features.
- Run all four verification commands before handing off changes.
