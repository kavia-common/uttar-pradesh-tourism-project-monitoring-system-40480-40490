# UPSTDC Frontend (React)

Responsive dashboard-style frontend with protected routes, CRUD pages, and token-aware API client.

## Features

- React Router v6 with protected routes
- Dashboard layout (sidebar + top bar)
- Auth pages (Login, Signup)
- Projects CRUD (list, view, create, edit)
- Token handling with Axios interceptors and refresh flow
- Environment-based configuration (no hardcoded URLs)

## Environment

Create a `.env` file at the project root with:

```
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_APP_NAME=UPSTDC Project Monitoring
```

The app also supports a window.__CONFIG__ object for runtime overrides:
```
<script>
  window.__CONFIG__ = { API_BASE_URL: "https://your-api" };
</script>
```

## Run locally

1) Install deps
- cd upstdc_frontend
- npm install

2) Set env
- cp .env.example .env
- Set REACT_APP_API_BASE_URL to the backend URL (default http://localhost:3001)

3) Start dev server
- npm start
- App runs on http://localhost:3000

## Smoke test

- Open http://localhost:3000/login
- Signup or login
- Navigate to Projects, create a new project
- Verify the project appears in the list and can be viewed
- If backend returns 401, ensure you have logged in and the token is present in localStorage

## Routing Overview

- `/login`, `/signup` - public
- `/dashboard` - protected
- `/projects` - list (protected)
- `/projects/new` - create
- `/projects/:id` - view
- `/projects/:id/edit` - update
- `/users` - placeholder

## Notes

- When Figma assets are provided in the future, styling/layout must adhere strictly to the Figma-to-Application Conversion Guidelines.
- Do not hardcode secrets or endpoints; use environment variables.
- CORS: backend must include http://localhost:3000 in CORS_ORIGIN.
