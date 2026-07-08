# GulfSouth3D — Digitizing the Cultural Heritage of South Mississippi

A public web application for exploring 3D-scanned cultural heritage objects
from South Mississippi, built for the USM Center for Digital Humanities.
The site presents interactive 3D models, curated story pathways, an
interactive map, and a searchable, filterable collection.

## Tech stack

- **React 18 + TypeScript** — UI framework
- **Vite** — build tool and dev server
- **React Router** — page routing
- **@google/model-viewer** — interactive 3D (.glb) rendering
- **Leaflet / react-leaflet** — the interactive map
- **Omeka Classic** — the backend archive (system of record), accessed via its REST API

## Architecture

This is a **decoupled (headless) front-end**. Omeka Classic stores all items,
metadata, and 3D model files. This React app is the public presentation layer;
it reads from Omeka's REST API and renders the site. The two communicate only
over HTTP/JSON. All data access is isolated in `src/api/omeka.ts`, so the data
source can change without touching any page.

## Running locally

1. **Install dependencies** (required after every clone, or when dependencies change):

   ```
   npm install
   ```

2. **Create a `.env` file** in the project root (copy from `.env.example`):

   ```
   VITE_OMEKA_API_URL=/omeka-api
   ```

   Leaving `VITE_OMEKA_API_URL` blank makes the app run on built-in sample data
   (see `src/data/sampleObjects.ts`) — useful for offline development.

3. **Start the dev server:**

   ```
   npm run dev
   ```

   Open the printed localhost URL (usually http://localhost:5173).

## Connecting to Omeka (important)

The live Omeka API is at:
`https://digitizedculturalheritageofusmarchive.usmcdh.org/api`

Because the browser blocks cross-origin requests (CORS), local development
routes API and file requests through a **Vite dev proxy** (configured in
`vite.config.ts`): `/omeka-api` → Omeka's `/api`, and `/omeka-files` → Omeka's
`/files`. This proxy only works in local development.

**For production:** the Vite proxy does not apply. The Omeka server must send
CORS headers (`Access-Control-Allow-Origin`) for the deployed site's domain,
on both `/api` and `/files`. This is a server-side configuration.

## Project structure

```
src/
├── api/          Omeka data service (the only file that talks to Omeka)
├── components/   Reusable UI (Header, ObjectCard, ModelViewer, FilterGroup…)
├── data/         Controlled vocabularies (taxonomy) and sample fallback data
├── pages/        Full pages (Home, Collection, ObjectDetail, Stories, Map, About)
├── styles/       global.css (design tokens + all styling)
└── types.ts      The HeritageObject data model
```

## Notes

- **3D model files** should be web-optimized (target < ~10 MB). Very large
  models load slowly, especially on mobile.
- **Metadata values** in Omeka must match the controlled vocabulary in
  `src/data/taxonomy.ts` exactly (spelling and capitalization) for filtering
  to work correctly.
- **Model files are not committed** to the repo; they are served from Omeka at
  runtime.
