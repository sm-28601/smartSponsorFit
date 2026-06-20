# SmartSponsorFit

SmartSponsorFit is a prototype influencer-brand matching platform built with React, TypeScript, Vite, and Tailwind CSS.

It demonstrates an AI-inspired scoring workflow for matching brands with creators based on audience overlap, tone alignment, engagement signals, and campaign fit.

## Features

- Landing page with hero messaging, workflow overview, and platform value proposition
- Interactive dashboard mockup with fit score visualization and performance metrics
- Fit Engine page for simulated brand-creator alignment analysis using mock datasets
- Discover page with curated brand recommendations and match score UI
- Static mock data for brands and creators under `src/data`
- Fit scoring engine in `src/utils/fitScoring.ts` that generates prototype compatibility reports
- Responsive UI components leveraging `lucide-react` icons and custom interface elements

## Project Structure

- `src/App.tsx` — application routing and page state
- `src/pages/` — landing, dashboard, fit engine, discover, requests, exports, and settings pages
- `src/components/` — reusable UI components and modal controls
- `src/contexts/` — theme context provider
- `src/data/` — mock brand and creator data feeds
- `src/utils/fitScoring.ts` — fit analysis logic and scoring utilities
- `src/index.css` — global styles and visual theme

## Getting Started

### Prerequisites

- Node.js 18+ or later
- npm

### Install dependencies

```bash
cd creatorfit
npm install
```

### Run locally

```bash
npm run dev -- --host 0.0.0.0
```

Open the app at `http://localhost:5173/`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Usage

- Use the landing page to explore app features and jump into the demo flows.
- Click **Get Started** to navigate to the dashboard.
- Open the Fit Engine page to simulate an alignment analysis using sample brand and creator inputs.
- Browse brand recommendations on the Discover page.

## Notes

- This project is currently a front-end prototype and uses mock data for simulation.
- The fit scoring logic is provided for demonstration purposes and is not powered by a live AI backend.

## Dependencies

- React
- React DOM
- Vite
- TypeScript
- Tailwind CSS
- lucide-react
- @supabase/supabase-js (included but not actively used in the current UI)

## License

This repository does not include a license file. Add one if you plan to open source the project.
