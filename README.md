# Maryam Bahlooli – Backend Developer (Intern) Assignment

This repository contains a production-ready backend API and a supportive React frontend that demonstrate authentication, role-based access control (RBAC), and CRUD operations on Tasks. It includes API docs, validation, security hardening, caching, and a Docker-based deployment.

Repo: `maryam1909/Maryam_Bahlooli-Assignment`

## Features Checklist
- Auth: Register/Login with bcrypt hashing and JWT
- RBAC: user/admin with middleware (`protect`, `restrictTo`)
- CRUD: Tasks (create, list, update, delete). Admin can list all tasks
- API versioning: `/api/v1`
- Validation: `express-validator`; centralized error handler
- Security: `helmet`, CORS allowlist (env), rate limiting (100 req/15 min/IP)
- Docs: Swagger UI at `/api-docs` and Postman collection in repo root
- DB: PostgreSQL via Sequelize, with pooling
- Logging: Structured `pino-http`
- Caching: Redis for task reads with cache invalidation
- Healthcheck: `/api/v1/health`

## Structure
- `backend-api/` – Express + Sequelize API
- `frontend-ui/` – Vite + React app
- `docker-compose.yml` – Postgres, Redis, Backend, Frontend

## Quick Start (Docker – recommended)
1) From repo root:
```bash
docker-compose up --build
```
2) Open:
- Frontend: http://localhost:5173/
- API docs: http://localhost:8000/api-docs
- Health: http://localhost:8000/api/v1/health

Common commands:
```bash
docker-compose up -d --build        # run in background
docker-compose logs -f backend      # tail backend logs
docker-compose down                 # stop
# optional data reset
docker-compose down -v
```

## Local Dev (without Docker)
- Requirements: Node 18+, Docker (for Redis), Postgres 14+
- Start Postgres:
```bash
docker run -d --name postgres_db -e POSTGRES_USER=task_user -e POSTGRES_PASSWORD=task_password -e POSTGRES_DB=task_app_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:14-alpine
```
- Start Redis:
```bash
docker run -d --name redis -p 6379:6379 redis:7-alpine
```
- Backend:
```bash
cd backend-api
cp .env.example .env  # edit values
npm install
npm run dev
```
- Frontend:
```bash
cd ../frontend-ui
npm install
npm run dev
```

## Environment Variables
- Backend (`backend-api/.env.example`):
```
PORT=8000
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=task_app_db
DB_DIALECT=postgres
DB_PORT=5432
JWT_SECRET=change-me
JWT_EXPIRES_IN=1d
CORS_ORIGINS=http://localhost:5173
BODY_LIMIT=1mb
REDIS_URL=redis://localhost:6379
```
- Frontend (`frontend-ui/.env`):
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```
When running with Docker Compose, the backend’s `DB_HOST`, `DB_PORT`, `CORS_ORIGINS`, and `REDIS_URL` are injected for container networking.

## API Overview
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET/POST `/api/v1/tasks` (user’s tasks)
- PATCH/DELETE `/api/v1/tasks/:id` (owner)
- GET `/api/v1/tasks/all` (admin only)
- GET `/api/v1/health`

See Swagger UI `/api-docs` for schemas and examples.

Postman collection: `postman_collection.json`.
