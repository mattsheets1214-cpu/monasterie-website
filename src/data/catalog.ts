/**
 * Helpers for reading categories and watches, and for building the list of
 * homepage branches. Drafts are included in `npm run dev` and left out of
 * the live build.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { branches, type Branch } from './branches';

export type Category = CollectionEntry<'categories'>;
export type Watch = CollectionEntry<'watches'>;

const live = (e: { data: { draft: boolean } }) => import.meta.env.DEV || !e.data.draft;
const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getCategories(): Promise<Category[]> {
  return (await getCollection('categories', live)).sort(byOrder);
}

export async function getWatches(categoryId?: string): Promise<Watch[]> {
  const all = await getCollection('watches', live);
  return all.filter((w) => !categoryId || w.data.category.id === categoryId).sort(byOrder);
}

export const categoryHref = (id: string) => `watches/${id}/`;
export const watchHref = (w: Watch) => `watches/${w.data.category.id}/${w.id}/`;

/** Everything on the homepage web and in the top menu, in order. */
export async function getWebBranches(): Promise<Branch[]> {
  const cats = (await getCategories())
    .filter((c) => c.data.onWeb)
    .map((c) => ({
      title: c.data.title,
      href: categoryHref(c.id),
      blurb: c.data.blurb,
      icon: 'icon' as const,
      order: c.data.order,
    }));
  return [...branches, ...cats].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

/* ---- Display helpers ----------------------------------------------------- */
const STATUS_LABELS: Record<Watch['data']['status'], string> = {
  concept: 'Concept',
  prototype: 'Prototype',
  'pre-order': 'Pre-order',
  available: 'Available',
  'sold out': 'Sold out',
};
export const statusLabel = (s: Watch['data']['status']) => STATUS_LABELS[s];

export function formatPrice(price: Watch['data']['price']): string {
  if (!price) return 'Price to be announced';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    maximumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
  }).format(price.amount);
}
