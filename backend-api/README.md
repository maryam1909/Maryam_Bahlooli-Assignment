# Backend API (Auth + Tasks)

## Run locally

1. Copy `.env.example` to `.env` and fill values
2. Start Postgres (Docker):

```
docker run -d --name postgres_db -e POSTGRES_USER=task_user -e POSTGRES_PASSWORD=task_password -e POSTGRES_DB=task_app_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:14-alpine
```

3. Install & start

```
npm install
npm run dev
```

- Docs: `http://localhost:8000/api-docs`
- API Base: `http://localhost:8000/api/v1`

## Endpoints

- POST `/auth/register`
- POST `/auth/login`
- GET/POST `/tasks`
- PATCH/DELETE `/tasks/:id`
- GET `/tasks/all` (admin only)

## Security & scalability

- JWT auth, role-based access
- Rate limiting (100 req/15m/IP)
- Helmet, CORS, centralized errors
- Sequelize with pooling and optional port

## Postman

Import `postman_collection.json` from repo root.
