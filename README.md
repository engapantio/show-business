# Show Business

A responsive news-browsing SPA built with React 19, TypeScript, and Material UI. Content is sourced from the public [DummyJSON](https://dummyjson.com) API. The project follows **Feature-Sliced Design (FSD)** and demonstrates clean separation of presentation and business logic throughout.

---

## Features

| Page                 | Route                 | Description                                                                                                                                                                        |
| -------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**             | `/`                   | Paginated news feed arranged in two alternating "band" layouts (large feature card + four top-story rows). Supports URL-based pagination (`?page=N`).                              |
| **Explore**          | `/explore`            | Debounced search across all posts with a responsive 4-column card grid. Displays a randomised selection when the search field is empty.                                            |
| **Inspiration**      | `/inspiration`        | Surfaces a random post as a full-width feature card. The _Next Inspiration_ button loads a new random post; hovering it prefetches the next one. Protected route — requires login. |
| **News detail**      | `/news/:id`           | Individual post view with full body text and a comments section.                                                                                                                   |
| **Contact**          | `/contact`            | Validated contact form (name, email, message) with Zod schema validation and TanStack Query mutation.                                                                              |
| **Login / Register** | `/login`, `/register` | Authentication forms with field-level validation, password visibility toggle, and redirect-on-success.                                                                             |

**Cross-cutting behaviour**

- Skeleton shimmer on every data-loading state; graceful `ErrorBoundary` + retry on query failures.
- Shared `PostImage` component: shimmer while loading, smooth `opacity` fade-in, error fallback to local SVG placeholder, resolved CDN URL caching to skip redirect round-trips on repeat visits, `fetchpriority="high"` on above-the-fold images.
- Image preloading via `<link rel="preload">` injected into `<head>` for all visible images on Home and Explore before cards mount.
- Route-level data loaders (`loader` + `ensureQueryData`) so navigation starts fetching before the component tree mounts — eliminates blank-screen delays.
- Debounced search input (400 ms) on Explore — API calls fire only after the user stops typing.
- Auth state persisted in a global store; protected routes redirect unauthenticated users to `/login?redirect=…`.
- Mobile navigation drawer closes automatically when the viewport grows to desktop width (derived state, no effect).
- `BigNewsCard` hero image stretches to match the height of the neighbouring `TopStoriesBlock` on desktop; fixed 381 px on tablet/mobile.
- Scrollbar gutter reserved globally (`overflow-y: scroll`) — prevents layout shift when navigating between short and long pages.
- Fully adaptive layout — single-column on mobile, multi-column grid on tablet and desktop.

---

## Tech stack

### Runtime dependencies

| Package                              | Version | Role                                                  |
| ------------------------------------ | ------- | ----------------------------------------------------- |
| `react` / `react-dom`                | ^19.2   | UI framework                                          |
| `@mui/material`                      | ^9.1    | Component library and theming                         |
| `@mui/icons-material`                | ^9.1    | Icon set                                              |
| `@emotion/react` / `@emotion/styled` | ^11.14  | MUI peer — CSS-in-JS engine                           |
| `@tanstack/react-router`             | ^1.170  | Type-safe file-based routing                          |
| `@tanstack/react-router-devtools`    | ^1.167  | Router dev overlay                                    |
| `@tanstack/react-query`              | ^5.101  | Server-state management, caching, mutations           |
| `react-error-boundary`               | ^5.x    | Declarative error boundaries with query reset support |
| `zod`                                | ^4.4    | Runtime schema validation for forms                   |
| `@gouch/to-title-case`               | ^2.2    | Title-case utility for post headings                  |

### Dev dependencies

| Package                        | Version     | Role                                       |
| ------------------------------ | ----------- | ------------------------------------------ |
| `vite`                         | ^8.0        | Build tool and dev server                  |
| `@vitejs/plugin-react`         | ^6.0        | Vite React plugin (SWC transform)          |
| `@tanstack/router-plugin`      | ^1.168      | Vite plugin for route-tree code generation |
| `typescript`                   | ~6.0        | Type checking (`strict` mode, no `any`)    |
| `eslint` + `typescript-eslint` | ^10 / ^8.59 | Linting                                    |
| `eslint-plugin-react-hooks`    | ^7.1        | Hooks rules enforcement                    |
| `prettier`                     | ^3.8        | Code formatting                            |

---

---

## Project structure

The codebase follows [Feature-Sliced Design](https://feature-sliced.design):

```
src/
├── app/                    # App entry, providers (Theme, Query, Router)
│   ├── providers/
│   └── main.tsx
├── routes/                 # TanStack Router file-based route definitions
│   └── news/
├── pages/                  # Page-level components (ui + model per page)
│   ├── home/
│   ├── news-details/
│   ├── explore/
│   ├── inspiration/
│   ├── contact/
│   ├── login/
│   ├── register/
│   └── not-found/
├── widgets/                # Composite UI blocks (Header, NewsBand, CommentsSection …)
├── features/               # User-facing interactions (auth-by-username, contact-us)
├── entities/               # Domain models + API queries (news)
│   └── news/
├── shared/                 # Reusable utilities, UI primitives, API client
│   ├── api/                # HTTP client, QueryClient, ApiError
│   ├── config/             # Constants (API base URL, page size)
│   ├── lib/                # useDebounce, shuffle, resolvedImageCache …
│   ├── ui/                 # PostImage, PageContainer, ErrorView, Logo …
│   └── types/
└── routeTree.gen.ts        # Auto-generated by @tanstack/router-plugin (do not edit)
```

Each slice exposes a public barrel (`index.ts`) and is internally divided into `ui/`, `model/`, and `api/` segments. Pages contain only presentation components; all state and query logic lives in co-located `model/` hooks.

---

## Getting started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10 (or pnpm / yarn — no lock-file conflicts)

### Install

```bash
git clone https://github.com/engapantio/show-business.git
cd show-business
npm install
```

### Run in development

```bash
npm run dev
```

Opens at `http://localhost:5173` by default. The TanStack Router Vite plugin watches `src/routes/**` and regenerates `routeTree.gen.ts` automatically on route file changes.

### Build for production

```bash
npm run build       # type-check + Vite bundle
npm run preview     # serve the dist/ folder locally
```

### Code quality

```bash
npm run lint        # ESLint (report only)
npm run lint:fix    # ESLint with auto-fix
npm run format      # Prettier check
npm run format:fix  # Prettier auto-format
```

---

## Deployment

The app is deployed on [Vercel](https://vercel.com). A `vercel.json` at the repo root configures:

- **SPA fallback rewrite** — all routes resolve to `index.html` so deep links and page refreshes work correctly.
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Cross-Origin-Opener-Policy`, and `Content-Security-Policy` are set on every response.

Live URL: **[https://show-business-three.vercel.app](https://show-business-three.vercel.app)**

---

## Environment

No environment variables are required. All data comes from the public `https://dummyjson.com` REST API — the app works offline-first via TanStack Query's built-in cache once initial data has been fetched.

---

---

## Coding conventions

- **TypeScript strict mode** — `any` is prohibited; all components, hooks, and API responses are explicitly typed.
- **Presentation / logic separation** — every page that owns state exposes a dedicated `model/use<PageName>.ts` hook; page components contain only JSX and event bindings.
- **No direct `fetch` in components** — all remote data goes through TanStack Query hooks defined in `entities/*/api` or `features/*/api`.
- **FSD import rules** — upper layers may import from lower layers only (`pages → widgets → features → entities → shared`); cross-slice imports at the same layer are forbidden.
- **Effects for external systems only** — `useEffect` is used exclusively to interact with browser APIs (DOM, `matchMedia`, `document.head`); state derived from other state is computed inline, never synced via effects.
