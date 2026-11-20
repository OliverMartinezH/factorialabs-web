# FactoriaLabs

Sitio web corporativo y base tecnológica de **FactoriaLabs** — software factory con desarrollo asistido por IA.

Monorepo con el sitio público (Angular 22 + SSR) y la API (ASP.NET Core 11), empaquetados con Docker bajo el proyecto Compose `factorialabs`.

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Angular + SSR | 22.3 |
| Lenguaje web | TypeScript | 6.0 |
| Backend | ASP.NET Core (minimal API) | .NET 11 |
| Base de datos | SQL Server | 2025 |
| Testing | xUnit / Vitest | — |
| Runtime contenedores | Docker Compose | — |

> .NET 11 es **STS**, con soporte hasta noviembre de 2028.
> TypeScript 7 existe, pero Angular 22.3 fija `>=6.0 <6.1`.

## Estructura

```
.
├─ src/
│  ├─ FactoriaLabs.Web/      Angular 22 + SSR (Express)
│  └─ FactoriaLabs.Api/      ASP.NET Core 11
├─ tests/
│  └─ FactoriaLabs.Api.Tests/ xUnit
├─ docker/
│  ├─ docker-compose.yml      proyecto: factorialabs
│  └─ .env.example
├─ .github/workflows/ci.yml
├─ FactoriaLabs.slnx            solución .NET (formato XML nuevo)
└─ global.json
```

## Requisitos

- .NET SDK 11 (`dotnet --version` → 11.0.100)
- Node 26 LTS (`node --version` → v26.x)
- Docker Desktop con contenedores Linux

## Desarrollo local

```bash
# Base de datos + API + web en contenedores
cd docker
cp .env.example .env        # define MSSQL_SA_PASSWORD
docker compose up --build

# API  -> http://localhost:5080/health
# Web  -> http://localhost:4200
# SQL  -> localhost,14341
```

Trabajo con hot reload (sin contenedores para el código):

```bash
# API
dotnet watch --project src/FactoriaLabs.Api run

# Web
cd src/FactoriaLabs.Web && npm start
```

## Build y tests

```bash
dotnet restore
dotnet build -c Release
dotnet test -c Release

cd src/FactoriaLabs.Web
npm ci
npm run build      # SSR -> dist/FactoriaLabs.Web/{browser,server}
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado + versión (usar en monitoreo) |
| GET | `/api/info` | Información del servicio |

## Despliegue

- **Dev:** Docker Compose, SQL Server 2025 Developer (sin límite de tamaño).
- **Producción (cliente on-premise, Windows Server):** la API se publica como servicio de Windows, el sitio Angular SSR corre como proceso Node, y SQL Server **Express** se instala nativo (límite: 10 GB por base, 1.4 GB de buffer pool, 4 cores).

Cada cliente tiene su propia instancia y su propia base de datos.

## Convenciones

- Ramas: `main` protegida, trabajo en `feature/<slug>`.
- Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Nada de secretos en el repo: `.env`, `appsettings.*.Local.json` y llaves quedan fuera por `.gitignore`.
