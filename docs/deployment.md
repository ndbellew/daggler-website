# Deployment

The site is a Next.js static export served by Caddy. Pull requests and pushes are verified by `.github/workflows/ci.yml`; production delivery is handled separately by `.github/workflows/deploy-production.yml`. GitHub Pages deployment is disabled.

## Delivery flow

1. A pull request targets `main` and CI runs lint, type checking, tests, the static build, Compose validation, a container build, and direct-route smoke tests.
2. After a merge, the push to `main` runs the same CI workflow.
3. Only when that exact `main` CI run succeeds, the production workflow checks out its verified commit SHA.
4. The workflow builds and publishes `ghcr.io/ndbellew/daggler-website:<commit-sha>`.
5. Through the protected GitHub `production` environment, it uploads `compose.production.yaml` and an immutable deployment environment file to RamNode using strict SSH host-key verification.
6. RamNode installs the files under `/opt/daggler-website`, pulls the published image, replaces the frontend without building, waits for Docker health, and explicitly verifies the container reports `healthy`.

Production deployments use the `production` concurrency group with cancellation disabled, so two deployments cannot overlap and an in-flight release is not interrupted by a newer merge.

## GitHub production environment

Create an environment named `production` in the repository settings. Add these environment secrets:

- `DEPLOY_HOST`: RamNode hostname or IP address.
- `DEPLOY_USER`: SSH account with key access and passwordless `sudo` for Docker and file installation under `/opt/daggler-website`.
- `DEPLOY_SSH_KEY`: private SSH key for that account.
- `DEPLOY_KNOWN_HOSTS`: pinned `known_hosts` line for `DEPLOY_HOST`; obtain and verify its fingerprint out of band before saving it.

Add this environment variable:

- `SITE_ADDRESS`: `nathanbellew.com` (hostname only—no scheme, port, path, or trailing slash).

The deployment job uses `StrictHostKeyChecking=yes`; it never accepts or learns a host key during deployment. Environment protection rules or required reviewers can be added without changing the workflow.

## RamNode prerequisites

The host must have current Docker Engine and the Docker Compose plugin. The deployment user must be able to run `sudo docker` non-interactively. DNS and firewall/NAT must provide:

- `nathanbellew.com` pointing to the RamNode public address.
- `www.nathanbellew.com` pointing to the same address.
- Inbound TCP 80 and TCP/UDP 443.

Caddy obtains and renews HTTPS certificates automatically. `www.nathanbellew.com` permanently redirects to the same path on `https://nathanbellew.com`.

## Production Compose behavior

`compose.production.yaml` contains no `build` section. It requires `IMAGE_TAG` and pulls the immutable commit-SHA image from GHCR. It publishes ports 80 and 443, runs Caddy as its unprivileged user, keeps the root filesystem read-only, drops all capabilities except `NET_BIND_SERVICE`, and persists:

- `caddy_data`: certificates, ACME account state, and keys.
- `caddy_config`: Caddy runtime configuration state.

Ordinary replacement preserves both volumes. Do not run `docker compose down --volumes` in production unless the certificate state should be deleted.

Deployment files are installed at:

- `/opt/daggler-website/compose.production.yaml`
- `/opt/daggler-website/.env`

## Private GHCR images

The workflow authenticates to GHCR while publishing. If the package is public, RamNode can pull it anonymously. If it is private, authenticate the Docker account used by deployment once on RamNode:

```bash
export GHCR_PAT='a GitHub personal access token with read:packages'
printf '%s' "$GHCR_PAT" | sudo docker login ghcr.io --username ndbellew --password-stdin
unset GHCR_PAT
```

Because deployment runs `sudo docker`, authenticate with `sudo docker login` so credentials are stored for the same Docker client context. Never place the token in Compose, `.env`, repository files, or GitHub logs. The GitHub account issuing the token must be allowed to read the package; organizations with SSO may also require token authorization.

## Local Compose

Local development remains HTTP by default:

```bash
docker compose up --build
```

Open <http://localhost:8080>. Local certificate volumes are separate from the production host. Requests under `/api/*` remain reserved for the future `BACKEND_UPSTREAM`; no backend or database service is invented in this phase.

## Remaining production values

Before the first release, confirm:

1. The `production` environment exists with all four secrets and `SITE_ADDRESS=nathanbellew.com`.
2. Both apex and `www` DNS records resolve to RamNode.
3. Ports 80 and 443 reach the host and no other service occupies them.
4. Docker, Docker Compose, and passwordless deployment `sudo` work on RamNode.
5. GHCR package visibility is public, or the RamNode Docker client is authenticated as documented above.
6. Placeholder biography, resume, project, writing, social, and contact content has been replaced and reviewed.
