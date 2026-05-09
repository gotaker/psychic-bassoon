# syntax=docker/dockerfile:1.7

# Multi-stage build for Next.js 16 standalone output.
# Final image runs the standalone server on port 3000 as a non-root user.

# ---- deps ----
FROM node:22-alpine AS deps
WORKDIR /app

# Enable pnpm via corepack (matches package.json packageManager pin).
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# Railway's Metal builder validates cache-mount ids statically and requires
# the literal "s/<service-id>-" prefix (no variable expansion). The id below
# matches the psychic-bassoon service in workspace gotaker's Projects; if the
# service is recreated, update the UUID. Local Docker ignores the prefix.
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=s/b8dfb466-bf66-40f5-9a09-ec7bee016855-pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- builder ----
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# ---- runner ----
FROM node:22-alpine AS runner
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
