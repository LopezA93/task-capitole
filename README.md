# Front — Tareas Manager Capitole & Synectic

Aplicación web (SPA) desarrollada con React + Vite que consume la [Task API](https://api-task-capitole.vercel.app/). Permite login/registro, gestión de tareas y de usuarios, con vistas y permisos según el rol: **admin** (administra tareas y usuarios) y **user** (ve y completa sus tareas asignadas).

🔗 **Demo:** [task-capitole.vercel.app](https://task-capitole.vercel.app/) (Deploy Vercel)

---

## Stack

React 19 · Vite · React Router · Material UI · Axios · react-hot-toast · Context API

## Requisitos

- Node.js 18+
- pnpm
- La [Tareas Manager Capitole & Synectic API](https://api-task-capitole.vercel.app/) corriendo (local o en producción)

## Instalación

```bash
pnpm install
cp .env.example .env   # completar VITE_API_URL
pnpm dev
```

## Variables de entorno (.env.example)

| Variable       | Descripción                                           |
| -------------- | ----------------------------------------------------- |
| `VITE_API_URL` | URL base de la Task API (ej. `http://localhost:8087`) |

> La variable se hornea en el build de Vite, así que tiene que estar definida al momento de buildear.

## Scripts

| Comando        | Acción                           |
| -------------- | -------------------------------- |
| `pnpm dev`     | Inicia el proyecto en desarrollo |
| `pnpm build`   | Genera el build de producción    |
| `pnpm preview` | Sirve el build localmente        |
| `pnpm lint`    | Corre ESLint                     |

## Estructura

```
src/
├── main.jsx            # entry (Theme, Router, Providers)
├── App.jsx             # rutas + lazy loading
├── pages/              # Login, Register, UserPanel, admin/*
├── components/         # Navbar, Layout, TaskList, TaskForm, UserList, dialogs...
├── context/            # AuthContext, AdminDataContext
├── services/           # api (axios), authService, taskService
├── styles/theme.js     # tema de Material UI
└── utils/logos.js      # logos
```

## Funcionalidades

- **Login y registro** de usuarios.
- **Panel user:** ve sus tareas asignadas y las marca como completadas.
- **Panel admin:** CRUD de tareas, asignar responsable, y gestión de usuarios (crear, editar, eliminar).
- **Rutas protegidas** por autenticación y por rol.
- **Responsive** (menú hamburguesa en mobile) y notificaciones con toasts.
