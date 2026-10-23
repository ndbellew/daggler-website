# Deployment

The project uses Next.js static export. `npm run build` writes a complete site to `out/`; it does not require a Node.js server at runtime.

## GitHub Pages (recommended)

`.github/workflows/deploy-pages.yml` verifies and deploys the static export after every push to `main`. It requests read-only repository access in the build job and grants `pages: write` plus `id-token: write` only to the deployment job.

In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. The workflow automatically configures the repository-name base path for project sites such as `owner.github.io/daggler-website`. For a custom domain, set `SITE_BASE_PATH` to an empty value in the workflow and update `site.config.ts` to the final HTTPS URL.

The workflow uploads `out/` as the immutable Pages artifact; that artifact is where CI builds go before GitHub deploys it to the `github-pages` environment.

## Docker Compose and Caddy

The multi-stage `Dockerfile` builds the same static `out/` artifact and serves it from an unprivileged Caddy process. For local HTTP development:

```bash
docker compose up --build
```

Open <http://localhost:8080>. Stop it with `docker compose down`.

The Compose project currently has one service named `frontend`. That explicit name leaves room for future `backend` and database services without changing the frontend's build contract. Requests under `/api/*` are already reserved for the `BACKEND_UPSTREAM` reverse proxy; until a backend is added, those requests return a gateway error without affecting the static site.

The frontend runs as Caddy's unprivileged user with a read-only root filesystem and privilege escalation disabled. All Linux capabilities are dropped except `NET_BIND_SERVICE`, which is required solely to bind the container's standard ports 80 and 443. The final image contains only Caddy and static files—not Node.js, source files, or development dependencies.

### Production HTTPS

Caddy obtains and renews publicly trusted certificates automatically after a real domain points to the host and inbound ports 80 and 443 are reachable. Copy `.env.example` to `.env` and set production values:

```dotenv
SITE_ADDRESS=portfolio.example.com
HTTP_PORT=80
HTTPS_PORT=443
BACKEND_UPSTREAM=backend:3000
```

Then start the service:

```bash
docker compose up --detach --build
```

Compose mounts named volumes at `/data` and `/config`. `caddy_data` stores certificates and account keys across container replacements; do not run `docker compose down --volumes` in production unless certificate state should be deleted. Port 443 is published for both TCP (HTTPS) and UDP (HTTP/3).

Values still required before production:

1. `SITE_ADDRESS`: the final public hostname, without a path.
2. DNS `A` and/or `AAAA` records pointing that hostname to the Docker host.
3. Public inbound TCP 80 and TCP/UDP 443 forwarded to the host.
4. `HTTP_PORT=80` and `HTTPS_PORT=443` unless an upstream load balancer terminates TLS.
5. `BACKEND_UPSTREAM` once a backend service exists; the default anticipates `backend:3000` on the Compose network.
6. The final canonical HTTPS URL in `site.config.ts`.

Direct Docker commands remain available when Compose is not needed:

```bash
docker build -t daggler-website-frontend .
docker run --rm -p 8080:80 \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  -e SITE_ADDRESS=http:// \
  -e BACKEND_UPSTREAM=backend:3000 \
  -v caddy_data:/data \
  -v caddy_config:/config \
  daggler-website-frontend
```

## Cloudflare Pages (alternative)

- **Framework preset:** Next.js (Static HTML Export), or None
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 22 (set `NODE_VERSION=22` if the project settings require it)
- **Root directory:** repository root

No credentials are needed for the build. Connect the public GitHub repository through Cloudflare Pages only after reviewing placeholder identity, links, canonical URL, resume, and content. Disable the GitHub Pages deployment workflow if Cloudflare becomes the deployment target.

## Before production

1. Replace `site.config.ts` placeholders and set the canonical HTTPS URL.
2. Replace all content marked `placeholder: true`; set it to `false` only after factual review.
3. Review the resume and use its print action to validate the PDF layout.
4. Configure the custom domain and hosting route. Caddy manages HTTPS for Docker hosting; Cloudflare or GitHub Pages manages it on those platforms.
5. Run `npm run lint && npm run typecheck && npm test && npm run build`.

The CI workflow verifies pull requests and pushes with read-only repository permission, validates `compose.yaml`, builds its production Caddy image, starts it, waits for the health check, and requests the home page plus representative direct-navigation routes. The separate Pages workflow deploys only from `main` (or a manual dispatch) and scopes write permissions to its deploy job.
