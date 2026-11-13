/**
 * The branches of the homepage web, and the links in the top menu bar.
 *
 * To add a branch, add one entry. Branches spread evenly around the seal
 * (first one points right, then the rest go clockwise); set `angle` in
 * degrees to place one by hand (0 = right, 90 = down, 180 = left, 270 = up).
 *
 * icon: any Logo variant, for now 'icon' (the window and star).
 * href: path inside the site, without the leading slash.
 */
import type { LogoVariant } from '../components/logo-paths';

export interface Branch {
  title: string;
  href: string;
  blurb: string;
  icon: LogoVariant;
  angle?: number;
}

export const branches: Branch[] = [
  {
    title: 'Brand Identity',
    href: 'brand-identity/',
    blurb: 'The name, the bell tower, our colours and type.',
    icon: 'icon',
  },
];
