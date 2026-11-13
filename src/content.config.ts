/**
 * The shape of every category and watch file. If a file is missing a
 * required field or has a typo, `npm run dev` / `npm run build` stops and
 * tells you which file and which field. See docs/adding-content.md.
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* ---- Categories: src/content/categories/<slug>.md --------------------- */
const categories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/categories' }),
  schema: z.object({
    /** Name on the web node, menu and page heading, e.g. "Motorsport". */
    title: z.string(),
    /** One short line under the node and in the phone list. */
    blurb: z.string(),
    /** Google / share preview description, 120-160 characters. Falls back to blurb. */
    description: z.string().optional(),
    /** Lower numbers come first on the web and in the menu. */
    order: z.number().default(100),
    /** Set false to keep it off the homepage web (the page still exists). */
    onWeb: z.boolean().default(true),
    /** Drafts show in `npm run dev` only, never on the live site. */
    draft: z.boolean().default(false),
  }),
});

/* ---- Watches: src/content/watches/<slug>/index.md + photos ------------ */
const STATUSES = ['concept', 'prototype', 'pre-order', 'available', 'sold out'] as const;

const watches = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/watches',
    // the folder name is the watch's address: watches/<category>/<folder>/
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** The category file name without .md, e.g. motorsport */
      category: reference('categories'),
      /** One sentence: what it is and who it's for. */
      summary: z.string(),
      /** Google / share description, 120-160 characters. Falls back to summary. */
      description: z.string().optional(),
      status: z.enum(STATUSES).default('concept'),
      /** Leave out until there is a real price. */
      price: z
        .object({
          amount: z.number().positive(),
          currency: z.string().length(3).default('USD'),
        })
        .optional(),
      /** First photo is the hero, the category card and the share image. */
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1, 'Every photo needs alt text describing it.'),
          })
        )
        .nullish()
        .transform((v) => v ?? []),
      /** Spec table, in groups. See templates/watch.md for the usual groups. */
      specs: z
        .array(
          z.object({
            group: z.string(),
            rows: z.array(z.object({ label: z.string(), value: z.string() })),
          })
        )
        .default([]),
      /** Lower numbers come first on the category page. */
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { categories, watches };
export const WATCH_STATUSES = STATUSES;
