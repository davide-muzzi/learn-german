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

**Data** lives entirely in [src/data/index.js](src/data/index.js) — every vocab list, conjugation table, fill-the-gap question, multiple-choice question, and translation exercise is exported from there. This is the only file to edit when adding or changing content.

**Component split:**
- `src/views/` — page-level components; route-aware via `useRoute()`
- `src/components/` — display-only (`VocabTable`, `ConjugTable`, `AppSidebar`)
- `App.vue` — thin shell: `AppSidebar` + `RouterView`

**Legacy files** — `app.js` and `style.css` at the repo root are the original vanilla JS implementation kept for reference. They are not imported by the Vue app.

**Unused scaffold** — `src/components/HelloWorld.vue` is a leftover from the Vite template and is not used anywhere.
