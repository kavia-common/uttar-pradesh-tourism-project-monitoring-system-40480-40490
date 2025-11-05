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
REACT_APP_API_BASE_URL=https://YOUR_BACKEND_URL
REACT_APP_APP_NAME=UPSTDC Project Monitoring
```

The app also supports a window.__CONFIG__ object for runtime overrides:
```
<script>
  window.__CONFIG__ = { API_BASE_URL: "https://your-api" };
</script>
```

## Scripts

- `npm start` - start dev server
- `npm test` - run tests
- `npm run build` - production build

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
