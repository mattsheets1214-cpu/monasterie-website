# Monasterie Watch Company — Website

*Conversatio Morum.*

The website for Monasterie Watch Company, built with [Astro](https://astro.build) and deployed automatically to GitHub Pages.

**Live site:** https://mattsheets1214-cpu.github.io/monasterie-website/

---

## Run it locally

You need [Node.js](https://nodejs.org) 22 or newer (check with `node --version`).

```bash
# 1. Clone the repo
git clone https://github.com/mattsheets1214-cpu/monasterie-website.git
cd monasterie-website

# 2. Install dependencies (first time only, or after package.json changes)
npm install

# 3. Start the dev server
npm run dev
```

Open the URL it prints (usually http://localhost:4321/monasterie-website/). The page reloads automatically as you edit files.

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Local dev server with live reload                     |
| `npm run build`   | Builds the production site into `dist/`               |
| `npm run preview` | Serves the built `dist/` folder to check it before pushing |

## How deploying works

Every push to the `main` branch triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. It usually takes 1–2 minutes. You can watch progress (or re-run a deploy manually) in the repo's **Actions** tab.

No manual steps: edit, commit, push to `main`, and the live site updates.

## How the folders are organized

```
monasterie-website/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions: build + deploy to Pages on push to main
├── public/                 # Static files copied as-is
│   ├── brand/              #   logo SVGs for each ground + app icons
│   ├── favicon.svg / .ico  #   tab icon
│   └── og-image.png        #   link-preview image
├── src/
│   ├── components/         # Reusable pieces of UI (Logo.astro + logo-paths.ts)
│   ├── layouts/            # Page shells: <head>, fonts, shared wrapper (BaseLayout.astro)
│   ├── pages/              # Every file here becomes a URL
│   │   ├── index.astro     #   → the homepage (/)
│   │   └── styleguide.astro#   → hidden style guide (/styleguide), not linked, noindex
│   └── styles/
│       ├── tokens.css      # Design tokens: colors, fonts, type scale, spacing, radius, grid
│       └── global.css      # Fonts, base styles, .wrap/.grid, headings, buttons
├── astro.config.mjs        # Astro settings (site URL + base path for GitHub Pages)
├── package.json            # Dependencies and npm scripts
└── tsconfig.json           # TypeScript settings for editor support
```

## Homepage web: adding a branch

The homepage is the seal with branches drawn out to nodes; on phones it becomes the seal with a plain list. The branches, and the links in the top menu bar, all come from one file: `src/data/branches.ts`. To add one, add an entry:

```ts
{
  title: 'Engineering',
  href: 'engineering/',          // the page it opens (create src/pages/engineering.astro)
  blurb: 'Cases, movements and how we build them.',
  icon: 'icon',
  // angle: 180,                 // optional: 0 right, 90 down, 180 left, 270 up
},
```

Branches spread evenly around the seal unless you set `angle`. The seal itself lives in `src/components/Seal.astro`, so the finished seal artwork can replace it there.

## Design tokens and the style guide

All brand values live in `src/styles/tokens.css`: change one there and the whole site follows. Build with the tokens instead of typing raw values:

- **Colors:** `--color-plum`, `--color-parchment`, `--color-cerulean`, `--color-popcorn`, `--color-ink`. Cerulean and popcorn are never used for text.
- **Grounds:** put `data-ground="plum"` (default) or `data-ground="parchment"` on a section, and use `var(--bg)`, `var(--text)`, `var(--heading)` and `var(--text-muted)` so components work on either ground.
- **Type:** `.wordmark` (Metamorphous, the name only), `h1`–`h4` (Cormorant Garamond), body text (Source Serif 4), `.small`, `.label`.
- **Spacing:** `--space-1` to `--space-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128px).
- **Corners:** `--radius` (4px) is the only radius.
- **Grid:** `.wrap` for page edges, `.grid` for 4 / 8 / 12 columns (phone / 768px+ / 1024px+).
- **Buttons:** `.btn` plus `.btn-primary`, `.btn-secondary` or `.btn-text`; add `.btn-sm` for the 44px size.

To check them, open `/monasterie-website/styleguide/`. It isn't linked from the site and tells search engines not to index it, but anyone with the URL can open it.

Fonts are self-hosted from npm (`@fontsource`), so there's no Google Fonts request.

## Logo

Use the `Logo` component; it switches colors with the ground (parchment + popcorn star on plum, all plum on parchment, because popcorn disappears on light backgrounds):

```astro
---
import Logo from '../components/Logo.astro';
---
<Logo variant="icon" height="8rem" />
<Logo variant="wordmark" width="32rem" />       <!-- with WATCH COMPANY -->
<Logo variant="wordmark-star" width="16rem" />  <!-- star in the A -->
<Logo variant="wordmark-name" width="10rem" />  <!-- name only -->
```

Minimum sizes: icon 32px tall, wordmark 400px wide, star wordmark 200px, name-only 120px.

| File | What it is |
|---|---|
| `public/brand/monasterie-*-on-plum.svg` / `-on-parchment.svg` | Clean SVGs of each mark for use outside the site |
| `public/favicon.svg`, `favicon.ico` | Browser tab icon: a small-size cut with a heavier arch and fuller star, on a plum tile |
| `public/apple-touch-icon.png`, `brand/icon-192.png`, `brand/icon-512.png` | Home-screen icons (full drawing on plum) |
| `public/og-image.png` | 1200×630 share image for links on iMessage, social media, Slack |
| `src/components/logo-paths.ts` | The logo paths the component draws |



Create a file in `src/pages/`. The filename becomes the URL:

- `src/pages/about.astro` → `/monasterie-website/about`
- `src/pages/watches/f1.astro` → `/monasterie-website/watches/f1`

Wrap the content in `BaseLayout` so it gets the shared head and styles:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About — Monasterie">
  <h1>About</h1>
</BaseLayout>
```

### Linking and images

Because the site lives under `/monasterie-website/`, build internal links and asset paths with the base URL:

```astro
<a href={`${import.meta.env.BASE_URL}/about`}>About</a>
```

Put images in `public/` (e.g. `public/images/eyelid.jpg`) to reference them by path, or in `src/assets/` to let Astro optimize them.

## Custom domain (later)

To use a domain like `monasterie.com`: add it under **Settings → Pages → Custom domain**, then in `astro.config.mjs` set `site` to `https://monasterie.com` and delete the `base` line.
