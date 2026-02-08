# PostgreSQL schema (mínimo)

Este schema substitui os mocks atuais de playlists no front-end (ex.: `app/dashboard/page.tsx`).

## Como criar o banco e aplicar o schema

1. Crie o banco local:

```bash
createdb nightmusic
```

2. Aplique o schema:

```bash
psql -d nightmusic -f backend/db/schema.sql
```

> Observação: o schema habilita a extensão `pgcrypto` para usar `gen_random_uuid()`.

## Tabelas

- `users`: dados mínimos do usuário (id, email, nome, timestamps).
- `playlists`: playlists do usuário.
- `playlist_tracks`: faixas associadas a cada playlist, com metadados básicos e ordem.

## Próximos passos

- Substituir `mockPlaylists` por consultas ao PostgreSQL.
- Criar rotas no backend para listar playlists e tracks por usuário.
