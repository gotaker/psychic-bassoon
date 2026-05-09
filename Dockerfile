# syntax=docker/dockerfile:1.7

# Multi-stage build for Next.js 16 standalone output.
# Final image runs the standalone server on port 3000 as a non-root user.

# ---- deps ----
FROM node:26-alpine AS deps
WORKDIR /app

# Install pnpm directly. corepack was removed from Node's default distribution
# starting in v25; matches the packageManager pin in package.json.
RUN npm install -g pnpm@11.0.9

# Railway's Metal builder validates cache-mount ids statically and requires
# the literal "s/<service-id>-" prefix (no variable expansion). The id below
# matches the psychic-bassoon service in workspace gotaker's Projects; if the
# service is recreated, update the UUID. Local Docker ignores the prefix.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=s/b8dfb466-bf66-40f5-9a09-ec7bee016855-pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- builder ----
FROM node:26-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@11.0.9

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules

# Source comes from an npm-pack tarball produced before `docker build`
# (run `pnpm pack` or `npm pack` in the repo root). .npmignore filters
# dev-only files. The tarball wraps contents in a `package/` dir, which
# --strip-components=1 removes. pnpm-lock.yaml is hard-excluded by
# npm-packlist and is not needed here — `pnpm build` uses node_modules
# from the deps stage, not the lockfile.
COPY dnh-website-*.tgz ./
RUN tar -xzf dnh-website-*.tgz --strip-components=1 \
 && rm dnh-website-*.tgz

RUN pnpm build

# ---- runner ----
FROM node:26-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# next.config.ts has output: "standalone" — copy the minimized server tree.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Healthcheck hits the homepage (redirects to /en).
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
