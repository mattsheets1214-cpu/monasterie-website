// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://mattsheets1214-cpu.github.io/monasterie-website/
// If you later add a custom domain (e.g. monasterie.com), set `site` to that
// domain and remove `base`.
export default defineConfig({
  site: 'https://mattsheets1214-cpu.github.io',
  base: '/monasterie-website',
});
