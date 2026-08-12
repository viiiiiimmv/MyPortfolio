# Shiv Chauhan Portfolio

A modern personal portfolio built with React and Vite, featuring motion-driven UI, editorial sections, project showcases, and responsive design.

## Overview

This project is a developer portfolio landing page that combines custom animations, focused content sections, and approachable developer tooling.

### Key Highlights

- React 19 + Vite 6 app structure
- Framer Motion interactions and animated section reveals
- Lazy-loaded portfolio sections for faster initial rendering
- Custom hero experience with scrambled-name reveal and audio controls
- Editorial About, Journey, Engineering Stack, and Built & Shipped sections
- Compact Beyond the Code section with LeetCode stats, photography, and resume CTA
- Contact CTA with EmailJS integration
- Tailwind CSS styling with custom visuals and responsive layout

## Project Structure

- `src/App.jsx` - main app shell, audio, fixed links, and section rendering
- `src/components/Hero.jsx` - hero section, navigation, scrambled-name reveal, mute toggle
- `src/assets/Terminal.jsx` - About section
- `src/components/Journey.jsx` - education, training, and upcoming role timeline
- `src/components/EngineeringStack.jsx` - interactive engineering stack section
- `src/components/Projects.jsx` - Built & Shipped project accordion and archive modal
- `src/components/Stats.jsx` - Beyond the Code section with resume, photography, and coding proof
- `src/components/FixedSocialLinks.jsx` - pinned GitHub and LinkedIn links
- `src/components/BackgroundAudio.jsx` - background audio player
- `src/components/CustomCursor.jsx` - desktop-only custom cursor
- `src/hooks/useIsMobile.js` - mobile detection helper
- `src/assets/data/` - project, image, and LeetCode data sources

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL shown by Vite to preview the portfolio.

## Production Build

```bash
npm run build
```

## Preview Production Build

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
- `@emailjs/browser`
- `tailwindcss`

## Notes

- Desktop includes a custom cursor and additional visual overlays.
- Mobile keeps the same core portfolio sections with a mobile-specific footer.
- Background audio is provided by `public/assets/betterdays.mp3` and is muted by default.

## License

This is a private repository.
