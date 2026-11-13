# Adding branches, categories and watches

The site grows in three kinds of piece. Each has a template and one command that creates it.

| You want to add | Example | Command | Shows up as |
|---|---|---|---|
| **Main branch** | Engineering | `npm run new -- branch "Engineering"` | A node on the homepage web, a menu link, and its own custom page |
| **Category** | Motorsport | `npm run new -- category "Motorsport"` | A node on the web, a menu link, and a page listing its watches |
| **Watch** | Race Weekend | `npm run new -- watch "Race Weekend" --category motorsport` | Its own page, plus a card on its category's page |

The web address comes from the name: "Race Weekend" in Motorsport becomes `/watches/motorsport/race-weekend/`. Add `--slug something` to choose the address yourself. Once a page is shared, don't change its address.

Every new category and watch starts as a **draft**. Drafts appear when you preview with `npm run dev`, but not on the live site. When it's ready, change `draft: true` to `draft: false`, then commit and push. The site rebuilds in about two minutes.

---

## A watch

```bash
npm run new -- watch "Race Weekend" --category motorsport
```

This creates `src/content/watches/race-weekend/index.md`. Everything about the watch lives in that folder.

1. **Photos.** Put them in the same folder: JPG or PNG, about 2000 px on the long side. List them under `photos:`, best shot first:

   ```yaml
   photos:
     - src: ./front.jpg
       alt: Race Weekend on a plain parchment background, track disc at 3 o'clock
     - src: ./wrist.jpg
       alt: Race Weekend on a wrist
   ```

   The **first photo** becomes the big image on the watch page, the card on the category page, and the share preview (cropped to 1200 × 630). Portrait 4:5 crops best. **Alt text is required**: say what's in the photo, for people using screen readers and for Google. The site resizes and compresses photos for you.

2. **Summary.** One sentence about what the watch is and who it's for. It appears under the name and in Google results.

3. **Status.** One of `concept`, `prototype`, `pre-order`, `available`, `sold out`.

4. **Price.** Leave it out until it's real. The page then says *Price to be announced*. When you have one:

   ```yaml
   price:
     amount: 450
     currency: USD
   ```

   Google can show a price for watches marked `pre-order`, `available` or `sold out`.

5. **Specs.** The template has the usual groups (Case, Movement, Dial and hands, Strap). Fill in values, delete rows that don't apply, and add rows or whole groups in the same pattern:

   ```yaml
   specs:
     - group: Case
       rows:
         - { label: Diameter, value: 39 mm }
         - { label: Water resistance, value: 100 m }
   ```

6. **Story.** Write under the second `---` in plain Markdown: `## Headings`, **bold**, *italic*, and blank lines between paragraphs.

7. **Order.** Lower `order` numbers come first on the category page.

## A category

```bash
npm run new -- category "Motorsport"
```

This creates `src/content/categories/motorsport.md`.

- **`title`** is the name on the web node, the menu and the page.
- **`blurb`** is one short line under the node (about 10 words).
- **`order`** sets its place among the branches. Lower numbers come first; Brand Identity is 10.
- **`onWeb: false`** keeps it off the homepage web; the page still exists.
- Below the second `---`, write a short introduction to the category.

The category's page lists every published watch whose `category:` matches its file name.

## A main branch

```bash
npm run new -- branch "Engineering"
```

Use a main branch for a section that isn't a watch category and needs its own layout, like Brand Identity. The command creates:

- `src/pages/engineering.astro`: a starting page with a hero and one section. Fill in the TODOs, and copy patterns from `src/pages/brand-identity.astro` (photos, the plum band, the marks).
- A new entry in `src/data/branches.ts`: write its one-line `blurb` there.

**Branches are not drafts.** A new branch goes live as soon as you push, so finish it first.

## Previewing

```bash
npm run dev
```

Open the address it prints (usually http://localhost:4321/). Pages update as you save. If a file has a mistake, such as a missing field, a misspelled category or a photo path that doesn't exist, the terminal and the browser both show which file and which line.

## Editing on GitHub without a computer set up

You can do all of this on github.com:

1. Open the repo and go to `src/content/watches/`.
2. Choose **Add file → Create new file** and type `race-weekend/index.md` as the name.
3. Copy `templates/watch.md` into it and replace `{{NAME}}`, `{{CATEGORY}}` and `{{SLUG}}` with the watch's details.
4. Upload photos into the same folder with **Add file → Upload files**.
5. Commit. Drafts don't appear on the live site, so set `draft: false` when it's ready.

## Where things live

```
src/content/categories/<category>.md     one file per category
src/content/watches/<watch>/index.md     one folder per watch, photos beside it
src/data/branches.ts                     main branches (custom pages)
src/pages/<branch>.astro                 each main branch's page
src/pages/watches/[category]/            the category and watch page layouts (shared)
templates/                               what `npm run new` copies from
scripts/new.mjs                          the `npm run new` command
src/content.config.ts                    the rules every category and watch file must follow
```

## What you get for free

For every category and watch:

- Page title and description for Google and share previews
- A share image: the watch's first photo, or the brand image for categories
- A canonical address
- An entry in `sitemap-index.xml`
- Breadcrumbs (Home / Category / Watch), also given to Google as structured data
- Product details for Google on watch pages: name, photos, brand, price and availability once a price is set
- A homepage web node and top-menu link for each published category
