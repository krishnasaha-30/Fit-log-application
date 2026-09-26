# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
lifts, lock the ones you want into today's plan, save others for later, and
watch your minutes and calories add up as you go.

## Description

FitLog pulls workout data from the FitLog API and displays it as a
browsable, sortable library. Each workout has its own detail page with
step-by-step instructions, key specs (sets, reps, difficulty, equipment),
and quick actions to add it to today's plan or save it for later. The My
Plan page tracks everything you've queued up across two tabs, with live
stats and a five-lift daily cap.

## Technologies Used

- **Next.js** (App Router) — routing, server + client components
- **React 19** & **TypeScript**
- **Tailwind CSS v4 + daisyUI** — styling and the dark "fitlog" theme
- **react-toastify** — toast feedback on every plan/save/remove action
- **React Context API** — shared plan/saved state across the app
- **localStorage** — persists the plan and saved list across reloads

## Features

1. **Responsive workout library** — grid layout that adapts from a single column on mobile up to four columns on desktop
2. **Sort by Duration, Calories, or Rating** — available on both the library and the My Plan tabs
3. **Workout detail pages** — full spec sheet plus numbered step-by-step instructions
4. **Add to Today's Plan / Save for Later** — with a five-lift daily cap and toast confirmations for every action
5. **My Plan dashboard** — tabbed Today's Plan / Saved views, live metrics (exercises, minutes, calories), Mark as Done and Remove actions, and an empty state that links back to the library
6. **Persistent state** — your plan and saved list survive a page reload via localStorage
7. **Polished UX details** — active-route nav highlighting, live Plan/Saved badge counts in the navbar, loading states, and a custom 404 page

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open <http://localhost:3000> to view the app.

## Notes

- Workout data is fetched live from the FitLog API on both the home page and each workout's detail page.
