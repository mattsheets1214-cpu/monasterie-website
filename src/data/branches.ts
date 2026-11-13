/**
 * Main branches of the homepage web that have their own custom page
 * (like Brand Identity). Watch categories are NOT listed here: each file in
 * src/content/categories/ becomes a branch automatically.
 *
 * To add a main branch: `npm run new -- branch "Engineering"`
 * (creates the page and adds the entry below). See docs/adding-content.md.
 *
 * Branches spread evenly around the wordmark in `order` (lowest first,
 * pointing right, then clockwise). Set `angle` in degrees to place one by
 * hand: 0 right, 90 down, 180 left, 270 up.
 */
import type { LogoVariant } from '../components/logo-paths';

export interface Branch {
  title: string;
  /** Path inside the site, without the leading slash, ending in / */
  href: string;
  /** One short line under the node and in the phone list. */
  blurb: string;
  icon: LogoVariant;
  /** Lower numbers come first. Categories default to 100. */
  order?: number;
  angle?: number;
}

export const branches: Branch[] = [
  {
    title: 'Brand Identity',
    href: 'brand-identity/',
    blurb: 'The bell tower, the monks, our marks and our founder.',
    icon: 'icon',
    order: 10,
  },
  // new branches are added above this line
];
