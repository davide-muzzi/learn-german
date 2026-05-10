# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

No test runner or linter is configured.

## Architecture

This is a Vue 3 + Vite SPA — a German A1 lesson book with vocabulary tables, grammar conjugations, and interactive exercises.

**Routing** uses `createWebHashHistory` (hash URLs). Multiple routes share the same view component, distinguished by `route.name` at runtime:
- `VocabView` serves all `/v-*` routes (greetings, names, origin, expressions)
- `ConjugView` serves `/g-sein` and `/g-haben`

**Data** is split across `src/data/` by level and chapter:
- `src/data/a1/chapter1.js`, `src/data/a1/chapter2.js`, … — vocab, conjugations, exercises for each chapter
- `src/data/meta.js` — shared registry data: `LEVELS`, `CHAPTERS`, `CHAPTER_SECTIONS`, `FLASHCARD_SETS`
- `src/data/index.js` — barrel re-export; all app imports go through here, so no view/component needs updating when adding new chapter files

To add content for a chapter, edit (or create) the relevant `src/data/<level>/chapter<n>.js` file and re-export it from `index.js`.

**Component split:**
- `src/views/` — page-level components; route-aware via `useRoute()`
- `src/components/` — display-only (`DataTable`, `ConjugTable`, `AppSidebar`)
- `App.vue` — thin shell: `AppSidebar` + `RouterView`

**Legacy files** — `app.js` and `style.css` at the repo root are the original vanilla JS implementation kept for reference. They are not imported by the Vue app.

**Unused scaffold** — `src/components/HelloWorld.vue` is a leftover from the Vite template and is not used anywhere.
