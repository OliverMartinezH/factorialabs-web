# FactoriaLabs

Sitio web corporativo y base tecnológica de **FactoriaLabs** — software factory con desarrollo
asistido por IA.

Monorepo con el sitio público (Angular 22 + SSR) y la API (ASP.NET Core 11), empaquetados con
Docker bajo el proyecto Compose `factorialabs`.

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Angular + SSR | 22.3 |
| Lenguaje web | TypeScript | 6.0 |
| Backend | ASP.NET Core (minimal API) | .NET 11 |
| Base de datos | — (sin persistencia por ahora) | — |
| Testing | Vitest / xUnit | — |
| Contenedores | Docker Compose | — |

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
cd docker
.\up.ps1        # levanta api + web y muestra las URLs
.\down.ps1

# Web  -> http://localhost:4200
# API  -> http://localhost:5080/health
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
npm test
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado + versión (usar en monitoreo) |
| GET | `/api/info` | Información del servicio |
| POST | `/api/contact` | Recibe el formulario del sitio y valida los campos |

`POST /api/contact` valida los campos y **agrega el lead a un archivo JSON**, sin base de datos.

### Dónde quedan los leads

El archivo vive en el volumen `factorialabs-leads`, montado en `/app/data/leads.json` dentro del
contenedor. Sobrevive a reinicios y a `docker compose down`.

```powershell
# leer
docker exec factorialabs-api cat /app/data/leads.json

# respaldar a tu máquina
docker cp factorialabs-api:/app/data/leads.json ".\leads-$(Get-Date -Format yyyyMMdd).json"
```

Formato: arreglo JSON con `Name`, `Email`, `Company`, `CurrentSystem`, `Message` y `ReceivedAt`
(UTC). La escritura usa exclusión mutua y reemplazo atómico del archivo, pensada para bajo volumen.

> Si algún día se necesita consultar, filtrar o crecer, se cambia `LeadStore` por un repositorio
> sobre SQL Server sin tocar el endpoint.

## Despliegue

- **Dev:** Docker Compose con dos servicios (api, web).
- **Producción (cliente on-premise, Windows Server):** la API se publica como servicio de Windows y
  el sitio Angular SSR corre como proceso Node. En proyectos de cliente que lo requieran se usa
  SQL Server Express instalado nativo (límite: 10 GB por base, 1.4 GB de buffer pool, 4 cores).

Cada cliente tiene su propia instancia.

## Convenciones

- Ramas: `main` protegida, trabajo en `feature/<slug>`.
- Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Nada de secretos en el repo: `.env`, `appsettings.*.Local.json` y llaves quedan fuera por
  `.gitignore`.
