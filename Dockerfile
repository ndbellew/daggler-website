# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

ARG NEXT_PUBLIC_SITE_URL=https://example.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2.10.2-alpine AS runtime
RUN addgroup -S caddy \
    && adduser -S -D -H -G caddy caddy

COPY --chmod=644 Caddyfile /etc/caddy/Caddyfile
COPY --from=build --chown=caddy:caddy /app/out /srv
RUN SITE_ADDRESS=http:// BACKEND_UPSTREAM=backend:3000 \
      caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile \
    && chown -R caddy:caddy /data /config

USER caddy

EXPOSE 80 443 443/udp
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:2019/healthz || exit 1
