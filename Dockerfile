# ---- deps ----
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# install small extras; cleanup apt lists for smaller image
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl bash ca-certificates python3 g++ make && \
    rm -rf /var/lib/apt/lists/*

# enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy only manifests for caching
COPY package.json pnpm-lock.yaml* ./

# install dependencies (pnpm must be available thanks to corepack)
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# install extras required to build
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl bash ca-certificates python3 g++ make && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

# copy source + node_modules from deps
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# run build with pnpm
RUN pnpm build

# ---- runner ----
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# create non-root user
RUN adduser --disabled-password --gecos "" appuser

# copy runtime artifacts produced by build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
USER appuser

HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "start"]
