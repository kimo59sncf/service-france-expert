# Multi-stage Dockerfile pour Service France Expert

# Stage 1: Build shared libraries
FROM node:20-alpine AS libs
WORKDIR /app
COPY package.json tsconfig.json tsconfig.base.json ./
COPY lib/ ./lib/
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run typecheck:libs

# Stage 2: Build API Server
FROM libs AS api-builder
WORKDIR /app/artifacts/api-server
COPY artifacts/api-server/package.json ./
RUN pnpm install
COPY artifacts/api-server/src ./src
COPY artifacts/api-server/tsconfig.json ./
COPY artifacts/api-server/build.mjs ./
RUN pnpm run build

# Stage 3: Build Frontend
FROM libs AS frontend-builder
WORKDIR /app/artifacts/service-france-expert
COPY artifacts/service-france-expert/package.json ./
RUN pnpm install
COPY artifacts/service-france-expert/src ./src
COPY artifacts/service-france-expert/public ./public
COPY artifacts/service-france-expert/tsconfig.json ./
COPY artifacts/service-france-expert/vite.config.ts ./
RUN pnpm run build

# Stage 4: Production - API
FROM node:20-alpine AS api
WORKDIR /app
ENV NODE_ENV=production
COPY --from=api-builder /app/artifacts/api-server/dist ./dist
COPY --from=api-builder /app/artifacts/api-server/package.json ./
RUN npm install -g pnpm
RUN pnpm install --prod
EXPOSE ${PORT:-5000}
CMD ["node", "dist/index.mjs"]

# Stage 5: Production - Frontend (optionnel, pour serveur statique)
FROM node:20-alpine AS frontend
WORKDIR /app
RUN npm install -g pnpm
COPY --from=frontend-builder /app/artifacts/service-france-expert/dist ./dist
EXPOSE 4173
CMD ["npx", "vite-preview", "--host", "0.0.0.0"]