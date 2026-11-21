# ---- build estático ----
FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# En el contenedor se sirve en la raíz, no en /factorialabs-web/.
RUN npm run build -- --base-href /

# ---- servidor estático ----
FROM nginx:alpine AS final

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/FactoriaLabs.Web/browser /usr/share/nginx/html

EXPOSE 80
