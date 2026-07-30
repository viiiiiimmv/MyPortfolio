# Shiv Chauhan Portfolio

A modern personal portfolio built with React and Vite, featuring motion-driven UI, interactive project display, and responsive mobile experience.

## Overview

This project is a developer portfolio landing page that combines custom animations, immersive site design, and approachable developer tooling.

### Key highlights

- React 19 + Vite 6 app structure
- Framer Motion interactions and animated page transitions
- Lazy-loaded desktop/ mobile sections for faster initial rendering
- Custom hero experience with live IST clock, scrambled-name reveal, and audio controls
- Auto-rotating project deck with keyboard navigation and hover pause
- Photography showcase and downloadable resume section
- LeetCode stats integration and contact CTA
- Tailwind CSS styling with custom visuals and responsive layout

## Project structure

- `src/App.jsx` — main app shell, loader, audio, and section rendering
- `src/components/Hero.jsx` — hero section, navigation, time display, mute toggle
- `src/components/Projects.jsx` — interactive project carousel
- `src/components/Stats.jsx` — resume, photography, and coding proof section
- `src/components/BackgroundAudio.jsx` — background audio player
- `src/components/CustomCursor.jsx` — desktop-only custom cursor
- `src/hooks/useIsMobile.js` — mobile detection helper
- `src/assets/data/` — project, image, and LeetCode data sources

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL shown by Vite to preview the portfolio.

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Dependencies

- `react` / `react-dom`
- `@vitejs/plugin-react`
- `framer-motion`
- `lucide-react`
- `react-icons`
- `recharts`
- `smoothscroll-polyfill`
- `@emailjs/browser`
- `tailwindcss`

## Notes

- Desktop includes a custom cursor and additional visual overlays.
- On mobile, the app renders mobile-specific project and footer sections for a cleaner experience.
- Background audio is provided by `public/assets/betterdays.mp3` and is muted by default.

## License

This is a private repository.
