FROM node:20-slim AS base
# Enable Corepack to use pnpm
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Create a new image for production
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Create a new image for development
FROM base AS build-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM httpd:2.4-alpine AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/

EXPOSE 80
