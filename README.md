# 🌙 NightMusic

NightMusic é um projeto de estudo fullstack com foco em evolução incremental: uma interface Next.js para autenticação/player e um backend Express simples para rotas de API.

> Status atual: **protótipo funcional para desenvolvimento local**, com autenticação mock e playlists de exemplo.

---

## ✨ O que já existe hoje

### Frontend (Next.js)

- Fluxo de autenticação com telas de **login**, **registro** e **recuperação de senha**.
- Login mock via `/api/auth/login` com persistência de token em `localStorage` (`nm_token`).
- Área autenticada em `/dashboard` com navegação entre playlists mockadas.
- Player principal em `/` com upload local de arquivos de áudio (via `blob URL`) e controles básicos (play, pause, anterior, próximo).

### Backend (Express + TypeScript)

- Servidor com middleware de log e tratamento global de erros.
- Endpoints:
  - `GET /health` → healthcheck
  - `GET /musics` → resposta simples da API
  - `GET /api/error-test` → rota para validar handler de erro

---

## 🧱 Stack

- **Frontend:** Next.js 16, React 19, TypeScript, CSS/Tailwind (dependências instaladas)
- **Backend:** Node.js, Express 5, TypeScript
- **Tooling:** ESLint, Prettier, Stylelint

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
│   ├── routes/
│   └── server.ts
├── oraculo/                # Documentação e materiais auxiliares
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

### 3) Subir o backend (porta 3000)

```bash
npm run backend:dev
```

> O frontend usa rewrites para encaminhar `/musics/*` e `/api/*` para `http://localhost:3000`.

---

## 🔐 Credenciais de desenvolvimento

Para testar login no estado atual:

- **Usuário:** `user`
- **Senha:** `password`

Ao autenticar, o token mock é salvo no navegador (`localStorage`) e o usuário é redirecionado para `/dashboard`.

---

## 🧪 Scripts úteis

```bash
npm run dev              # Next.js em localhost:3001
npm run build            # build do frontend
npm run start            # start do build frontend
npm run backend:dev      # backend express em modo dev
npm run backend:build    # build TypeScript geral
npm run backend:start    # start backend compilado
npm run lint             # ESLint (com --fix)
npm run format           # Prettier
npm run prettier:check   # valida formatação
npm run stylelint        # valida estilos
npm run stylelint:fix    # corrige estilos
```

Também existem scripts de apoio para o Oráculo:

```bash
npm run diagnosticar
npm run formatar
npm run otimizar
```

---

## ⚠️ Limitações conhecidas

- Autenticação é **mock** (não há usuário real, JWT real, refresh token ou sessão segura).
- Playlists do dashboard ainda são dados fixos em memória.
- Upload de música na página principal depende de `blob:` URL e não persiste após recarregar.
- Existem artefatos legados (ex.: pasta `app/pages`) convivendo com App Router.

---

## 🛣️ Próximos passos

- Integrar autenticação real (cadastro, login, recuperação de senha).
- Persistir playlists/músicas em banco de dados.
- Unificar totalmente a arquitetura em App Router.
- Expandir API backend para operações CRUD de playlists e faixas.

---

## 📄 Licença

MIT.

## 👤 Autor

Eduardo B.

This project is part of a personal learning journey into backend and fullstack development.

<!-- Status badges -->

[![Build Status](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml/badge.svg)](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml)
[![Lint Status](https://github.com/eduardo-balbino/NightMusic/actions/workflows/lint.yml/badge.svg)](https://github.com/eduardo-balbino/NightMusic/actions/workflows/lint.yml)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=down&up_message=up&url=https://galeria-drab.vercel.app)](https://galeria-drab.vercel.app)

<!-- Badges do site pessoal: autor, licença, deploy e framework -->

[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
[function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message: string = greet("World");
console.log(message);![Built with Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org)
