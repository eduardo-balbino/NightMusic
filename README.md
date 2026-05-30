# 🌙 NightMusic

NightMusic é um projeto de estudo fullstack com foco em evolução incremental: uma interface em Next.js para autenticação/player e uma API em Express para suportar funcionalidades de música e playlists.

> Status atual: **protótipo funcional para desenvolvimento local**, com autenticação mock e playlists de exemplo.

---

## ✨ Funcionalidades atuais

### Frontend (Next.js)

- Fluxo de autenticação com telas de **login**, **registro** e **recuperação de senha**.
- Login mock via `/api/auth/login` com persistência de token em `localStorage` (`nm_token`).
- Área autenticada em `/dashboard` com navegação entre playlists mockadas.
- Player principal em `/` com upload local de áudio (via `blob URL`) e controles básicos (play, pause, anterior, próximo).

### Backend (Express + TypeScript)

- Middleware de log e tratamento global de erros.
- Endpoints disponíveis:
  - `GET /health` → healthcheck
  - `GET /musics` → resposta simples da API
  - `GET /api/error-test` → rota para validar o handler de erro

---

## 🧱 Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Backend:** Node.js, Express 5, TypeScript
- **Estilos:** CSS global + Tailwind (dependências instaladas)
- **Tooling:** Prettier

---

## 📁 Estrutura principal

```text
.
├── app/                    # Frontend (App Router)
│   ├── api/auth/           # Endpoints mock de auth no Next
│   ├── components/         # Componentes de UI
│   ├── dashboard/          # Área autenticada e playlists
│   ├── login/ register/ forgot/
│   └── services/           # Serviços client-side (auth)
├── backend/                # API Express em TypeScript
│   ├── middlewares/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   └── server.ts
└── README.md
```

---

## 🚀 Como rodar localmente

### 1) Instalar dependências

```bash
npm install
```

### 2) Subir o frontend (porta 3001)

```bash
npm run dev
```

### 3) Subir o backend

Atualmente, o script `backend:dev` no `package.json` aponta para `backend/src/server.ts`, mas o arquivo está em `backend/server.ts`.

Use um destes caminhos:

```bash
# Opção temporária (sem alterar scripts)
npx ts-node-dev --respawn --transpile-only --loader ts-node/esm backend/server.ts

# Opção definitiva (recomendada)
# Ajuste o script backend:dev no package.json para backend/server.ts e rode:
npm run backend:dev
```

---


## 🚢 Deploy do frontend

O frontend está preparado para build de produção com Next.js:

```bash
npm run build
npm run start
```

Para plataformas que definem a porta automaticamente, o script `start` respeita `PORT` e usa `3001` como fallback local.

Se o frontend precisar encaminhar chamadas para uma API Express hospedada separadamente, configure a variável de ambiente abaixo no provedor de deploy:

```bash
API_BASE_URL=https://sua-api.example.com
```

Quando `API_BASE_URL` não está configurada, o build não cria rewrites para `localhost`, evitando chamadas quebradas em produção e mantendo ativas as rotas internas do Next em `/api/auth/*`.

## 🔐 Credenciais de desenvolvimento (mock)

Para testar login no estado atual:

- **Usuário:** `user`
- **Senha:** `password`

Ao autenticar, o token mock é salvo no navegador e o usuário é redirecionado para `/dashboard`.

---

## 🧪 Scripts úteis

```bash
npm run dev              # Next.js em localhost:3001
npm run build            # build do frontend
npm run start            # start do build frontend
npm run backend:dev      # backend express em modo dev (requer ajuste de caminho no script)
npm run backend:build    # build TypeScript geral
npm run backend:start    # start backend compilado
```

---

## ⚠️ Limitações conhecidas

- Autenticação ainda é **mock** (sem JWT real, refresh token ou sessão persistente segura).
- Playlists do dashboard permanecem em dados fixos.
- Upload da página principal usa `blob:` URL e não persiste após recarregar.
- Projeto ainda possui partes legadas (ex.: `app/pages`) coexistindo com App Router.

---

## 🛣️ Próximos passos sugeridos

- Integrar autenticação real (cadastro, login, recuperação de senha).
- Persistir playlists/músicas em banco de dados.
- Consolidar totalmente a arquitetura em App Router.
- Expandir a API backend para CRUD de playlists e faixas.

---

## 📄 Licença

MIT.

## 👤 Autor

Eduardo B.

Parte da jornada pessoal de aprendizado em backend e fullstack.

---

## 🔖 Badges

[![Build Status](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml/badge.svg)](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
