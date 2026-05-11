# Learn German

A self-study German lesson book built as a Vue 3 SPA. Currently covers A1 with vocabulary tables, grammar conjugations, interactive exercises, and flashcards.

**Live:** https://davide-muzzi.github.io/learn-german/

---

## Features

- **Vocabulary & grammar** — structured tables for each chapter topic
- **Exercises** — fill-in-the-gaps, multiple choice, and translation drills
- **Flashcards** — card sessions with progress tracking, selectable by set
- **Notes panel** — per-page and global markdown notes with live preview, split-pane editor, and export to `.md` / `.txt`
- **Dark mode** — respects system preference on first load, togglable in sidebar
- **Responsive** — works on mobile via a slide-in drawer sidebar

All settings and notes are stored locally in the browser — nothing is sent anywhere.

---

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

---

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/) (hash history)
- [Lucide](https://lucide.dev/) icons
- [marked](https://marked.js.org/) + [DOMPurify](https://github.com/cure53/DOMPurify) for note rendering
