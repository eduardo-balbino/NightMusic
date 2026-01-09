**Proveniência e Autoria:** Este repositório foi criado e é mantido por Eduardo B. (uso pessoal/educacional).

## Roadmap

### v0.2.0 Backend Foundation

- Express server setup
- Health check endpoint
- Static file serving

### v0.3.0 File Uploads

- Audio upload via API
- Persistent file storage
- Playlist metadata persistence

### v0.4.0 Frontend and Backend Integration

- Upload music from the frontend to the backend
- Fetch playlists through the API
- Play music directly from server URLs

### Future Plans

- Database integration
- User authentication
- Multiple playlists per user
- Desktop application version

---

## Project Philosophy

- Avoid unnecessary frameworks
- Keep responsibilities clearly separated
- Learn first, optimize later
- Document limitations instead of hiding them

---

## License

MIT License

---

## Author

Eduardo B.

This project is part of a personal learning journey into backend and fullstack development.

````

# NightMusic

NightMusic is a personal music player project focused on **learning backend fundamentals** while building a real, functional application.

The project is developed incrementally, starting with a frontend-only prototype and evolving into a backend-driven system using **Node.js and Express**.

---

## Project Goals

- Learn how frontend and backend communicate (HTTP / REST)
- Implement real file uploads and data persistence
- Understand backend architecture and project organization
- Build a solid foundation before adding advanced features

This project prioritizes **learning and clarity over shortcuts**.

---

## Current Version

**v0.1.0 Frontend Preview (Local Playlist)**

This release represents an early frontend-only preview of the music player.

### Features

- Local music upload
- Interactive playlist
- Audio playback in the browser
- Responsive user interface

### Known Limitations

- Music files do not persist after page reload
- Songs must be re-added on every session
- No backend or server-side storage is implemented yet

These limitations are intentional and reflect browser security constraints.

---

## Technical Notes

Modern browsers do not allow permanent access to local files for security reasons.

- Audio files are loaded using temporary `blob:` URLs
- These URLs only exist during the active session
- Reloading the page invalidates all previously loaded files

Persistent storage will be introduced through a backend in future versions.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend (in progress)

- Node.js
- Express.js
- Multer (file uploads)
- Filesystem-based persistence (initial phase)

---

## Development Setup

```bash
cd backend
npm install
npm run dev
```

Environment variables are defined in a `.env` file located at the backend root.

Example:

```env
PORT=3000
UPLOAD_DIR=src/storage/uploads
```

---

## Roadmap

### v0.2.0 — Backend Foundation

- Express server setup
- Health check endpoint
- Static file serving

### v0.3.0 File Uploads

- Audio upload via API
- Persistent file storage
- Playlist metadata persistence

### v0.4.0 Frontend and Backend Integration

- Upload music from the frontend to the backend
- Fetch playlists through the API
- Play music directly from server URLs

### Future Plans

- Database integration
- User authentication
- Multiple playlists per user
- Desktop application version

---

## Project Philosophy

- Avoid unnecessary frameworks
- Keep responsibilities clearly separated
- Learn first, optimize later
- Document limitations instead of hiding them

---

## License

MIT License

---

## Author

Eduardo B.

This project is part of a personal learning journey into backend and fullstack development.
````

<!-- Status badges -->

[![Build Status](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml/badge.svg)](https://github.com/eduardo-balbino/NightMusic/actions/workflows/build.yml)
[![Lint Status](https://github.com/eduardo-balbino/NightMusic/actions/workflows/lint.yml/badge.svg)](https://github.com/eduardo-balbino/NightMusic/actions/workflows/lint.yml)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=down&up_message=up&url=https://galeria-drab.vercel.app)](https://galeria-drab.vercel.app)

<!-- Badges do site pessoal: autor, licença, deploy e framework -->

[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org)
