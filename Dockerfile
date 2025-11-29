# ---- deps ----
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# install small extras and enable corepack/pnpm
RUN apk add --no-cache curl bash

# enable corepack and activate pnpm (available in this stage)
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy only manifests for caching
COPY package.json pnpm-lock.yaml* ./

# install dependencies (production or full as needed)
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# install same small extras and corepack/pnpm here too (so pnpm binary exists)
RUN apk add --no-cache curl bash
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy source + node_modules from deps
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# run build with pnpm (now available)
RUN pnpm build

# ---- runner ----
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# copy only runtime artifacts produced by build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
USER appuser

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "start"]
