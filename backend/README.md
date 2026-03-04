# NightMusic Backend

## Variáveis de ambiente

Crie um arquivo `.env` em `backend/` com:

```env
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nightmusic
```

## Rotas

- `GET /health`
- `POST /users`

Payload para criar usuário:

```json
{
  "email": "user@example.com",
  "displayName": "Nome do Usuário"
}
```
