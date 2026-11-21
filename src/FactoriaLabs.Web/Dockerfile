# ---- build ----
FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime (SSR + API) ----
FROM node:26-alpine AS final
WORKDIR /app

ENV NODE_ENV=production \
    PORT=4000 \
    LEADS_FILE=/app/data/leads.json

EXPOSE 4000

COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist

# Directorio de datos con el dueño correcto para que el volumen escriba como node.
RUN mkdir -p /app/data && chown -R node:node /app/data

USER node

CMD ["node", "dist/FactoriaLabs.Web/server/server.mjs"]
