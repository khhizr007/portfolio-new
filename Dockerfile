# ---- deps ----
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# install packages (bookworm has updated keys)
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl bash ca-certificates python3 g++ make && \
    rm -rf /var/lib/apt/lists/*

# enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM node:20-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl bash ca-certificates python3 g++ make && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN pnpm build

# ---- runner ----
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN adduser --disabled-password --gecos "" appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
USER appuser

HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "start"]