# FactoriaLabs

Sitio web corporativo de **FactoriaLabs** — software factory con desarrollo asistido por IA.

Un solo servicio: **Angular 22 con SSR**, cuya capa Express expone el formulario de contacto y
persiste los leads en un archivo JSON. Sin base de datos.

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Angular + SSR | 22.3 |
| Lenguaje | TypeScript | 6.0 |
| API | Express (dentro del servidor SSR) | 5 |
| Persistencia | JSON en volumen Docker | — |
| Testing | Vitest | 5 |
| Contenedores | Docker Compose | 1 servicio |

> TypeScript 7 existe, pero Angular 22.3 fija `>=6.0 <6.1`.

## Estructura

```
.
├─ src/FactoriaLabs.Web/
│  ├─ src/app/            componentes (portada, contacto)
│  ├─ src/server/         validación y almacenamiento de leads
│  ├─ src/server.ts       rutas HTTP + SSR
│  └─ Dockerfile
├─ docker/
│  ├─ docker-compose.yml  proyecto: factorialabs
│  └─ .env.example
└─ .github/workflows/ci.yml
```

## Requisitos

- Node 26 LTS (`node --version` → v26.x)
- Docker Desktop con contenedores Linux

## Desarrollo local

```bash
cd docker
.\up.ps1        # levanta el sitio y muestra la URL
.\down.ps1

# Web + API -> http://localhost:4200
```

Con hot reload, sin contenedores:

```bash
cd src/FactoriaLabs.Web
npm ci
npm start        # http://localhost:4200
```

## Build y tests

```bash
cd src/FactoriaLabs.Web
npm ci
npm test         # vitest
npm run build    # SSR -> dist/FactoriaLabs.Web/{browser,server}
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado + versión |
| GET | `/api/info` | Información del servicio |
| POST | `/api/contact` | Valida el formulario y guarda el lead |

### Dónde quedan los leads

En el volumen `factorialabs-leads`, montado en `/app/data/leads.json`. Sobrevive a reinicios y a
`docker compose down`.

```powershell
# leer
docker exec factorialabs-web cat /app/data/leads.json

# respaldar a tu máquina
docker cp factorialabs-web:/app/data/leads.json ".\leads-$(Get-Date -Format yyyyMMdd).json"
```

Formato: arreglo JSON con `name`, `email`, `company`, `currentSystem`, `message` y `receivedAt`
(ISO 8601 UTC). Las escrituras se serializan en una cola y el archivo se reemplaza de forma atómica
(`leads.json.tmp` → `leads.json`).

> Una sola instancia escribe el archivo. Si algún día se escala horizontalmente, corresponde pasar
> a SQLite o SQL Server.

## Despliegue

- **Dev:** Docker Compose con un servicio (`factorialabs-web`).
- **Producción (Windows Server on-premise):** el sitio corre como proceso Node detrás de IIS o de un
  reverse proxy; basta con exponer el puerto 4000 y definir `ALLOWED_HOSTS` con el dominio real.

## Convenciones

- Ramas: `main` protegida, trabajo en `feature/<slug>`.
- Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Nada de secretos en el repo: `.env`, `data/` y llaves quedan fuera por `.gitignore`.
