# ---- build ----
FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime (SSR) ----
FROM node:26-alpine AS final
WORKDIR /app

ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000

COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist

USER node

CMD ["node", "dist/FactoriaLabs.Web/server/server.mjs"]
