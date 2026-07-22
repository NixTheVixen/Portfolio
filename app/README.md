# Nix Portfolio

The portfolio design (originally `Portfolio.html`) rebuilt as a componentized Vite + React app.

## Run

```bash
cd app
npm install
npm run dev      # start dev server
npm run build    # production build
npm run lint     # lint
```

## Structure

- `src/main.jsx` — app entry, wraps `<App />` in `BrowserRouter`
- `src/App.jsx` — routes (`/` → `Portfolio`)
- `src/pages/Portfolio.jsx` — the home view, assembles the sections
- `src/components/`
  - `Navbar.jsx` — top nav + logo + Hire Me
  - `Hero.jsx` — hero section with profile card
  - `FeaturedReels.jsx` — reels grid, renders `ReelCard`
  - `ReelCard.jsx` — reusable, data-driven reel card
  - `CTA.jsx` — call-to-action section
  - `Footer.jsx` — footer with social links
- `src/index.css` — global reset + design CSS variables

Each component has co-located CSS. Design tokens (`--pink`, `--blue`, `--dark`, etc.)
live in `:root` in `index.css`.

## Adding views

Routing is already wired with React Router. Add a page under `src/pages/` and a
`<Route>` in `src/App.jsx`. The `Navbar` links (`Work`, `Process`, `About`) are
ready to become `<Link>`s to those routes.
