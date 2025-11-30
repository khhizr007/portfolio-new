# syntax=docker/dockerfile:1.5
# ---- builder ----
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# install build tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl bash ca-certificates python3 g++ make && \
    rm -rf /var/lib/apt/lists/*

# enable corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy lockfiles first to leverage layer caching
COPY package.json pnpm-lock.yaml* ./

# install dependencies using a cache for pnpm store (requires BuildKit)
# the --store path ensures pnpm uses a single store location we cache
RUN --mount=type=cache,target=/home/node/.pnpm-store \
    pnpm install --frozen-lockfile --store=/home/node/.pnpm-store

# copy full source and build
COPY . .
RUN pnpm build

# ---- runner ----
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# minimal runtime deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates wget && \
    rm -rf /var/lib/apt/lists/*

# create non-root user
RUN adduser --disabled-password --gecos "" appuser

# copy only what's needed for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
USER appuser

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "start"]
